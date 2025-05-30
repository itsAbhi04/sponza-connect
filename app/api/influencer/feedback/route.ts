import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// POST /api/influencer/feedback - Submit AI feedback
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "influencer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, itemId, rating, feedback, category } = await request.json()

    // Validate input
    if (!type || !itemId || (!rating && !feedback)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Store feedback (you can create a Feedback model for this)
    const feedbackData = {
      userId: decoded.userId,
      type, // "recommendation", "insight", "chatbot"
      itemId,
      rating,
      feedback,
      category,
      createdAt: new Date(),
    }

    // For now, just log the feedback
    console.log("AI Feedback received:", feedbackData)

    return NextResponse.json({ message: "Feedback submitted successfully" })
  } catch (error) {
    console.error("Submit feedback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
