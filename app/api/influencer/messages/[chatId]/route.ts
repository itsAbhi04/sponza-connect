import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Message from "@/lib/models/message"
import Chat from "@/lib/models/chat"

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
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
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    // Verify user is part of the chat
    const chat = await Chat.findById(params.chatId)
    if (!chat || !chat.participants.includes(decoded.userId)) {
      return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 })
    }

    // Get messages
    const messages = await Message.find({ chatId: params.chatId })
      .populate("senderId", "name profilePicture")
      .populate("replyTo", "content senderId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Mark messages as read
    await Message.updateMany(
      {
        chatId: params.chatId,
        receiverId: decoded.userId,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
    )

    return NextResponse.json({
      messages: messages.reverse(), // Reverse to show oldest first
      hasMore: messages.length === limit,
    })
  } catch (error) {
    console.error("Error fetching chat messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
