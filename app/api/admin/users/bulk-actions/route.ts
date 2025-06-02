import { type NextRequest, NextResponse } from "next/server"
import { User } from "@/lib/models/user"
import { AdminLog } from "@/lib/models/admin-log"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const bulkActionSchema = z.object({
  userIds: z.array(z.string()),
  action: z.enum(["verify", "reject", "suspend", "activate"]),
  reason: z.string().optional(),
})

export async function POST(request: NextRequest) {
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
    const { userIds, action, reason } = bulkActionSchema.parse(body)

    let updateData: any = {}
    let notificationMessage = ""

    switch (action) {
      case "verify":
        updateData = { verificationStatus: "verified" }
        notificationMessage = "Your account has been verified!"
        break
      case "reject":
        updateData = { verificationStatus: "rejected" }
        notificationMessage = `Your account verification was rejected. ${reason ? `Reason: ${reason}` : ""}`
        break
      case "suspend":
        updateData = { verificationStatus: "rejected", isActive: false }
        notificationMessage = `Your account has been suspended. ${reason ? `Reason: ${reason}` : ""}`
        break
      case "activate":
        updateData = { isActive: true }
        notificationMessage = "Your account has been reactivated!"
        break
    }

    // Update users
    const result = await User.updateMany({ _id: { $in: userIds } }, updateData)

    // Create notifications for affected users
    const notifications = userIds.map((userId) => ({
      userId,
      message: notificationMessage,
      type: "account_update",
      readStatus: false,
    }))

    await Notification.insertMany(notifications)

    // Log admin action
    const adminLog = new AdminLog({
      adminId: decoded.userId,
      action: `Bulk ${action} on ${userIds.length} users`,
      affectedEntities: userIds,
      metadata: { reason },
    })
    await adminLog.save()

    return NextResponse.json({
      message: `Successfully ${action}ed ${result.modifiedCount} users`,
      affectedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error("Bulk user action error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
