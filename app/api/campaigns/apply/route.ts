import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Application } from "@/lib/models/application"
import { Campaign } from "@/lib/models/campaign"
import { z } from "zod"

const applySchema = z.object({
  campaignId: z.string(),
  pricing: z.number().min(0),
  message: z.string().min(10).max(1000),
  deliverables: z.array(
    z.object({
      type: z.string(),
      description: z.string(),
      timeline: z.string(),
    }),
  ),
})

// POST /api/campaigns/apply - Apply to a campaign
export async function POST(request: NextRequest) {
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

    // Check if campaign exists and is active
    const campaign = await Campaign.findById(validatedData.campaignId)
    if (!campaign || campaign.status !== "published") {
      return NextResponse.json({ error: "Campaign not found or not active" }, { status: 404 })
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      campaignId: validatedData.campaignId,
      influencerId: decoded.userId,
    })

    if (existingApplication) {
      return NextResponse.json({ error: "Already applied to this campaign" }, { status: 400 })
    }

    // Create application
    const application = new Application({
      campaignId: validatedData.campaignId,
      influencerId: decoded.userId,
      pricing: validatedData.pricing,
      message: validatedData.message,
      deliverables: validatedData.deliverables,
      status: "applied",
    })

    await application.save()

    return NextResponse.json({
      message: "Application submitted successfully",
      application,
    })
  } catch (error) {
    console.error("Apply to campaign error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
