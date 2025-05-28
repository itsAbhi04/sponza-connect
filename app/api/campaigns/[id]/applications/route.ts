import { type NextRequest, NextResponse } from "next/server"
import { Application } from "@/lib/models/application"
import { Campaign } from "@/lib/models/campaign"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const applySchema = z.object({
  proposal: z.string().min(1).max(1000),
  pricing: z.number().min(0),
})

// GET /api/campaigns/[id]/applications - Get applications for a campaign
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Verify campaign ownership
    const campaign = await Campaign.findById(params.id)
    if (!campaign || campaign.brandId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    const applications = await Application.find({ campaignId: params.id })
      .populate("influencerId", "name email profilePicture")
      .sort({ createdAt: -1 })

    return NextResponse.json({ applications }, { status: 200 })
  } catch (error) {
    console.error("Get campaign applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/campaigns/[id]/applications - Apply to campaign
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const body = await request.json()
    const validatedData = applySchema.parse(body)

    // Check if campaign exists and is published
    const campaign = await Campaign.findById(params.id)
    if (!campaign || campaign.status !== "published") {
      return NextResponse.json({ error: "Campaign not found or not available" }, { status: 404 })
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      influencerId: decoded.userId,
      campaignId: params.id,
    })

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied to this campaign" }, { status: 400 })
    }

    const application = new Application({
      influencerId: decoded.userId,
      campaignId: params.id,
      proposal: validatedData.proposal,
      pricing: validatedData.pricing,
      status: "applied",
    })

    await application.save()

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Apply to campaign error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
