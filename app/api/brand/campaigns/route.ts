import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Campaign from "@/lib/models/campaign"
import { z } from "zod"

const createCampaignSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  category: z.string(),
  targetPlatforms: z.array(z.string()),
  budget: z.number().min(0),
  timeline: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
  deliverables: z.array(
    z.object({
      type: z.string(),
      quantity: z.number().min(1),
      budget: z.number().min(0),
      description: z.string().optional(),
    }),
  ),
  targetAudience: z
    .object({
      ageRange: z
        .object({
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
      gender: z.string().optional(),
      location: z.array(z.string()).optional(),
      interests: z.array(z.string()).optional(),
    })
    .optional(),
  requirements: z
    .object({
      minFollowers: z.number().optional(),
      minEngagementRate: z.number().optional(),
      contentGuidelines: z.string().optional(),
      hashtags: z.array(z.string()).optional(),
    })
    .optional(),
})

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

    const query: any = { brandId: decoded.userId }
    if (status && status !== "all") {
      query.status = status
    }

    const campaigns = await Campaign.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("brandId", "name email")

    const total = await Campaign.countDocuments(query)

    return NextResponse.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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
    const validatedData = createCampaignSchema.parse(body)

    const campaign = new Campaign({
      ...validatedData,
      brandId: decoded.userId,
      timeline: {
        startDate: new Date(validatedData.timeline.startDate),
        endDate: new Date(validatedData.timeline.endDate),
      },
      status: "draft",
    })

    await campaign.save()

    return NextResponse.json(
      {
        message: "Campaign created successfully",
        campaign,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create campaign error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
