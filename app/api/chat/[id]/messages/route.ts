import { type NextRequest, NextResponse } from "next/server"
import { Chat } from "@/lib/models/chat"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const sendMessageSchema = z.object({
  content: z.string().min(1).max(2000),
  attachments: z.array(z.string().url()).optional(),
})

// POST /api/chat/[id]/messages - Send message
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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
    const validatedData = sendMessageSchema.parse(body)

    const chat = await Chat.findById(params.id)
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    // Check if user is participant
    if (!chat.participants.includes(decoded.userId as any)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Add message to chat
    const message = {
      sender: decoded.userId,
      content: validatedData.content,
      timestamp: new Date(),
      attachments: validatedData.attachments || [],
    }

    chat.messages.push(message as any)
    await chat.save()

    // Populate the new message
    const updatedChat = await Chat.findById(params.id).populate("messages.sender", "name email profilePicture")

    const newMessage = updatedChat?.messages[updatedChat.messages.length - 1]

    return NextResponse.json(
      {
        message: "Message sent successfully",
        newMessage,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Send message error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
