import { type NextRequest, NextResponse } from "next/server"
import { Chat } from "@/lib/models/chat"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const createChatSchema = z.object({
  participantId: z.string(),
})

const sendMessageSchema = z.object({
  content: z.string().min(1).max(2000),
  attachments: z.array(z.string().url()).optional(),
})

// GET /api/chat - Get user's conversations
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

    const chats = await Chat.find({
      participants: decoded.userId,
    })
      .populate("participants", "name email profilePicture role")
      .sort({ updatedAt: -1 })

    return NextResponse.json({ chats }, { status: 200 })
  } catch (error) {
    console.error("Get chats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/chat - Start new conversation
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const validatedData = createChatSchema.parse(body)

    // Check if conversation already exists
    const existingChat = await Chat.findOne({
      participants: { $all: [decoded.userId, validatedData.participantId] },
    })

    if (existingChat) {
      return NextResponse.json({ chat: existingChat }, { status: 200 })
    }

    // Create new conversation
    const conversationId = `${decoded.userId}_${validatedData.participantId}_${Date.now()}`

    const chat = new Chat({
      conversationId,
      participants: [decoded.userId, validatedData.participantId],
      messages: [],
    })

    await chat.save()

    const populatedChat = await Chat.findById(chat._id).populate("participants", "name email profilePicture role")

    return NextResponse.json(
      {
        message: "Conversation created successfully",
        chat: populatedChat,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create chat error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
