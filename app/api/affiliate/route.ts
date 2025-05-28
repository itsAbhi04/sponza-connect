import { type NextRequest, NextResponse } from "next/server"
import { Affiliate } from "@/lib/models/affiliate"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET /api/affiliate - Get user's affiliate status
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const affiliate = await Affiliate.findOne({ referrerId: decoded.userId }).populate(
      "invitees",
      "name email createdAt",
    )

    if (!affiliate) {
      return NextResponse.json({ error: "Affiliate record not found" }, { status: 404 })
    }

    // Calculate total rewards earned
    const totalRewards = affiliate.invitees.length * affiliate.rewardAmount

    return NextResponse.json(
      {
        affiliate: {
          ...affiliate.toObject(),
          totalRewards,
          totalInvitees: affiliate.invitees.length,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get affiliate error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
