import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { User } from "@/lib/models/user"
import { BrandProfile } from "@/lib/models/brand-profile"
import { InfluencerProfile } from "@/lib/models/influencer-profile"

// GET /api/auth/me - Get current user profile
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
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let profile = null
    if (user.role === "brand") {
      profile = await BrandProfile.findOne({ userId: user._id })
    } else if (user.role === "influencer") {
      profile = await InfluencerProfile.findOne({ userId: user._id })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      },
      profile,
    })
  } catch (error) {
    console.error("Get user profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
