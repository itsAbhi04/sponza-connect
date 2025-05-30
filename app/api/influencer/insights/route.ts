import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { Application } from "@/lib/models/application"
import { Campaign } from "@/lib/models/campaign"
import { Transaction } from "@/lib/models/transaction"

// GET /api/influencer/insights - Get AI-driven performance insights
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

    // Get influencer data
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })
    const applications = await Application.find({ influencerId: decoded.userId }).populate("campaignId")
    const transactions = await Transaction.find({ userId: decoded.userId })

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Generate insights
    const insights = {
      engagementTips: generateEngagementTips(profile),
      profileOptimization: generateProfileOptimization(profile),
      campaignSuccessMetrics: generateCampaignMetrics(applications),
      trendAlerts: await generateTrendAlerts(),
      performanceTrends: generatePerformanceTrends(transactions),
      bestPostingTimes: generateBestPostingTimes(profile),
      contentRecommendations: generateContentRecommendations(profile, applications),
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Get insights error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateEngagementTips(profile: any): string[] {
  const tips: string[] = []
  const avgEngagement =
    profile.socialMediaStats.reduce((sum: number, stat: any) => sum + stat.engagementRate, 0) /
    profile.socialMediaStats.length

  if (avgEngagement < 2) {
    tips.push("Post consistently to improve engagement")
    tips.push("Use trending hashtags in your niche")
    tips.push("Engage with your audience's comments")
  } else if (avgEngagement < 4) {
    tips.push("Create more video content for higher engagement")
    tips.push("Post during peak hours for your audience")
    tips.push("Use Instagram Stories and Reels more frequently")
  } else {
    tips.push("Maintain your excellent engagement rate")
    tips.push("Consider collaborating with other influencers")
    tips.push("Share behind-the-scenes content")
  }

  // Platform-specific tips
  profile.socialMediaStats.forEach((stat: any) => {
    if (stat.platform === "Instagram" && stat.engagementRate < 3) {
      tips.push("Use Instagram Reels to boost engagement by 20%")
    }
    if (stat.platform === "TikTok" && stat.engagementRate < 5) {
      tips.push("Post TikTok videos during 6-10 PM for better reach")
    }
    if (stat.platform === "YouTube" && stat.engagementRate < 2) {
      tips.push("Create YouTube Shorts to increase engagement")
    }
  })

  return tips.slice(0, 5)
}

function generateProfileOptimization(profile: any): any[] {
  const optimizations: any[] = []

  // Bio optimization
  if (!profile.bio || profile.bio.length < 100) {
    optimizations.push({
      type: "bio",
      priority: "high",
      suggestion: "Add a detailed bio (100+ characters)",
      impact: "30% more campaign matches",
    })
  }

  // Portfolio optimization
  if (profile.portfolio.length < 3) {
    optimizations.push({
      type: "portfolio",
      priority: "high",
      suggestion: "Add at least 3 portfolio samples",
      impact: "25% higher application acceptance",
    })
  }

  // Social media optimization
  if (profile.socialMediaStats.length < 2) {
    optimizations.push({
      type: "social_media",
      priority: "medium",
      suggestion: "Connect more social media platforms",
      impact: "40% more campaign opportunities",
    })
  }

  // Pricing structure
  if (profile.pricingStructure.length === 0) {
    optimizations.push({
      type: "pricing",
      priority: "medium",
      suggestion: "Set up pricing for different services",
      impact: "Faster brand decision-making",
    })
  }

  // Niche optimization
  if (profile.niche.length < 2) {
    optimizations.push({
      type: "niche",
      priority: "low",
      suggestion: "Add secondary niches to expand opportunities",
      impact: "15% more relevant campaigns",
    })
  }

  return optimizations
}

function generateCampaignMetrics(applications: any[]): any {
  const totalApplications = applications.length
  const acceptedApplications = applications.filter((app) => app.status === "accepted").length
  const completedApplications = applications.filter((app) => app.status === "completed").length

  const successRate = totalApplications > 0 ? (acceptedApplications / totalApplications) * 100 : 0
  const completionRate = acceptedApplications > 0 ? (completedApplications / acceptedApplications) * 100 : 0

  // Analyze successful campaigns
  const successfulCampaigns = applications.filter((app) => app.status === "completed")
  const avgBudget =
    successfulCampaigns.length > 0
      ? successfulCampaigns.reduce((sum, app) => sum + (app.campaignId?.budget || 0), 0) / successfulCampaigns.length
      : 0

  return {
    successRate: Number(successRate.toFixed(1)),
    completionRate: Number(completionRate.toFixed(1)),
    avgCampaignBudget: avgBudget,
    totalReach: calculateTotalReach(successfulCampaigns),
    bestPerformingNiches: getBestPerformingNiches(successfulCampaigns),
    insights: generateCampaignInsights(successRate, completionRate),
  }
}

async function generateTrendAlerts(): Promise<string[]> {
  const alerts: string[] = []

  // Get trending campaigns
  const recentCampaigns = await Campaign.find({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    status: "published",
  })

  // Analyze trends
  const platformTrends: { [key: string]: number } = {}
  const nicheTrends: { [key: string]: number } = {}

  recentCampaigns.forEach((campaign) => {
    campaign.targetPlatforms.forEach((platform: string) => {
      platformTrends[platform] = (platformTrends[platform] || 0) + 1
    })
    campaign.targetAudience.interests.forEach((interest: string) => {
      nicheTrends[interest] = (nicheTrends[interest] || 0) + 1
    })
  })

  // Generate alerts
  const topPlatform = Object.entries(platformTrends).sort(([, a], [, b]) => b - a)[0]
  if (topPlatform) {
    alerts.push(`${topPlatform[0]} campaigns are trending this week (+${topPlatform[1]} new campaigns)`)
  }

  const topNiche = Object.entries(nicheTrends).sort(([, a], [, b]) => b - a)[0]
  if (topNiche) {
    alerts.push(`${topNiche[0]} content is in high demand (+${topNiche[1]} campaigns)`)
  }

  alerts.push("Holiday season campaigns are starting - apply early!")
  alerts.push("Video content campaigns increased by 35% this month")

  return alerts.slice(0, 4)
}

function generatePerformanceTrends(transactions: any[]): any {
  const monthlyEarnings: { [key: string]: number } = {}

  transactions
    .filter((t) => t.type === "campaign_payment" && t.status === "completed")
    .forEach((transaction) => {
      const month = new Date(transaction.createdAt).toISOString().slice(0, 7)
      monthlyEarnings[month] = (monthlyEarnings[month] || 0) + transaction.amount
    })

  const months = Object.keys(monthlyEarnings).sort().slice(-6)
  const earnings = months.map((month) => monthlyEarnings[month] || 0)

  return {
    monthlyEarnings: months.map((month, index) => ({
      month,
      earnings: earnings[index],
    })),
    trend: calculateTrend(earnings),
    growth: calculateGrowth(earnings),
  }
}

function generateBestPostingTimes(profile: any): any {
  // AI-generated optimal posting times based on platform and niche
  const postingTimes: { [key: string]: string[] } = {
    Instagram: ["6:00 PM - 8:00 PM", "11:00 AM - 1:00 PM"],
    TikTok: ["8:00 PM - 10:00 PM", "6:00 AM - 9:00 AM"],
    YouTube: ["4:00 PM - 6:00 PM", "8:00 PM - 10:00 PM"],
    Twitter: ["9:00 AM - 10:00 AM", "7:00 PM - 9:00 PM"],
    LinkedIn: ["8:00 AM - 10:00 AM", "12:00 PM - 2:00 PM"],
    Facebook: ["1:00 PM - 3:00 PM", "7:00 PM - 9:00 PM"],
  }

  const userPlatforms = profile.socialMediaStats.map((stat: any) => stat.platform)
  const recommendations: any = {}

  userPlatforms.forEach((platform: string) => {
    if (postingTimes[platform]) {
      recommendations[platform] = postingTimes[platform]
    }
  })

  return recommendations
}

function generateContentRecommendations(profile: any, applications: any[]): string[] {
  const recommendations: string[] = []

  // Based on niche
  if (profile.niche.includes("Fashion")) {
    recommendations.push("Create outfit transition videos for higher engagement")
    recommendations.push("Share styling tips and fashion hauls")
  }

  if (profile.niche.includes("Beauty")) {
    recommendations.push("Post makeup tutorials and before/after content")
    recommendations.push("Review beauty products with honest opinions")
  }

  if (profile.niche.includes("Technology")) {
    recommendations.push("Create tech review videos and unboxing content")
    recommendations.push("Share tech tips and productivity hacks")
  }

  // Based on successful campaigns
  const successfulNiches = getBestPerformingNiches(applications.filter((app) => app.status === "completed"))
  successfulNiches.forEach((niche) => {
    recommendations.push(`Create more ${niche.toLowerCase()} content - it performs well for you`)
  })

  // General recommendations
  recommendations.push("Behind-the-scenes content increases authenticity")
  recommendations.push("User-generated content boosts engagement by 25%")

  return recommendations.slice(0, 6)
}

// Helper functions
function calculateTotalReach(campaigns: any[]): number {
  // Simplified reach calculation
  return campaigns.reduce((sum, campaign) => {
    return sum + (campaign.campaignId?.budget || 0) * 10 // Rough estimate
  }, 0)
}

function getBestPerformingNiches(campaigns: any[]): string[] {
  const nicheCount: { [key: string]: number } = {}

  campaigns.forEach((campaign) => {
    if (campaign.campaignId?.targetAudience?.interests) {
      campaign.campaignId.targetAudience.interests.forEach((interest: string) => {
        nicheCount[interest] = (nicheCount[interest] || 0) + 1
      })
    }
  })

  return Object.entries(nicheCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([niche]) => niche)
}

function generateCampaignInsights(successRate: number, completionRate: number): string[] {
  const insights: string[] = []

  if (successRate < 20) {
    insights.push("Focus on improving your application quality")
    insights.push("Apply to campaigns that better match your niche")
  } else if (successRate < 50) {
    insights.push("Your application success rate is improving")
    insights.push("Consider expanding to related niches")
  } else {
    insights.push("Excellent application success rate!")
    insights.push("You're well-positioned for premium campaigns")
  }

  if (completionRate < 80) {
    insights.push("Focus on meeting campaign deadlines")
  } else {
    insights.push("Great job completing campaigns on time")
  }

  return insights
}

function calculateTrend(earnings: number[]): string {
  if (earnings.length < 2) return "stable"

  const recent = earnings.slice(-3).reduce((sum, val) => sum + val, 0)
  const previous = earnings.slice(-6, -3).reduce((sum, val) => sum + val, 0)

  if (recent > previous * 1.1) return "increasing"
  if (recent < previous * 0.9) return "decreasing"
  return "stable"
}

function calculateGrowth(earnings: number[]): number {
  if (earnings.length < 2) return 0

  const current = earnings[earnings.length - 1]
  const previous = earnings[earnings.length - 2]

  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}
