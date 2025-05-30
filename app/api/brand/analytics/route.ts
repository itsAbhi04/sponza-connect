import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Campaign from "@/lib/models/campaign"
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

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "30d"

    // Calculate date range
    const now = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case "7d":
        startDate.setDate(now.getDate() - 7)
        break
      case "30d":
        startDate.setDate(now.getDate() - 30)
        break
      case "90d":
        startDate.setDate(now.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get brand's campaigns
    const campaigns = await Campaign.find({
      brandId: decoded.userId,
      createdAt: { $gte: startDate },
    }).populate("applications")

    // Get applications for analytics
    const applications = await Application.find({
      campaignId: { $in: campaigns.map((c) => c._id) },
      createdAt: { $gte: startDate },
    }).populate("campaignId influencerId")

    // Calculate overview metrics
    const totalSpent = campaigns.reduce((sum, campaign) => sum + (campaign.budget || 0), 0)
    const totalReach = campaigns.reduce((sum, campaign) => sum + (campaign.metrics?.reach || 0), 0)
    const totalEngagements = campaigns.reduce((sum, campaign) => sum + (campaign.metrics?.engagements || 0), 0)
    const avgEngagement = totalReach > 0 ? (totalEngagements / totalReach) * 100 : 0
    const completedCampaigns = campaigns.filter((c) => c.status === "completed").length
    const roi = totalSpent > 0 ? (totalReach * 0.001) / totalSpent : 0 // Simplified ROI calculation

    // Campaign performance data
    const campaignPerformance = campaigns
      .map((campaign) => ({
        _id: campaign._id,
        title: campaign.title,
        platform: campaign.targetPlatforms?.[0] || "Multiple",
        engagement: campaign.metrics?.engagementRate || 0,
        reach: campaign.metrics?.reach || 0,
        budget: campaign.budget,
      }))
      .sort((a, b) => b.engagement - a.engagement)

    // Platform metrics
    const platformMetrics = campaigns.reduce((acc: any[], campaign) => {
      campaign.targetPlatforms?.forEach((platform: string) => {
        const existing = acc.find((p) => p.name === platform)
        if (existing) {
          existing.campaigns += 1
          existing.reach += campaign.metrics?.reach || 0
          existing.spent += campaign.budget || 0
          existing.engagements += campaign.metrics?.engagements || 0
        } else {
          acc.push({
            name: platform,
            campaigns: 1,
            reach: campaign.metrics?.reach || 0,
            spent: campaign.budget || 0,
            engagements: campaign.metrics?.engagements || 0,
            engagement: 0,
          })
        }
      })
      return acc
    }, [])

    // Calculate engagement rates for platforms
    platformMetrics.forEach((platform) => {
      platform.engagement = platform.reach > 0 ? (platform.engagements / platform.reach) * 100 : 0
    })

    // Top influencers
    const influencerStats = applications.reduce((acc: any, app) => {
      if (app.influencerId && app.status === "completed") {
        const influencerId = app.influencerId._id.toString()
        if (!acc[influencerId]) {
          acc[influencerId] = {
            _id: influencerId,
            name: app.influencerId.name,
            followers:
              app.influencerId.socialMediaStats?.reduce((sum: number, stat: any) => sum + stat.followers, 0) || 0,
            campaigns: 0,
            totalEngagement: 0,
            totalReach: 0,
            rating: app.influencerId.averageRating || 0,
          }
        }
        acc[influencerId].campaigns += 1
        acc[influencerId].totalEngagement += app.metrics?.engagements || 0
        acc[influencerId].totalReach += app.metrics?.reach || 0
      }
      return acc
    }, {})

    const topInfluencers = Object.values(influencerStats)
      .map((inf: any) => ({
        ...inf,
        engagement: inf.totalReach > 0 ? (inf.totalEngagement / inf.totalReach) * 100 : 0,
      }))
      .sort((a: any, b: any) => b.engagement - a.engagement)
      .slice(0, 10)

    // Audience insights (simplified)
    const audienceInsights = {
      demographics: {
        age: {
          "18-24": 25,
          "25-34": 35,
          "35-44": 25,
          "45-54": 10,
          "55+": 5,
        },
        gender: {
          male: 45,
          female: 52,
          other: 3,
        },
      },
      geography: {
        India: 45,
        "United States": 25,
        "United Kingdom": 15,
        Canada: 10,
        Australia: 5,
      },
    }

    return NextResponse.json({
      overview: {
        totalSpent,
        totalReach,
        avgEngagement,
        campaignCount: campaigns.length,
        roi,
        conversionRate: (completedCampaigns / campaigns.length) * 100 || 0,
      },
      campaignPerformance,
      audienceInsights,
      platformMetrics,
      topInfluencers,
      timeSeriesData: [], // Would contain time-based metrics
    })
  } catch (error) {
    console.error("Error fetching brand analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
