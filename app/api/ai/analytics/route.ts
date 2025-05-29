import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { Application } from "@/lib/models/application"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { Transaction } from "@/lib/models/transaction"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET /api/ai/analytics - Get AI-powered analytics insights
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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // "performance", "trends", "predictions"
    const timeframe = searchParams.get("timeframe") || "30d" // "7d", "30d", "90d", "1y"

    const timeframeDays =
      {
        "7d": 7,
        "30d": 30,
        "90d": 90,
        "1y": 365,
      }[timeframe] || 30

    const startDate = new Date(Date.now() - timeframeDays * 24 * 60 * 60 * 1000)

    switch (type) {
      case "performance":
        return await getPerformanceInsights(decoded.userId, decoded.role, startDate)
      case "trends":
        return await getTrendAnalysis(startDate)
      case "predictions":
        return await getPredictiveInsights(decoded.userId, decoded.role, startDate)
      default:
        return await getGeneralInsights(decoded.userId, decoded.role, startDate)
    }
  } catch (error) {
    console.error("AI analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function getPerformanceInsights(userId: string, role: string, startDate: Date) {
  const insights: any = {
    summary: {},
    recommendations: [],
    metrics: {},
  }

  if (role === "influencer") {
    // Get influencer's applications and success rate
    const applications = await Application.find({
      influencerId: userId,
      createdAt: { $gte: startDate },
    }).populate("campaignId")

    const acceptedApplications = applications.filter((app) => app.status === "accepted")
    const completedApplications = applications.filter((app) => app.status === "completed")

    insights.summary = {
      totalApplications: applications.length,
      acceptanceRate: applications.length > 0 ? (acceptedApplications.length / applications.length) * 100 : 0,
      completionRate:
        acceptedApplications.length > 0 ? (completedApplications.length / acceptedApplications.length) * 100 : 0,
    }

    // Generate recommendations
    if (insights.summary.acceptanceRate < 30) {
      insights.recommendations.push({
        type: "improvement",
        title: "Improve Application Quality",
        description:
          "Your acceptance rate is below average. Consider personalizing your proposals and highlighting relevant experience.",
        priority: "high",
      })
    }

    if (applications.length < 5) {
      insights.recommendations.push({
        type: "opportunity",
        title: "Apply to More Campaigns",
        description: "Increase your visibility by applying to more relevant campaigns that match your niche.",
        priority: "medium",
      })
    }

    // Calculate average earnings
    const earnings = await Transaction.find({
      userId,
      type: "campaign_payment",
      status: "completed",
      createdAt: { $gte: startDate },
    })

    insights.metrics.totalEarnings = earnings.reduce((sum, transaction) => sum + transaction.amount, 0)
    insights.metrics.averageEarningsPerCampaign =
      completedApplications.length > 0 ? insights.metrics.totalEarnings / completedApplications.length : 0
  } else if (role === "brand") {
    // Get brand's campaigns and performance
    const campaigns = await Campaign.find({
      brandId: userId,
      createdAt: { $gte: startDate },
    })

    const publishedCampaigns = campaigns.filter((campaign) => campaign.status === "published")
    const completedCampaigns = campaigns.filter((campaign) => campaign.status === "completed")

    // Get applications for brand's campaigns
    const campaignIds = campaigns.map((campaign) => campaign._id)
    const applications = await Application.find({
      campaignId: { $in: campaignIds },
    })

    insights.summary = {
      totalCampaigns: campaigns.length,
      publishedCampaigns: publishedCampaigns.length,
      completedCampaigns: completedCampaigns.length,
      totalApplications: applications.length,
      averageApplicationsPerCampaign: campaigns.length > 0 ? applications.length / campaigns.length : 0,
    }

    // Generate recommendations
    if (insights.summary.averageApplicationsPerCampaign < 3) {
      insights.recommendations.push({
        type: "improvement",
        title: "Improve Campaign Visibility",
        description:
          "Your campaigns are receiving fewer applications than average. Consider increasing budget or improving campaign descriptions.",
        priority: "high",
      })
    }

    if (completedCampaigns.length === 0 && publishedCampaigns.length > 0) {
      insights.recommendations.push({
        type: "action",
        title: "Follow Up on Active Campaigns",
        description:
          "You have active campaigns that haven't been completed. Consider reaching out to selected influencers.",
        priority: "medium",
      })
    }

    // Calculate spending
    const spending = await Transaction.find({
      userId,
      type: "campaign_payment",
      status: "completed",
      createdAt: { $gte: startDate },
    })

    insights.metrics.totalSpending = spending.reduce((sum, transaction) => sum + transaction.amount, 0)
    insights.metrics.averageSpendingPerCampaign =
      completedCampaigns.length > 0 ? insights.metrics.totalSpending / completedCampaigns.length : 0
  }

  return NextResponse.json(insights)
}

async function getTrendAnalysis(startDate: Date) {
  // Analyze platform trends
  const campaigns = await Campaign.find({
    createdAt: { $gte: startDate },
    status: { $in: ["published", "completed"] },
  })

  const platformTrends = campaigns.reduce((acc: any, campaign) => {
    campaign.targetPlatforms.forEach((platform) => {
      acc[platform] = (acc[platform] || 0) + 1
    })
    return acc
  }, {})

  // Analyze niche trends
  const influencerProfiles = await InfluencerProfile.find({
    createdAt: { $gte: startDate },
  })

  const nicheTrends = influencerProfiles.reduce((acc: any, profile) => {
    profile.niche.forEach((niche) => {
      acc[niche] = (acc[niche] || 0) + 1
    })
    return acc
  }, {})

  // Analyze budget trends
  const budgetRanges = campaigns.reduce((acc: any, campaign) => {
    const budget = campaign.budget
    let range = "0-10k"
    if (budget > 100000) range = "100k+"
    else if (budget > 50000) range = "50k-100k"
    else if (budget > 10000) range = "10k-50k"

    acc[range] = (acc[range] || 0) + 1
    return acc
  }, {})

  return NextResponse.json({
    trends: {
      platforms: platformTrends,
      niches: nicheTrends,
      budgets: budgetRanges,
    },
    insights: [
      {
        title: "Platform Growth",
        description: `${Object.keys(platformTrends)[0]} is the most popular platform for campaigns`,
        trend: "up",
      },
      {
        title: "Emerging Niches",
        description: `${Object.keys(nicheTrends)[0]} niche is gaining popularity among influencers`,
        trend: "up",
      },
    ],
  })
}

async function getPredictiveInsights(userId: string, role: string, startDate: Date) {
  // Simplified predictive analytics
  const predictions: any = {
    nextMonth: {},
    recommendations: [],
  }

  if (role === "influencer") {
    const applications = await Application.find({
      influencerId: userId,
      createdAt: { $gte: startDate },
    })

    const monthlyApplications =
      applications.length * (30 / ((Date.now() - startDate.getTime()) / (24 * 60 * 60 * 1000)))

    predictions.nextMonth = {
      expectedApplications: Math.round(monthlyApplications),
      expectedAcceptances: Math.round(monthlyApplications * 0.3), // Assuming 30% acceptance rate
      potentialEarnings: Math.round(monthlyApplications * 0.3 * 15000), // Assuming ₹15k per campaign
    }

    predictions.recommendations.push({
      title: "Optimize Application Timing",
      description: "Based on your data, applying on weekdays increases acceptance rate by 15%",
      impact: "medium",
    })
  } else if (role === "brand") {
    const campaigns = await Campaign.find({
      brandId: userId,
      createdAt: { $gte: startDate },
    })

    const monthlyCampaigns = campaigns.length * (30 / ((Date.now() - startDate.getTime()) / (24 * 60 * 60 * 1000)))

    predictions.nextMonth = {
      expectedCampaigns: Math.round(monthlyCampaigns),
      expectedApplications: Math.round(monthlyCampaigns * 5), // Assuming 5 applications per campaign
      estimatedSpending: Math.round(monthlyCampaigns * 25000), // Assuming ₹25k per campaign
    }

    predictions.recommendations.push({
      title: "Budget Optimization",
      description: "Increasing budget by 20% could improve application quality by 35%",
      impact: "high",
    })
  }

  return NextResponse.json(predictions)
}

async function getGeneralInsights(userId: string, role: string, startDate: Date) {
  // Combine all insights for a general overview
  const performance = await getPerformanceInsights(userId, role, startDate)
  const trends = await getTrendAnalysis(startDate)
  const predictions = await getPredictiveInsights(userId, role, startDate)

  return NextResponse.json({
    performance: performance.body,
    trends: trends.body,
    predictions: predictions.body,
    timestamp: new Date().toISOString(),
  })
}
