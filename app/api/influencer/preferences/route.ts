import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Preferences from "@/lib/models/preferences"
import { z } from "zod"

const preferencesSchema = z.object({
  notifications: z
    .object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      sms: z.boolean().optional(),
      campaignUpdates: z.boolean().optional(),
      newMessages: z.boolean().optional(),
      applicationStatus: z.boolean().optional(),
      paymentAlerts: z.boolean().optional(),
      marketingEmails: z.boolean().optional(),
    })
    .optional(),
  privacy: z
    .object({
      profileVisibility: z.enum(["public", "private", "brands-only"]).optional(),
      showEarnings: z.boolean().optional(),
      showAnalytics: z.boolean().optional(),
      allowDirectMessages: z.boolean().optional(),
      allowCampaignInvitations: z.boolean().optional(),
    })
    .optional(),
  communication: z
    .object({
      preferredLanguage: z.string().optional(),
      timezone: z.string().optional(),
      availableHours: z
        .object({
          start: z.string().optional(),
          end: z.string().optional(),
        })
        .optional(),
      autoReply: z
        .object({
          enabled: z.boolean().optional(),
          message: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  content: z
    .object({
      preferredNiches: z.array(z.string()).optional(),
      excludedBrands: z.array(z.string()).optional(),
      minimumBudget: z.number().min(0).optional(),
      preferredCampaignTypes: z.array(z.string()).optional(),
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
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    let preferences = await Preferences.findOne({ userId: decoded.userId })

    // Create default preferences if none exist
    if (!preferences) {
      preferences = new Preferences({ userId: decoded.userId })
      await preferences.save()
    }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error("Error fetching preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = preferencesSchema.parse(body)

    const preferences = await Preferences.findOneAndUpdate(
      { userId: decoded.userId },
      { $set: validatedData },
      { new: true, upsert: true },
    )

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error("Error updating preferences:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
