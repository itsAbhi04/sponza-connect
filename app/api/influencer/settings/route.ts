import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { User } from "@/lib/models/user"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { z } from "zod"

const settingsSchema = z.object({
  profile: z
    .object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      bio: z.string().max(500).optional(),
      location: z.string().optional(),
      website: z.string().url().optional(),
      profilePicture: z.string().url().optional(),
    })
    .optional(),
  security: z
    .object({
      currentPassword: z.string().optional(),
      newPassword: z.string().min(8).optional(),
      twoFactorEnabled: z.boolean().optional(),
    })
    .optional(),
  billing: z
    .object({
      taxId: z.string().optional(),
      businessName: z.string().optional(),
      billingAddress: z
        .object({
          street: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zipCode: z.string().optional(),
          country: z.string().optional(),
        })
        .optional(),
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

    const user = await User.findById(decoded.userId).select("-password")
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })

    return NextResponse.json({
      user,
      profile,
      settings: {
        twoFactorEnabled: user?.twoFactorEnabled || false,
        emailVerified: user?.emailVerified || false,
        phoneVerified: user?.phoneVerified || false,
      },
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
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
    const validatedData = settingsSchema.parse(body)

    // Update user profile
    if (validatedData.profile) {
      await User.findByIdAndUpdate(decoded.userId, {
        $set: validatedData.profile,
      })
    }

    // Update security settings
    if (validatedData.security) {
      const updateData: any = {}

      if (validatedData.security.twoFactorEnabled !== undefined) {
        updateData.twoFactorEnabled = validatedData.security.twoFactorEnabled
      }

      if (validatedData.security.newPassword && validatedData.security.currentPassword) {
        // Verify current password and hash new password
        const user = await User.findById(decoded.userId)
        if (user && (await user.comparePassword(validatedData.security.currentPassword))) {
          updateData.password = validatedData.security.newPassword
        } else {
          return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
        }
      }

      if (Object.keys(updateData).length > 0) {
        await User.findByIdAndUpdate(decoded.userId, { $set: updateData })
      }
    }

    // Update billing information
    if (validatedData.billing) {
      await InfluencerProfile.findOneAndUpdate(
        { userId: decoded.userId },
        { $set: { billingInfo: validatedData.billing } },
        { upsert: true },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating settings:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
