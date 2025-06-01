import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Application from "@/lib/models/application"
import Campaign from "@/lib/models/campaign"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const campaignId = searchParams.get("campaignId")

    // Get brand's campaigns first
    const brandCampaigns = await Campaign.find({ brandId: decoded.userId }).select("_id")
    const campaignIds = brandCampaigns.map((c) => c._id)

    const query: any = { campaignId: { $in: campaignIds } }
    if (status && status !== "all") {
      query.status = status
    }
    if (campaignId) {
      query.campaignId = campaignId
    }

    const applications = await Application.find(query)
      .populate("influencerId", "name email profilePicture")
      .populate("campaignId", "title budget")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    const total = await Application.countDocuments(query)

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
