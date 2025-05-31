import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Message from "@/lib/models/message"

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

    const count = await Message.countDocuments({
      receiverId: decoded.userId,
      isRead: false,
    })

    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error fetching unread message count:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
