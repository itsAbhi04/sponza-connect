import { type NextRequest, NextResponse } from "next/server"
import { User } from "@/lib/models/user"
import { Campaign } from "@/lib/models/campaign"
import { Application } from "@/lib/models/application"
import { Transaction } from "@/lib/models/transaction"
import { Subscription } from "@/lib/models/subscription"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET /api/admin/analytics - Get platform analytics
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // User statistics
    const totalUsers = await User.countDocuments()
    const totalInfluencers = await User.countDocuments({ role: "influencer" })
    const totalBrands = await User.countDocuments({ role: "brand" })
    const verifiedUsers = await User.countDocuments({ verificationStatus: "verified" })

    // Campaign statistics
    const totalCampaigns = await Campaign.countDocuments()
    const activeCampaigns = await Campaign.countDocuments({ status: "published" })
    const completedCampaigns = await Campaign.countDocuments({ status: "completed" })

    // Application statistics
    const totalApplications = await Application.countDocuments()
    const acceptedApplications = await Application.countDocuments({ status: "accepted" })

    // Revenue statistics
    const totalRevenue = await Transaction.aggregate([
      { $match: { type: "campaign_payment", status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    // Subscription statistics
    const activeSubscriptions = await Subscription.countDocuments({ status: "active", planType: { $ne: "free" } })

    // Growth data (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const newUsersLast30Days = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } })
    const newCampaignsLast30Days = await Campaign.countDocuments({ createdAt: { $gte: thirtyDaysAgo } })

    return NextResponse.json({
      users: {
        total: totalUsers,
        influencers: totalInfluencers,
        brands: totalBrands,
        verified: verifiedUsers,
        newLast30Days: newUsersLast30Days,
      },
      campaigns: {
        total: totalCampaigns,
        active: activeCampaigns,
        completed: completedCampaigns,
        newLast30Days: newCampaignsLast30Days,
      },
      applications: {
        total: totalApplications,
        accepted: acceptedApplications,
        acceptanceRate: totalApplications > 0 ? (acceptedApplications / totalApplications) * 100 : 0,
      },
      revenue: {
        total: totalRevenue[0]?.total || 0,
        activeSubscriptions,
      },
    })
  } catch (error) {
    console.error("Get analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
