import { type NextRequest, NextResponse } from "next/server"
import { User } from "@/lib/models/user"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const updateUserSchema = z.object({
  verificationStatus: z.enum(["pending", "verified", "rejected"]).optional(),
  role: z.enum(["admin", "brand", "influencer"]).optional(),
})

// GET /api/admin/users - Get all users with filters
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const filter: any = {}
    if (role) filter.role = role
    if (status) filter.verificationStatus = status

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await User.countDocuments(filter)

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
