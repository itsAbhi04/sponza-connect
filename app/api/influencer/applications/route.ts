import { type NextRequest, NextResponse } from "next/server"
import { Application } from "@/lib/models/application"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET /api/influencer/applications - Get influencer's applications
export async function GET(request: NextRequest) {
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

    const applications = await Application.find({ influencerId: decoded.userId })
      .populate({
        path: "campaignId",
        populate: {
          path: "brandId",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 })

    return NextResponse.json({ applications }, { status: 200 })
  } catch (error) {
    console.error("Get influencer applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
