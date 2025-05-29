import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { Application } from "@/lib/models/application"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const updateCampaignSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(2000).optional(),
  budget: z.number().min(0).optional(),
  status: z.enum(["draft", "published", "in-progress", "completed", "archived"]).optional(),
  timeline: z
    .object({
      startDate: z
        .string()
        .transform((str) => new Date(str))
        .optional(),
      endDate: z
        .string()
        .transform((str) => new Date(str))
        .optional(),
    })
    .optional(),
})

// GET /api/campaigns/[id] - Get campaign details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const campaign = await Campaign.findById(params.id).populate("brandId", "name email profilePicture")

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Get application count
    const applicationCount = await Application.countDocuments({ campaignId: params.id })

    return NextResponse.json({
      campaign: {
        ...campaign.toObject(),
        applicationCount,
      },
    })
  } catch (error) {
    console.error("Get campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/campaigns/[id] - Update campaign
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const body = await request.json()
    const validatedData = updateCampaignSchema.parse(body)

    const campaign = await Campaign.findById(params.id)
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Check if user owns the campaign or is admin
    if (campaign.brandId.toString() !== decoded.userId && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(params.id, validatedData, { new: true }).populate(
      "brandId",
      "name email",
    )

    return NextResponse.json({ campaign: updatedCampaign })
  } catch (error) {
    console.error("Update campaign error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/campaigns/[id] - Delete campaign
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const campaign = await Campaign.findById(params.id)
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Check if user owns the campaign or is admin
    if (campaign.brandId.toString() !== decoded.userId && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Check if campaign has applications
    const applicationCount = await Application.countDocuments({ campaignId: params.id })
    if (applicationCount > 0) {
      return NextResponse.json({ error: "Cannot delete campaign with applications" }, { status: 400 })
    }

    await Campaign.findByIdAndDelete(params.id)

    return NextResponse.json({ message: "Campaign deleted successfully" })
  } catch (error) {
    console.error("Delete campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
