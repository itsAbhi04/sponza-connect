import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { User } from "@/lib/models/user"
import { InfluencerProfile } from "@/lib/models/influencer-profile"

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

    const user = await User.findById(decoded.userId).select("-password")
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })

    return NextResponse.json({
      user: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        profilePicture: user?.profilePicture,
        role: user?.role,
        createdAt: user?.createdAt,
      },
      profile,
      settings: {
        twoFactorEnabled: false,
        emailVerified: true,
        phoneVerified: false,
      },
    })
  } catch (error) {
    console.error("Get influencer settings error:", error)
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
    if (!decoded || decoded.role !== "influencer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { profile, security } = await request.json()

    if (profile) {
      await User.findByIdAndUpdate(decoded.userId, {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      })

      await InfluencerProfile.findOneAndUpdate(
        { userId: decoded.userId },
        {
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          billingInfo: profile.billingInfo,
        },
        { upsert: true },
      )
    }

    // TODO: Implement security updates (password change, 2FA)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update influencer settings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
