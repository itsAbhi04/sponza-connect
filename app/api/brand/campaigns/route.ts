import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Campaign } from "@/lib/models/campaign"
import { Subscription } from "@/lib/models/subscription"
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

    const token = request.cookies.get("auth-token")?.value
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

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createCampaignSchema.parse(body)

    // Check subscription status and campaign limits
    const activeSubscription = await Subscription.findOne({
      userId: decoded.userId,
      status: "active",
    })

    if (!activeSubscription) {
      return NextResponse.json(
        {
          error: "No active subscription found. Please subscribe to create campaigns.",
          code: "NO_SUBSCRIPTION",
        },
        { status: 403 },
      )
    }

    // Check campaign limits based on subscription type
    const activeCampaignsCount = await Campaign.countDocuments({
      brandId: decoded.userId,
      status: { $in: ["draft", "published", "in-progress"] },
    })

    if (activeSubscription.planType === "free" && activeCampaignsCount >= 3) {
      return NextResponse.json(
        {
          error: "Free plan allows maximum 3 active campaigns. Please upgrade your subscription.",
          code: "CAMPAIGN_LIMIT_REACHED",
        },
        { status: 403 },
      )
    }

    // Check budget limits based on subscription
    const minBudget = 1000 // ₹1,000
    const maxBudget =
      activeSubscription.planType === "free"
        ? 50000
        : activeSubscription.planType === "premium_monthly"
          ? 500000
          : 2000000 // ₹50K, ₹5L, or ₹20L

    if (validatedData.budget < minBudget || validatedData.budget > maxBudget) {
      return NextResponse.json(
        {
          error: `Campaign budget must be between ₹${minBudget} and ₹${maxBudget} for your subscription plan.`,
          code: "BUDGET_LIMIT",
        },
        { status: 400 },
      )
    }

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
