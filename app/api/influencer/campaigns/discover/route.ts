import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Campaign } from "@/lib/models/campaign"
import { Application } from "@/lib/models/application"
import { InfluencerProfile } from "@/lib/models/influencer-profile"

// GET /api/influencer/campaigns/discover - Get recommended campaigns for influencer
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
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const niche = searchParams.get("niche")
    const platform = searchParams.get("platform")
    const minBudget = searchParams.get("minBudget")
    const maxBudget = searchParams.get("maxBudget")

    // Get influencer profile for personalized recommendations
    const influencerProfile = await InfluencerProfile.findOne({ userId: decoded.userId })

    // Get campaigns user has already applied to
    const appliedCampaigns = await Application.find({ influencerId: decoded.userId }).distinct("campaignId")

    // Build filter
    const filter: any = {
      status: "published",
      "timeline.endDate": { $gte: new Date() },
      _id: { $nin: appliedCampaigns },
    }

    // Apply filters
    if (niche && niche !== "all") {
      filter.category = niche
    }

    if (platform && platform !== "all") {
      filter.targetPlatforms = { $in: [platform] }
    }

    if (minBudget) {
      filter.budget = { $gte: Number.parseInt(minBudget) }
    }

    if (maxBudget) {
      filter.budget = { ...filter.budget, $lte: Number.parseInt(maxBudget) }
    }

    // If influencer has profile, add personalized filters
    if (influencerProfile) {
      // Match campaigns that align with influencer's niches
      if (influencerProfile.niche && influencerProfile.niche.length > 0) {
        filter.$or = [
          { category: { $in: influencerProfile.niche } },
          { targetAudience: { $exists: true } }, // Keep general campaigns
        ]
      }

      // Match campaigns that target influencer's platforms
      if (influencerProfile.socialMediaStats && influencerProfile.socialMediaStats.length > 0) {
        const influencerPlatforms = influencerProfile.socialMediaStats.map((stat) => stat.platform)
        filter.targetPlatforms = { $in: influencerPlatforms }
      }
    }

    const skip = (page - 1) * limit

    const campaigns = await Campaign.find(filter)
      .populate("brandId", "name email profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Campaign.countDocuments(filter)

    // Add match score for each campaign
    const campaignsWithScore = campaigns.map((campaign) => {
      let matchScore = 50 // Base score

      if (influencerProfile) {
        // Increase score for niche match
        if (influencerProfile.niche && campaign.category && influencerProfile.niche.includes(campaign.category)) {
          matchScore += 30
        }

        // Increase score for platform match
        if (influencerProfile.socialMediaStats) {
          const influencerPlatforms = influencerProfile.socialMediaStats.map((stat) => stat.platform)
          const matchingPlatforms = campaign.targetPlatforms.filter((platform) =>
            influencerPlatforms.includes(platform),
          )
          matchScore += (matchingPlatforms.length / campaign.targetPlatforms.length) * 20
        }

        // Increase score for budget range (if influencer has pricing)
        if (influencerProfile.pricingStructure && influencerProfile.pricingStructure.length > 0) {
          const avgInfluencerPrice =
            influencerProfile.pricingStructure.reduce((sum, pricing) => sum + pricing.price, 0) /
            influencerProfile.pricingStructure.length

          if (campaign.budget >= avgInfluencerPrice * 0.8 && campaign.budget <= avgInfluencerPrice * 2) {
            matchScore += 15
          }
        }
      }

      return {
        ...campaign.toObject(),
        matchScore: Math.min(matchScore, 100),
      }
    })

    // Sort by match score
    campaignsWithScore.sort((a, b) => b.matchScore - a.matchScore)

    return NextResponse.json({
      campaigns: campaignsWithScore,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get discover campaigns error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
