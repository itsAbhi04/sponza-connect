import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { connectDB } from "@/lib/db"

// GET /api/search - Global search
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const type = searchParams.get("type") || "all"

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const results: any = {}

    if (type === "all" || type === "campaigns") {
      const campaigns = await Campaign.find({
        $and: [
          { status: "published" },
          {
            $or: [
              { title: { $regex: query, $options: "i" } },
              { description: { $regex: query, $options: "i" } },
              { targetPlatforms: { $in: [new RegExp(query, "i")] } },
            ],
          },
        ],
      })
        .populate("brandId", "name")
        .limit(10)

      results.campaigns = campaigns
    }

    if (type === "all" || type === "influencers") {
      const influencers = await InfluencerProfile.find({
        $or: [
          { bio: { $regex: query, $options: "i" } },
          { niche: { $in: [new RegExp(query, "i")] } },
          { location: { $regex: query, $options: "i" } },
        ],
      })
        .populate("userId", "name profilePicture")
        .limit(10)

      results.influencers = influencers
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
