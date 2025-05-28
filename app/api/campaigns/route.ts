import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const createCampaignSchema = z.object({
  title: z.string().min(1).max(100),
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
})

// GET /api/campaigns - List campaigns with filters
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const platform = searchParams.get("platform")
    const budget = searchParams.get("budget")
    const niche = searchParams.get("niche")
    const status = searchParams.get("status") || "published"

    const filter: any = { status }

    if (platform) {
      filter.targetPlatforms = { $in: [platform] }
    }

    if (budget) {
      const [min, max] = budget.split("-").map(Number)
      filter.budget = { $gte: min, ...(max && { $lte: max }) }
    }

    const campaigns = await Campaign.find(filter).populate("brandId", "name email").sort({ createdAt: -1 }).limit(20)

    return NextResponse.json({ campaigns }, { status: 200 })
  } catch (error) {
    console.error("Get campaigns error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/campaigns - Create new campaign
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
