import { type NextRequest, NextResponse } from "next/server"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// PUT /api/notifications/[id] - Mark notification as read
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: params.id, userId: decoded.userId },
      { readStatus: true },
      { new: true },
    )

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ notification }, { status: 200 })
  } catch (error) {
    console.error("Update notification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
