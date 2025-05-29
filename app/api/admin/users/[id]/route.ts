import { type NextRequest, NextResponse } from "next/server"
import { User } from "@/lib/models/user"
import { AdminLog } from "@/lib/models/admin-log"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const updateUserSchema = z.object({
  verificationStatus: z.enum(["pending", "verified", "rejected"]).optional(),
  role: z.enum(["admin", "brand", "influencer"]).optional(),
})

// PUT /api/admin/users/[id] - Update user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    const user = await User.findByIdAndUpdate(params.id, validatedData, { new: true }).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Log admin action
    const adminLog = new AdminLog({
      adminId: decoded.userId,
      action: `Updated user ${user.email}`,
      affectedEntities: [user._id],
    })
    await adminLog.save()

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Update user error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/admin/users/[id] - Ban/suspend user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await User.findByIdAndUpdate(params.id, { verificationStatus: "rejected" }, { new: true }).select(
      "-password",
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Log admin action
    const adminLog = new AdminLog({
      adminId: decoded.userId,
      action: `Banned user ${user.email}`,
      affectedEntities: [user._id],
    })
    await adminLog.save()

    return NextResponse.json({ message: "User banned successfully", user })
  } catch (error) {
    console.error("Ban user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
