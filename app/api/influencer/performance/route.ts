import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Application } from "@/lib/models/application"
import { Transaction } from "@/lib/models/transaction"
import { Wallet } from "@/lib/models/wallet"
import { InfluencerProfile } from "@/lib/models/influencer-profile"

// GET /api/influencer/performance - Get detailed performance metrics
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

    // Get influencer profile
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })

    // Get all applications
    const applications = await Application.find({ influencerId: decoded.userId })
      .populate("campaignId")
      .sort({ createdAt: -1 })

    // Get wallet and transactions
    const wallet = await Wallet.findOne({ userId: decoded.userId })
    const transactions = await Transaction.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(20)

    // Calculate performance metrics
    const totalApplications = applications.length
    const acceptedApplications = applications.filter((app) => app.status === "accepted").length
    const rejectedApplications = applications.filter((app) => app.status === "rejected").length
    const pendingApplications = applications.filter((app) => app.status === "applied").length
    const completedApplications = applications.filter((app) => app.status === "completed").length

    // Calculate earnings
    const totalEarnings = transactions
      .filter((t) => t.type === "campaign_payment" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)

    const pendingEarnings = transactions
      .filter((t) => t.type === "campaign_payment" && t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate this month's earnings
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const thisMonthEarnings = transactions
      .filter((t) => {
        const transactionDate = new Date(t.createdAt)
        return (
          t.type === "campaign_payment" &&
          t.status === "completed" &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        )
      })
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate last month's earnings for comparison
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const lastMonthEarnings = transactions
      .filter((t) => {
        const transactionDate = new Date(t.createdAt)
        return (
          t.type === "campaign_payment" &&
          t.status === "completed" &&
          transactionDate.getMonth() === lastMonth &&
          transactionDate.getFullYear() === lastMonthYear
        )
      })
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate engagement metrics
    const totalFollowers = profile?.socialMediaStats?.reduce((sum, stat) => sum + stat.followers, 0) || 0
    const avgEngagement =
      profile?.socialMediaStats?.length > 0
        ? profile.socialMediaStats.reduce((sum, stat) => sum + stat.engagementRate, 0) / profile.socialMediaStats.length
        : 0

    // Calculate success rate
    const successRate = totalApplications > 0 ? (acceptedApplications / totalApplications) * 100 : 0

    // Get active campaigns
    const activeCampaigns = applications
      .filter((app) => app.status === "accepted")
      .map((app) => app.campaignId)
      .filter((campaign) => campaign && new Date(campaign.timeline.endDate) > new Date())

    const performanceData = {
      snapshot: {
        totalEarnings,
        thisMonthEarnings,
        lastMonthEarnings,
        earningsChange: lastMonthEarnings > 0 ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100 : 0,
        pendingEarnings,
        currentBalance: wallet?.balance || 0,
        activeCampaigns: activeCampaigns.length,
        totalFollowers,
        avgEngagement: Number(avgEngagement.toFixed(1)),
        profileRating: profile?.averageRating || 0,
        totalReviews: profile?.totalReviews || 0,
      },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
        completed: completedApplications,
        successRate: Number(successRate.toFixed(1)),
      },
      socialMedia: profile?.socialMediaStats || [],
      recentTransactions: transactions.slice(0, 10),
      activeCampaignsList: activeCampaigns.slice(0, 5),
    }

    return NextResponse.json(performanceData)
  } catch (error) {
    console.error("Get influencer performance error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
