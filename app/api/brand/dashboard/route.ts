import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Campaign } from "@/lib/models/campaign"
import { Application } from "@/lib/models/application"
import { Transaction } from "@/lib/models/transaction"
import { Wallet } from "@/lib/models/wallet"
import { BrandProfile } from "@/lib/models/brand-profile"
import { InfluencerProfile } from "@/lib/models/influencer-profile"

// GET /api/brand/dashboard - Get brand dashboard data
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

    // Get brand profile
    const profile = await BrandProfile.findOne({ userId: decoded.userId })

    // Get campaigns
    const campaigns = await Campaign.find({ brandId: decoded.userId }).sort({ createdAt: -1 }).limit(10)

    // Get applications for brand's campaigns
    const campaignIds = campaigns.map((c) => c._id)
    const applications = await Application.find({ campaignId: { $in: campaignIds } })
      .populate("influencerId", "name email profilePicture")
      .populate("campaignId", "title")
      .sort({ createdAt: -1 })
      .limit(10)

    // Get wallet
    const wallet = await Wallet.findOne({ userId: decoded.userId })

    // Get recent transactions
    const recentTransactions = await Transaction.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(5)

    // Calculate stats
    const totalCampaigns = campaigns.length
    const activeCampaigns = campaigns.filter((c) => c.status === "published").length
    const completedCampaigns = campaigns.filter((c) => c.status === "completed").length
    const draftCampaigns = campaigns.filter((c) => c.status === "draft").length

    const totalApplications = applications.length
    const pendingApplications = applications.filter((app) => app.status === "applied").length
    const acceptedApplications = applications.filter((app) => app.status === "accepted").length

    const totalSpent = recentTransactions
      .filter((t) => t.type === "campaign_payment" && t.status === "completed")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const thisMonthSpent = recentTransactions
      .filter(
        (t) =>
          t.type === "campaign_payment" &&
          t.status === "completed" &&
          new Date(t.createdAt).getMonth() === new Date().getMonth(),
      )
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    // Calculate total reach (estimated)
    const totalReach = campaigns.reduce((sum, campaign) => {
      return sum + (campaign.estimatedReach || 0)
    }, 0)

    // Get recommended influencers
    const recommendedInfluencers = await InfluencerProfile.find({
      availabilityStatus: "available",
      averageRating: { $gte: 4.0 },
    })
      .populate("userId", "name email profilePicture")
      .sort({ averageRating: -1, totalReviews: -1 })
      .limit(6)

    // Calculate campaign performance
    const avgCampaignBudget =
      campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.budget, 0) / campaigns.length : 0

    const dashboardData = {
      stats: {
        totalCampaigns,
        activeCampaigns,
        completedCampaigns,
        draftCampaigns,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        totalSpent,
        thisMonthSpent,
        currentBalance: wallet?.balance || 0,
        totalReach,
        avgCampaignBudget: Number(avgCampaignBudget.toFixed(0)),
        successRate: totalCampaigns > 0 ? Number(((completedCampaigns / totalCampaigns) * 100).toFixed(1)) : 0,
      },
      recentCampaigns: campaigns.slice(0, 5),
      recentApplications: applications.slice(0, 5),
      recentTransactions,
      recommendedInfluencers,
      profile: {
        isComplete: !!(profile?.companyName && profile?.industry),
        companyName: profile?.companyName || "",
        industry: profile?.industry || "",
        website: profile?.website || "",
      },
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Get brand dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
