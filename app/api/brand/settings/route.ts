import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import User from "@/lib/models/user"
import BrandProfile from "@/lib/models/brand-profile"
import { z } from "zod"

const updateSettingsSchema = z.object({
  notifications: z
    .object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      sms: z.boolean().optional(),
      applicationUpdates: z.boolean().optional(),
      campaignUpdates: z.boolean().optional(),
      paymentUpdates: z.boolean().optional(),
      marketingEmails: z.boolean().optional(),
    })
    .optional(),
  privacy: z
    .object({
      profileVisibility: z.enum(["public", "private"]).optional(),
      showEmail: z.boolean().optional(),
      showPhone: z.boolean().optional(),
    })
    .optional(),
  preferences: z
    .object({
      language: z.string().optional(),
      timezone: z.string().optional(),
      currency: z.string().optional(),
      autoApproveContent: z.boolean().optional(),
      requireNDA: z.boolean().optional(),
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

    const user = await User.findById(decoded.userId).select("-password")
    const profile = await BrandProfile.findOne({ userId: decoded.userId })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const settings = {
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      profile: profile || {},
      notifications: user.settings?.notifications || {
        email: true,
        push: true,
        sms: false,
        applicationUpdates: true,
        campaignUpdates: true,
        paymentUpdates: true,
        marketingEmails: false,
      },
      privacy: user.settings?.privacy || {
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
      },
      preferences: user.settings?.preferences || {
        language: "en",
        timezone: "Asia/Kolkata",
        currency: "INR",
        autoApproveContent: false,
        requireNDA: false,
      },
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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
    const validatedData = updateSettingsSchema.parse(body)

    const updateData: any = {}
    if (validatedData.notifications) {
      updateData["settings.notifications"] = validatedData.notifications
    }
    if (validatedData.privacy) {
      updateData["settings.privacy"] = validatedData.privacy
    }
    if (validatedData.preferences) {
      updateData["settings.preferences"] = validatedData.preferences
    }

    const user = await User.findByIdAndUpdate(decoded.userId, { $set: updateData }, { new: true }).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Settings updated successfully",
      settings: user.settings,
    })
  } catch (error) {
    console.error("Update settings error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
