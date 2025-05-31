import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Chat from "@/lib/models/chat"
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

    // Get all chats for the user
    const chats = await Chat.find({
      participants: decoded.userId,
    })
      .populate({
        path: "participants",
        select: "name email profilePicture role",
      })
      .populate({
        path: "lastMessage",
        select: "content createdAt senderId",
      })
      .sort({ updatedAt: -1 })

    // Get unread message counts for each chat
    const chatsWithUnread = await Promise.all(
      chats.map(async (chat) => {
        const unreadCount = await Message.countDocuments({
          chatId: chat._id,
          receiverId: decoded.userId,
          isRead: false,
        })

        return {
          ...chat.toObject(),
          unreadCount,
        }
      }),
    )

    return NextResponse.json({ chats: chatsWithUnread })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const { receiverId, content, messageType = "text", attachments } = await request.json()

    if (!receiverId || !content) {
      return NextResponse.json({ error: "Receiver ID and content are required" }, { status: 400 })
    }

    // Find or create chat
    let chat = await Chat.findOne({
      participants: { $all: [decoded.userId, receiverId] },
    })

    if (!chat) {
      chat = new Chat({
        participants: [decoded.userId, receiverId],
        type: "direct",
      })
      await chat.save()
    }

    // Create message
    const message = new Message({
      chatId: chat._id,
      senderId: decoded.userId,
      receiverId,
      content,
      messageType,
      attachments,
    })

    await message.save()

    // Update chat's last message
    chat.lastMessage = message._id
    chat.updatedAt = new Date()
    await chat.save()

    // Populate message data
    await message.populate("senderId", "name profilePicture")

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
