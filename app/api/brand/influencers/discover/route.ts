import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { BrandProfile } from "@/lib/models/brand-profile"

// GET /api/brand/influencers/discover - Get recommended influencers for brand
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const niche = searchParams.get("niche")
    const platform = searchParams.get("platform")
    const minFollowers = searchParams.get("minFollowers")
    const maxFollowers = searchParams.get("maxFollowers")
    const location = searchParams.get("location")
    const availability = searchParams.get("availability")
    const minRating = searchParams.get("minRating")

    // Get brand profile for personalized recommendations
    const brandProfile = await BrandProfile.findOne({ userId: decoded.userId })

    // Build filter
    const filter: any = {}

    // Apply filters
    if (niche && niche !== "all") {
      filter.niche = { $in: [niche] }
    }

    if (platform && platform !== "all") {
      filter["socialMediaStats.platform"] = platform
    }

    if (minFollowers) {
      filter["socialMediaStats.followers"] = { $gte: Number.parseInt(minFollowers) }
    }

    if (maxFollowers) {
      filter["socialMediaStats.followers"] = {
        ...filter["socialMediaStats.followers"],
        $lte: Number.parseInt(maxFollowers),
      }
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }
    }

    if (availability && availability !== "all") {
      filter.availabilityStatus = availability
    }

    if (minRating) {
      filter.averageRating = { $gte: Number.parseFloat(minRating) }
    }

    const skip = (page - 1) * limit

    const influencers = await InfluencerProfile.find(filter)
      .populate("userId", "name email profilePicture verificationStatus")
      .sort({ averageRating: -1, totalReviews: -1 })
      .skip(skip)
      .limit(limit)

    const total = await InfluencerProfile.countDocuments(filter)

    // Add match score for each influencer
    const influencersWithScore = influencers.map((influencer) => {
      let matchScore = 50 // Base score
      const matchReasons: string[] = []

      // Increase score for high rating
      if (influencer.averageRating >= 4.5) {
        matchScore += 20
        matchReasons.push("High rating")
      }

      // Increase score for availability
      if (influencer.availabilityStatus === "available") {
        matchScore += 15
        matchReasons.push("Available")
      }

      // Increase score for verification
      if (influencer.userId.verificationStatus === "verified") {
        matchScore += 10
        matchReasons.push("Verified")
      }

      // Industry match with brand
      if (brandProfile && brandProfile.industry) {
        const industryNicheMap: { [key: string]: string[] } = {
          Fashion: ["Fashion", "Beauty", "Lifestyle"],
          Technology: ["Technology", "Gaming", "Education"],
          "Food & Beverage": ["Food", "Lifestyle"],
          Travel: ["Travel", "Lifestyle"],
          Fitness: ["Fitness", "Lifestyle"],
          Beauty: ["Beauty", "Fashion", "Lifestyle"],
        }

        const relevantNiches = industryNicheMap[brandProfile.industry] || []
        const matchingNiches = influencer.niche.filter((niche) => relevantNiches.includes(niche))

        if (matchingNiches.length > 0) {
          matchScore += 25
          matchReasons.push(`${brandProfile.industry} industry match`)
        }
      }

      // Follower count bonus
      const totalFollowers = influencer.socialMediaStats.reduce((sum, stat) => sum + stat.followers, 0)
      if (totalFollowers >= 100000) {
        matchScore += 10
        matchReasons.push("Large following")
      } else if (totalFollowers >= 10000) {
        matchScore += 5
        matchReasons.push("Good following")
      }

      // Engagement rate bonus
      const avgEngagement =
        influencer.socialMediaStats.reduce((sum, stat) => sum + stat.engagementRate, 0) /
        (influencer.socialMediaStats.length || 1)

      if (avgEngagement >= 5) {
        matchScore += 15
        matchReasons.push("High engagement")
      } else if (avgEngagement >= 3) {
        matchScore += 10
        matchReasons.push("Good engagement")
      }

      return {
        ...influencer.toObject(),
        matchScore: Math.min(matchScore, 100),
        matchReasons,
      }
    })

    // Sort by match score
    influencersWithScore.sort((a, b) => b.matchScore - a.matchScore)

    return NextResponse.json({
      influencers: influencersWithScore,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get discover influencers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
