import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Campaign from "@/lib/models/campaign"
import Application from "@/lib/models/application"
import Content from "@/lib/models/content"
import { z } from "zod"

const updateCampaignSchema = z.object({
  title: z.string().min(1).max(200).optional(),
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
  deliverables: z
    .array(
      z.object({
        type: z.enum(["Post", "Story", "Reel", "Video", "Blog", "Review"]),
        description: z.string().max(500),
        quantity: z.number().min(1),
        platform: z.enum(["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook", "Blog"]),
      }),
    )
    .optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const campaign = await Campaign.findOne({
      _id: params.id,
      brandId: decoded.userId,
    }).lean()

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Get applications for this campaign
    const applications = await Application.find({ campaignId: params.id })
      .populate("influencerId", "name email profilePicture")
      .sort({ createdAt: -1 })
      .lean()

    // Get content submissions
    const content = await Content.find({ campaignId: params.id })
      .populate("influencerId", "name email profilePicture")
      .sort({ createdAt: -1 })
      .lean()

    // Calculate campaign metrics
    const metrics = {
      totalApplications: applications.length,
      acceptedApplications: applications.filter((app) => app.status === "accepted").length,
      pendingApplications: applications.filter((app) => app.status === "applied").length,
      contentSubmitted: content.filter((c) => c.status === "submitted").length,
      contentApproved: content.filter((c) => c.status === "approved").length,
      totalViews: content.reduce((sum, c) => sum + (c.metrics?.views || 0), 0),
      totalEngagements: content.reduce(
        (sum, c) => sum + (c.metrics?.likes || 0) + (c.metrics?.comments || 0) + (c.metrics?.shares || 0),
        0,
      ),
    }

    return NextResponse.json({
      campaign: {
        ...campaign,
        metrics,
      },
      applications,
      content,
    })
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const body = await request.json()
    const validatedData = updateCampaignSchema.parse(body)

    const campaign = await Campaign.findOneAndUpdate({ _id: params.id, brandId: decoded.userId }, validatedData, {
      new: true,
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({ campaign })
  } catch (error) {
    console.error("Update campaign error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const campaign = await Campaign.findOne({
      _id: params.id,
      brandId: decoded.userId,
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Check if campaign has accepted applications
    const acceptedApplications = await Application.countDocuments({
      campaignId: params.id,
      status: "accepted",
    })

    if (acceptedApplications > 0) {
      return NextResponse.json({ error: "Cannot delete campaign with accepted applications" }, { status: 400 })
    }

    await Campaign.findByIdAndDelete(params.id)

    return NextResponse.json({ message: "Campaign deleted successfully" })
  } catch (error) {
    console.error("Delete campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
