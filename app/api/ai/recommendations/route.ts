import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { Application } from "@/lib/models/application"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET /api/ai/recommendations - Get AI-powered recommendations
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
    const type = searchParams.get("type") // "campaigns" or "influencers"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (decoded.role === "influencer" && type === "campaigns") {
      return await getRecommendedCampaigns(decoded.userId, limit)
    } else if (decoded.role === "brand" && type === "influencers") {
      const campaignId = searchParams.get("campaignId")
      if (!campaignId) {
        return NextResponse.json({ error: "Campaign ID required for influencer recommendations" }, { status: 400 })
      }
      return await getRecommendedInfluencers(campaignId, limit)
    }

    return NextResponse.json({ error: "Invalid recommendation type for user role" }, { status: 400 })
  } catch (error) {
    console.error("AI recommendations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function getRecommendedCampaigns(influencerId: string, limit: number) {
  try {
    // Get influencer profile to understand their niche and preferences
    const influencerProfile = await InfluencerProfile.findOne({ userId: influencerId })
    if (!influencerProfile) {
      return NextResponse.json({ error: "Influencer profile not found" }, { status: 404 })
    }

    // Get campaigns the influencer has already applied to
    const appliedCampaigns = await Application.find({ influencerId }).distinct("campaignId")

    // Find campaigns matching influencer's niche and platforms
    const matchingCampaigns = await Campaign.find({
      _id: { $nin: appliedCampaigns },
      status: "published",
      $or: [
        { targetPlatforms: { $in: influencerProfile.socialMediaStats.map((stat) => stat.platform) } },
        { "targetAudience.interests": { $in: influencerProfile.niche } },
      ],
    })
      .populate("brandId", "name profilePicture")
      .sort({ createdAt: -1 })
      .limit(limit)

    // Calculate match scores (simplified AI logic)
    const recommendedCampaigns = matchingCampaigns.map((campaign) => {
      let matchScore = 0

      // Platform match
      const platformMatch = campaign.targetPlatforms.some((platform) =>
        influencerProfile.socialMediaStats.some((stat) => stat.platform === platform),
      )
      if (platformMatch) matchScore += 30

      // Niche match
      const nicheMatch = campaign.targetAudience?.interests?.some((interest) =>
        influencerProfile.niche.includes(interest),
      )
      if (nicheMatch) matchScore += 40

      // Budget compatibility (simplified)
      const avgPricing =
        influencerProfile.pricingStructure.reduce((sum, pricing) => sum + pricing.price, 0) /
        (influencerProfile.pricingStructure.length || 1)
      if (campaign.budget >= avgPricing * 0.8) matchScore += 20

      // Follower count relevance
      const totalFollowers = influencerProfile.socialMediaStats.reduce((sum, stat) => sum + stat.followers, 0)
      if (totalFollowers >= 1000) matchScore += 10

      return {
        ...campaign.toObject(),
        matchScore,
        matchReasons: [
          ...(platformMatch ? ["Platform compatibility"] : []),
          ...(nicheMatch ? ["Niche alignment"] : []),
          ...(campaign.budget >= avgPricing * 0.8 ? ["Budget compatibility"] : []),
        ],
      }
    })

    // Sort by match score
    recommendedCampaigns.sort((a, b) => b.matchScore - a.matchScore)

    return NextResponse.json({ campaigns: recommendedCampaigns })
  } catch (error) {
    console.error("Get recommended campaigns error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function getRecommendedInfluencers(campaignId: string, limit: number) {
  try {
    // Get campaign details
    const campaign = await Campaign.findById(campaignId)
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Get influencers who have already applied
    const appliedInfluencers = await Application.find({ campaignId }).distinct("influencerId")

    // Find matching influencer profiles
    const matchingInfluencers = await InfluencerProfile.find({
      userId: { $nin: appliedInfluencers },
      availabilityStatus: "available",
      $or: [
        { niche: { $in: campaign.targetAudience?.interests || [] } },
        { "socialMediaStats.platform": { $in: campaign.targetPlatforms } },
      ],
    })
      .populate("userId", "name email profilePicture")
      .limit(limit * 2) // Get more to filter and rank

    // Calculate match scores
    const recommendedInfluencers = matchingInfluencers.map((influencer) => {
      let matchScore = 0

      // Platform match
      const platformMatch = influencer.socialMediaStats.some((stat) => campaign.targetPlatforms.includes(stat.platform))
      if (platformMatch) matchScore += 30

      // Niche match
      const nicheMatch = influencer.niche.some((niche) => campaign.targetAudience?.interests?.includes(niche))
      if (nicheMatch) matchScore += 40

      // Rating bonus
      if (influencer.averageRating >= 4.0) matchScore += 15
      if (influencer.averageRating >= 4.5) matchScore += 10

      // Engagement rate bonus
      const avgEngagement =
        influencer.socialMediaStats.reduce((sum, stat) => sum + stat.engagementRate, 0) /
        (influencer.socialMediaStats.length || 1)
      if (avgEngagement >= 3.0) matchScore += 10
      if (avgEngagement >= 5.0) matchScore += 10

      // Follower count relevance
      const totalFollowers = influencer.socialMediaStats.reduce((sum, stat) => sum + stat.followers, 0)
      if (totalFollowers >= 10000) matchScore += 5
      if (totalFollowers >= 100000) matchScore += 10

      return {
        ...influencer.toObject(),
        matchScore,
        matchReasons: [
          ...(platformMatch ? ["Platform presence"] : []),
          ...(nicheMatch ? ["Niche expertise"] : []),
          ...(influencer.averageRating >= 4.0 ? ["High ratings"] : []),
          ...(avgEngagement >= 3.0 ? ["Good engagement"] : []),
        ],
      }
    })

    // Sort by match score and limit results
    recommendedInfluencers.sort((a, b) => b.matchScore - a.matchScore)
    const topInfluencers = recommendedInfluencers.slice(0, limit)

    return NextResponse.json({ influencers: topInfluencers })
  } catch (error) {
    console.error("Get recommended influencers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
