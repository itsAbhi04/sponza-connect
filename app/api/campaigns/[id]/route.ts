import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const updateCampaignSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(2000).optional(),
  targetPlatforms: z.array(z.enum(["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"])).optional(),
  budget: z.number().min(0).optional(),
  status: z.enum(["draft", "published", "in-progress", "completed", "archived"]).optional(),
})

// GET /api/campaigns/[id] - Get single campaign
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const campaign = await Campaign.findById(params.id).populate("brandId", "name email")

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({ campaign })
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
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateCampaignSchema.parse(body)

    const campaign = await Campaign.findOneAndUpdate({ _id: params.id, brandId: decoded.userId }, validatedData, {
      new: true,
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found or unauthorized" }, { status: 404 })
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

// DELETE /api/campaigns/[id] - Delete campaign
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const campaign = await Campaign.findOneAndDelete({ _id: params.id, brandId: decoded.userId })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json({ message: "Campaign deleted successfully" })
  } catch (error) {
    console.error("Delete campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
