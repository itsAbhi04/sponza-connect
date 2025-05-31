import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Analytics from "@/lib/models/analytics"
import Application from "@/lib/models/application"
import Transaction from "@/lib/models/transaction"
import { InfluencerProfile } from "@/lib/models/influencer-profile"

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

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "monthly"
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // Calculate date range
    const now = new Date()
    let dateFilter: any = {}

    if (startDate && endDate) {
      dateFilter = {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }
    } else {
      const start = new Date()
      switch (period) {
        case "weekly":
          start.setDate(now.getDate() - 7)
          break
        case "monthly":
          start.setMonth(now.getMonth() - 1)
          break
        case "yearly":
          start.setFullYear(now.getFullYear() - 1)
          break
        default:
          start.setMonth(now.getMonth() - 1)
      }
      dateFilter = { date: { $gte: start } }
    }

    // Get analytics data
    const analytics = await Analytics.find({
      userId: decoded.userId,
      period,
      ...dateFilter,
    }).sort({ date: -1 })

    // Get profile data for follower counts
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })

    // Get campaign performance
    const applications = await Application.find({
      influencerId: decoded.userId,
      status: { $in: ["accepted", "completed"] },
      createdAt: dateFilter.date
        ? { $gte: dateFilter.date.$gte, $lte: dateFilter.date.$lte || now }
        : { $gte: dateFilter.date?.$gte || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) },
    }).populate("campaignId")

    // Get earnings data
    const transactions = await Transaction.find({
      userId: decoded.userId,
      type: "campaign_payment",
      status: "completed",
      createdAt: dateFilter.date
        ? { $gte: dateFilter.date.$gte, $lte: dateFilter.date.$lte || now }
        : { $gte: dateFilter.date?.$gte || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) },
    })

    // Calculate metrics
    const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0)
    const totalApplications = applications.length
    const completedCampaigns = applications.filter((a) => a.status === "completed").length
    const averageEarningsPerCampaign = completedCampaigns > 0 ? totalEarnings / completedCampaigns : 0

    // Platform breakdown from profile
    const platformBreakdown =
      profile?.socialMediaStats?.map((stat) => ({
        platform: stat.platform,
        followers: stat.followers,
        engagementRate: stat.engagementRate,
        posts: Math.floor(Math.random() * 50) + 10, // Mock data - would come from actual platform APIs
        reach: Math.floor(stat.followers * (stat.engagementRate / 100) * 10),
      })) || []

    // Top performing content (mock data - would come from actual platform APIs)
    const topPerformingContent = [
      {
        contentId: "post_1",
        platform: "Instagram",
        type: "Reel",
        engagement: 15420,
        reach: 89650,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        contentId: "post_2",
        platform: "YouTube",
        type: "Video",
        engagement: 8930,
        reach: 45200,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        contentId: "post_3",
        platform: "TikTok",
        type: "Video",
        engagement: 12340,
        reach: 67800,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ]

    // Growth metrics
    const previousPeriodStart = new Date(dateFilter.date?.$gte || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))
    previousPeriodStart.setTime(previousPeriodStart.getTime() - (now.getTime() - previousPeriodStart.getTime()))

    const previousTransactions = await Transaction.find({
      userId: decoded.userId,
      type: "campaign_payment",
      status: "completed",
      createdAt: {
        $gte: previousPeriodStart,
        $lt: dateFilter.date?.$gte || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    })

    const previousEarnings = previousTransactions.reduce((sum, t) => sum + t.amount, 0)
    const earningsGrowth = previousEarnings > 0 ? ((totalEarnings - previousEarnings) / previousEarnings) * 100 : 0

    // Engagement trends (mock data)
    const engagementTrends = analytics.map((a) => ({
      date: a.date,
      engagement: a.metrics.engagementRate,
      reach: a.metrics.impressions,
      followers: a.metrics.followerGrowth,
    }))

    return NextResponse.json({
      overview: {
        totalEarnings,
        totalApplications,
        completedCampaigns,
        averageEarningsPerCampaign,
        earningsGrowth,
        profileViews: analytics.reduce((sum, a) => sum + a.metrics.profileViews, 0),
        totalFollowers: platformBreakdown.reduce((sum, p) => sum + p.followers, 0),
      },
      platformBreakdown,
      topPerformingContent,
      engagementTrends,
      campaignPerformance: applications.map((app) => ({
        id: app._id,
        title: app.campaignId?.title,
        platform: app.campaignId?.targetPlatforms?.[0],
        earnings: app.finalPayment || app.pricing,
        status: app.status,
        completedAt: app.updatedAt,
      })),
      analytics,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
