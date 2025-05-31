import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Notification from "@/lib/models/notification"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const unreadOnly = searchParams.get("unread") === "true"
    const type = searchParams.get("type")

    const skip = (page - 1) * limit

    // Build filter
    const filter: any = { userId: decoded.userId }
    if (unreadOnly) filter.isRead = false
    if (type) filter.type = type

    // Get notifications
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("relatedId")

    // Get total count
    const total = await Notification.countDocuments(filter)
    const unreadCount = await Notification.countDocuments({
      userId: decoded.userId,
      isRead: false,
    })

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      unreadCount,
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { action, notificationIds } = await request.json()

    if (action === "markAllRead") {
      await Notification.updateMany({ userId: decoded.userId, isRead: false }, { isRead: true, readAt: new Date() })
    } else if (action === "markRead" && notificationIds) {
      await Notification.updateMany(
        { _id: { $in: notificationIds }, userId: decoded.userId },
        { isRead: true, readAt: new Date() },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating notifications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
