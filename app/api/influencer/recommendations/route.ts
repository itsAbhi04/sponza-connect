import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Campaign } from "@/lib/models/campaign"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { Application } from "@/lib/models/application"

interface CampaignWithScore {
  campaign: any
  matchScore: number
  matchReasons: string[]
}

// GET /api/influencer/recommendations - Get AI-powered campaign recommendations
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
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Get influencer profile
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get applied campaign IDs to exclude
    const appliedCampaigns = await Application.find({ influencerId: decoded.userId }).select("campaignId")
    const appliedCampaignIds = appliedCampaigns.map((app) => app.campaignId.toString())

    // Get available campaigns
    const campaigns = await Campaign.find({
      status: "published",
      "timeline.endDate": { $gte: new Date() },
      _id: { $nin: appliedCampaignIds },
    })
      .populate("brandId", "name email")
      .sort({ createdAt: -1 })

    // AI-powered matching algorithm
    const scoredCampaigns: CampaignWithScore[] = campaigns.map((campaign) => {
      let score = 0
      const reasons: string[] = []

      // Niche matching (40% weight)
      const nicheMatch = profile.niche.some((niche) =>
        campaign.targetAudience.interests.some((interest: string) =>
          interest.toLowerCase().includes(niche.toLowerCase()),
        ),
      )
      if (nicheMatch) {
        score += 40
        reasons.push("Matches your niche expertise")
      }

      // Platform matching (30% weight)
      const platformMatch = profile.socialMediaStats.some((stat) => campaign.targetPlatforms.includes(stat.platform))
      if (platformMatch) {
        score += 30
        reasons.push("Available on your active platforms")
      }

      // Follower count compatibility (20% weight)
      const totalFollowers = profile.socialMediaStats.reduce((sum, stat) => sum + stat.followers, 0)
      if (totalFollowers >= 1000 && totalFollowers <= 100000 && campaign.budget >= 5000) {
        score += 20
        reasons.push("Budget matches your follower range")
      } else if (totalFollowers > 100000 && campaign.budget >= 15000) {
        score += 20
        reasons.push("Premium budget for your reach")
      }

      // Engagement rate bonus (10% weight)
      const avgEngagement =
        profile.socialMediaStats.reduce((sum, stat) => sum + stat.engagementRate, 0) / profile.socialMediaStats.length
      if (avgEngagement > 3) {
        score += 10
        reasons.push("High engagement rate valued")
      }

      // Location matching bonus
      if (
        campaign.targetAudience.location.includes(profile.location) ||
        campaign.targetAudience.location.includes("All Locations")
      ) {
        score += 5
        reasons.push("Location preference match")
      }

      // Recent activity bonus
      const campaignAge = Date.now() - new Date(campaign.createdAt).getTime()
      if (campaignAge < 7 * 24 * 60 * 60 * 1000) {
        // Less than 7 days old
        score += 5
        reasons.push("Recently posted campaign")
      }

      return {
        campaign,
        matchScore: Math.min(score, 100),
        matchReasons: reasons,
      }
    })

    // Sort by match score and take top results
    const recommendations = scoredCampaigns
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
      .map((item) => ({
        ...item.campaign.toObject(),
        matchScore: item.matchScore,
        matchReasons: item.matchReasons,
      }))

    // Generate AI insights
    const insights = {
      totalCampaigns: campaigns.length,
      highMatchCampaigns: scoredCampaigns.filter((c) => c.matchScore >= 70).length,
      topNiches: getTopNiches(campaigns, profile.niche),
      avgBudget: campaigns.reduce((sum, c) => sum + c.budget, 0) / campaigns.length,
      trendingPlatforms: getTrendingPlatforms(campaigns),
    }

    return NextResponse.json({
      recommendations,
      insights,
      profileOptimization: generateProfileOptimization(profile),
    })
  } catch (error) {
    console.error("Get recommendations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getTopNiches(campaigns: any[], userNiches: string[]): string[] {
  const nicheCount: { [key: string]: number } = {}

  campaigns.forEach((campaign) => {
    campaign.targetAudience.interests.forEach((interest: string) => {
      nicheCount[interest] = (nicheCount[interest] || 0) + 1
    })
  })

  return Object.entries(nicheCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([niche]) => niche)
}

function getTrendingPlatforms(campaigns: any[]): string[] {
  const platformCount: { [key: string]: number } = {}

  campaigns.forEach((campaign) => {
    campaign.targetPlatforms.forEach((platform: string) => {
      platformCount[platform] = (platformCount[platform] || 0) + 1
    })
  })

  return Object.entries(platformCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([platform]) => platform)
}

function generateProfileOptimization(profile: any): string[] {
  const suggestions: string[] = []

  if (!profile.bio || profile.bio.length < 100) {
    suggestions.push("Add a detailed bio to attract more brands")
  }

  if (profile.socialMediaStats.length < 2) {
    suggestions.push("Connect more social media platforms")
  }

  if (profile.portfolio.length < 3) {
    suggestions.push("Add portfolio samples to showcase your work")
  }

  const avgEngagement =
    profile.socialMediaStats.reduce((sum: number, stat: any) => sum + stat.engagementRate, 0) /
    profile.socialMediaStats.length
  if (avgEngagement < 2) {
    suggestions.push("Focus on increasing engagement rate")
  }

  if (profile.pricingStructure.length === 0) {
    suggestions.push("Set up pricing structure for different services")
  }

  return suggestions
}
