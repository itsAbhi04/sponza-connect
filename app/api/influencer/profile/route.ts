import { type NextRequest, NextResponse } from "next/server"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const socialMediaStatSchema = z.object({
  platform: z.enum(["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"]),
  followers: z.number().min(0),
  engagementRate: z.number().min(0).max(100),
  username: z.string().min(1),
})

const pricingStructureSchema = z.object({
  service: z.string().min(1),
  price: z.number().min(0),
  description: z.string().optional(),
})

const influencerProfileSchema = z.object({
  bio: z.string().min(1).max(500),
  location: z.string().min(1),
  niche: z.array(
    z.enum([
      "Fashion",
      "Beauty",
      "Technology",
      "Lifestyle",
      "Food",
      "Travel",
      "Fitness",
      "Gaming",
      "Education",
      "Business",
    ]),
  ),
  socialMediaStats: z.array(socialMediaStatSchema),
  pricingStructure: z.array(pricingStructureSchema),
  availabilityStatus: z.enum(["available", "busy", "unavailable"]).optional(),
  portfolio: z.array(z.string().url()).optional(),
})

// GET /api/influencer/profile - Get influencer profile
export async function GET(request: NextRequest) {
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

    const profile = await InfluencerProfile.findOne({ userId: decoded.userId }).populate(
      "userId",
      "name email profilePicture",
    )

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    console.error("Get influencer profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/influencer/profile - Create influencer profile
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

    // Check if profile already exists
    const existingProfile = await InfluencerProfile.findOne({ userId: decoded.userId })
    if (existingProfile) {
      return NextResponse.json({ error: "Profile already exists" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = influencerProfileSchema.parse(body)

    const profile = new InfluencerProfile({
      ...validatedData,
      userId: decoded.userId,
    })

    await profile.save()

    return NextResponse.json(
      {
        message: "Profile created successfully",
        profile,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create influencer profile error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/influencer/profile - Update influencer profile
export async function PUT(request: NextRequest) {
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
    const validatedData = influencerProfileSchema.partial().parse(body)

    const profile = await InfluencerProfile.findOneAndUpdate({ userId: decoded.userId }, validatedData, { new: true })

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    console.error("Update influencer profile error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
