import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { User } from "@/lib/models/user"
import { connectDB } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const type = searchParams.get("type") || "all"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!query || query.length < 2) {
      return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 })
    }

    const results: any = {
      campaigns: [],
      influencers: [],
      brands: [],
    }

    const searchRegex = new RegExp(query, "i")

    if (type === "all" || type === "campaigns") {
      results.campaigns = await Campaign.find({
        $and: [
          { status: "published" },
          {
            $or: [
              { title: searchRegex },
              { description: searchRegex },
              { targetPlatforms: { $in: [searchRegex] } },
              { "targetAudience.interests": { $in: [searchRegex] } },
            ],
          },
        ],
      })
        .populate("brandId", "name")
        .limit(limit)
        .select("title description budget targetPlatforms timeline")
    }

    if (type === "all" || type === "influencers") {
      const influencerProfiles = await InfluencerProfile.find({
        $or: [{ bio: searchRegex }, { niche: { $in: [searchRegex] } }, { location: searchRegex }],
      })
        .populate("userId", "name email profilePicture")
        .limit(limit)
        .select("bio niche location averageRating socialMediaStats")

      results.influencers = influencerProfiles.filter((profile) => profile.userId)
    }

    if (type === "all" || type === "brands") {
      const brandUsers = await User.find({
        $and: [{ role: "brand" }, { name: searchRegex }],
      })
        .limit(limit)
        .select("name email profilePicture")

      results.brands = brandUsers
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
