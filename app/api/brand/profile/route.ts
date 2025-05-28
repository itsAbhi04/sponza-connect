import { type NextRequest, NextResponse } from "next/server"
import { BrandProfile } from "@/lib/models/brand-profile"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const brandProfileSchema = z.object({
  companyName: z.string().min(1).max(200),
  website: z.string().url().optional(),
  industry: z.enum([
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
  contactInfo: z
    .object({
      phone: z.string().optional(),
      address: z.string().max(500).optional(),
      contactEmail: z.string().email().optional(),
    })
    .optional(),
})

// GET /api/brand/profile - Get brand profile
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

    const profile = await BrandProfile.findOne({ userId: decoded.userId }).populate(
      "userId",
      "name email profilePicture",
    )

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    console.error("Get brand profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/brand/profile - Create brand profile
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

    // Check if profile already exists
    const existingProfile = await BrandProfile.findOne({ userId: decoded.userId })
    if (existingProfile) {
      return NextResponse.json({ error: "Profile already exists" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = brandProfileSchema.parse(body)

    const profile = new BrandProfile({
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
    console.error("Create brand profile error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/brand/profile - Update brand profile
export async function PUT(request: NextRequest) {
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
    const validatedData = brandProfileSchema.partial().parse(body)

    const profile = await BrandProfile.findOneAndUpdate({ userId: decoded.userId }, validatedData, { new: true })

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    console.error("Update brand profile error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
