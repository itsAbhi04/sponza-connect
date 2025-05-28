import { type NextRequest, NextResponse } from "next/server"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const createNotificationSchema = z.object({
  message: z.string().min(1).max(500),
  type: z.enum(["campaign_update", "application_status", "payment", "referral", "admin"]),
})

// GET /api/notifications - Get user's notifications
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get("unread") === "true"

    const filter: any = { userId: decoded.userId }
    if (unreadOnly) {
      filter.readStatus = false
    }

    const notifications = await Notification.find(filter).sort({ createdAt: -1 }).limit(50)

    return NextResponse.json({ notifications }, { status: 200 })
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/notifications - Create notification (admin only)
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
    const validatedData = createNotificationSchema.parse(body)

    const notification = new Notification({
      userId: body.userId,
      message: validatedData.message,
      type: validatedData.type,
      readStatus: false,
    })

    await notification.save()

    return NextResponse.json(
      {
        message: "Notification created successfully",
        notification,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create notification error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
