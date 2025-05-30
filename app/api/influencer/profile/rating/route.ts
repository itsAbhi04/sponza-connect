import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import InfluencerProfile from "@/lib/models/influencer-profile"
import Application from "@/lib/models/application"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get influencer profile
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Calculate rating based on completed campaigns and reviews
    const completedApplications = await Application.find({
      influencerId: decoded.userId,
      status: "completed",
    }).populate("campaignId")

    let totalRating = 0
    let reviewCount = 0

    completedApplications.forEach((app: any) => {
      if (app.review && app.review.rating) {
        totalRating += app.review.rating
        reviewCount++
      }
    })

    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 4.0

    return NextResponse.json({
      rating: averageRating,
      reviewCount,
      completedCampaigns: completedApplications.length,
    })
  } catch (error) {
    console.error("Error fetching profile rating:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
