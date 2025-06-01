import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Campaign from "@/lib/models/campaign"
import Application from "@/lib/models/application"
import { z } from "zod"

const createCampaignSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  targetPlatforms: z.array(z.enum(["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"])),
  budget: z.number().min(0),
  deliverables: z.array(
    z.object({
      type: z.enum(["Post", "Story", "Reel", "Video", "Blog", "Review"]),
      description: z.string().max(500),
      quantity: z.number().min(1),
      platform: z.enum(["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook", "Blog"]),
    }),
  ),
  timeline: z.object({
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)),
  }),
  requirements: z.array(z.string()).optional(),
  targetAudience: z
    .object({
      ageRange: z.enum(["18-24", "25-34", "35-44", "45-54", "55+", "All Ages"]).optional(),
      gender: z.enum(["Male", "Female", "All", "Non-binary"]).optional(),
      location: z.array(z.string()).optional(),
      interests: z.array(z.string()).optional(),
    })
    .optional(),
  category: z.enum([
    "Fashion",
    "Beauty",
    "Technology",
    "Lifestyle",
    "Food & Beverage",
    "Travel",
    "Fitness",
    "Gaming",
    "Education",
    "Finance",
    "Healthcare",
    "Automotive",
    "Real Estate",
    "Entertainment",
    "Other",
  ]),
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
    const search = searchParams.get("search")

    const query: any = { brandId: decoded.userId }

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const campaigns = await Campaign.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    // Get application counts for each campaign
    const campaignIds = campaigns.map((c) => c._id)
    const applicationCounts = await Application.aggregate([
      { $match: { campaignId: { $in: campaignIds } } },
      { $group: { _id: "$campaignId", count: { $sum: 1 } } },
    ])

    const applicationCountMap = applicationCounts.reduce((acc, item) => {
      acc[item._id.toString()] = item.count
      return acc
    }, {})

    const campaignsWithCounts = campaigns.map((campaign) => ({
      ...campaign,
      applicationCount: applicationCountMap[campaign._id.toString()] || 0,
    }))

    const total = await Campaign.countDocuments(query)

    return NextResponse.json({
      campaigns: campaignsWithCounts,
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
