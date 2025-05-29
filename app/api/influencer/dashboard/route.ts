import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Campaign } from "@/lib/models/campaign"
import { Application } from "@/lib/models/application"
import { Transaction } from "@/lib/models/transaction"
import { Wallet } from "@/lib/models/wallet"
import { InfluencerProfile } from "@/lib/models/influencer-profile"

// GET /api/influencer/dashboard - Get influencer dashboard data
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

    // Get influencer profile
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })

    // Get applications
    const applications = await Application.find({ influencerId: decoded.userId })
      .populate({
        path: "campaignId",
        populate: {
          path: "brandId",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 })
      .limit(10)

    // Get wallet
    const wallet = await Wallet.findOne({ userId: decoded.userId })

    // Get recent transactions
    const recentTransactions = await Transaction.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(5)

    // Calculate stats
    const totalApplications = applications.length
    const acceptedApplications = applications.filter((app) => app.status === "accepted").length
    const completedApplications = applications.filter((app) => app.status === "completed").length
    const pendingApplications = applications.filter((app) => app.status === "applied").length

    const totalEarnings = recentTransactions
      .filter((t) => t.type === "campaign_payment" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)

    const thisMonthEarnings = recentTransactions
      .filter(
        (t) =>
          t.type === "campaign_payment" &&
          t.status === "completed" &&
          new Date(t.createdAt).getMonth() === new Date().getMonth(),
      )
      .reduce((sum, t) => sum + t.amount, 0)

    // Get available campaigns (recommendations)
    const availableCampaigns = await Campaign.find({
      status: "published",
      "timeline.endDate": { $gte: new Date() },
    })
      .populate("brandId", "name email")
      .sort({ createdAt: -1 })
      .limit(6)

    // Calculate performance metrics
    const totalFollowers = profile?.socialMediaStats?.reduce((sum, stat) => sum + stat.followers, 0) || 0
    const avgEngagement =
      profile?.socialMediaStats?.reduce((sum, stat) => sum + stat.engagementRate, 0) /
        (profile?.socialMediaStats?.length || 1) || 0

    const dashboardData = {
      stats: {
        totalApplications,
        acceptedApplications,
        completedApplications,
        pendingApplications,
        totalEarnings,
        thisMonthEarnings,
        currentBalance: wallet?.balance || 0,
        totalFollowers,
        avgEngagement: Number(avgEngagement.toFixed(1)),
        profileRating: profile?.averageRating || 0,
        totalReviews: profile?.totalReviews || 0,
      },
      recentApplications: applications.slice(0, 5),
      recentTransactions,
      availableCampaigns,
      profile: {
        isComplete: !!(profile?.bio && profile?.location && profile?.niche?.length > 0),
        availabilityStatus: profile?.availabilityStatus || "available",
        niche: profile?.niche || [],
        socialMediaStats: profile?.socialMediaStats || [],
      },
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Get influencer dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
