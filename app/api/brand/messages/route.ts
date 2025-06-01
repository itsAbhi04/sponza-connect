import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Chat from "@/lib/models/chat"
import Message from "@/lib/models/message"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chats = await Chat.find({
      participants: decoded.userId,
    })
      .populate("participants", "name email profilePicture role")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })

    // Get unread message counts
    const chatIds = chats.map((chat) => chat._id)
    const unreadCounts = await Message.aggregate([
      {
        $match: {
          chatId: { $in: chatIds },
          senderId: { $ne: decoded.userId },
          readBy: { $not: { $elemMatch: { userId: decoded.userId } } },
        },
      },
      {
        $group: {
          _id: "$chatId",
          unreadCount: { $sum: 1 },
        },
      },
    ])

    const unreadCountMap = unreadCounts.reduce((acc, item) => {
      acc[item._id.toString()] = item.unreadCount
      return acc
    }, {})

    const chatsWithUnread = chats.map((chat) => ({
      ...chat.toObject(),
      unreadCount: unreadCountMap[chat._id.toString()] || 0,
    }))

    return NextResponse.json({ chats: chatsWithUnread })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
