import { type NextRequest, NextResponse } from "next/server"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { connectDB } from "@/lib/db"

// GET /api/influencers - Search influencers
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const niche = searchParams.get("niche")
    const platform = searchParams.get("platform")
    const minFollowers = searchParams.get("minFollowers")
    const maxFollowers = searchParams.get("maxFollowers")
    const location = searchParams.get("location")
    const availability = searchParams.get("availability")

    const filter: any = {}

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

    const influencers = await InfluencerProfile.find(filter)
      .populate("userId", "name email profilePicture verificationStatus")
      .sort({ averageRating: -1, "socialMediaStats.followers": -1 })
      .limit(50)

    return NextResponse.json({ influencers }, { status: 200 })
  } catch (error) {
    console.error("Get influencers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
