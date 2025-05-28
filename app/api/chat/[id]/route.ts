import { type NextRequest, NextResponse } from "next/server"
import { Chat } from "@/lib/models/chat"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET /api/chat/[id] - Get chat history
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const chat = await Chat.findById(params.id)
      .populate("participants", "name email profilePicture role")
      .populate("messages.sender", "name email profilePicture")

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    // Check if user is participant
    if (!chat.participants.some((p: any) => p._id.toString() === decoded.userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ chat }, { status: 200 })
  } catch (error) {
    console.error("Get chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
