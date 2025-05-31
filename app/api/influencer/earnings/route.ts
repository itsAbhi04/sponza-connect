import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import {Transaction} from "@/lib/models/transaction"
import {Application} from "@/lib/models/application"
import {Wallet} from "@/lib/models/wallet"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "30d"

    // Calculate date range
    const now = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case "7d":
        startDate.setDate(now.getDate() - 7)
        break
      case "30d":
        startDate.setDate(now.getDate() - 30)
        break
      case "90d":
        startDate.setDate(now.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get wallet information
    const wallet = await Wallet.findOne({ userId: decoded.userId })

    // Get transactions
    const transactions = await Transaction.find({
      userId: decoded.userId,
      createdAt: { $gte: startDate },
    })
      .sort({ createdAt: -1 })
      .limit(50)

    // Get completed applications for earnings calculation
    const completedApplications = await Application.find({
      influencerId: decoded.userId,
      status: "completed",
      createdAt: { $gte: startDate },
    }).populate("campaignId")

    // Calculate earnings metrics
    const totalEarnings = transactions
      .filter((t) => t.type === "campaign_payment" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)

    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const thisMonthEarnings = transactions
      .filter((t) => t.type === "campaign_payment" && t.status === "completed" && t.createdAt >= thisMonthStart)
      .reduce((sum, t) => sum + t.amount, 0)

    const pendingEarnings = transactions
      .filter((t) => t.type === "campaign_payment" && t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate earnings change
    const lastPeriodStart = new Date(startDate)
    lastPeriodStart.setDate(lastPeriodStart.getDate() - (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    const lastPeriodEarnings = await Transaction.find({
      userId: decoded.userId,
      type: "campaign_payment",
      status: "completed",
      createdAt: { $gte: lastPeriodStart, $lt: startDate },
    }).then((txns) => txns.reduce((sum, t) => sum + t.amount, 0))

    const earningsChange =
      lastPeriodEarnings > 0 ? ((totalEarnings - lastPeriodEarnings) / lastPeriodEarnings) * 100 : 0

    // Earnings history by campaign
    const earningsHistory = completedApplications
      .map((app) => ({
        _id: app._id,
        title: app.campaignId?.title,
        platform: app.campaignId?.targetPlatforms?.[0],
        earnings: app.finalPayment || app.pricing,
        completedAt: app.updatedAt,
      }))
      .sort((a, b) => b.earnings - a.earnings)

    // Withdrawal methods (mock data - would come from user profile)
    const withdrawalMethods = [
      {
        _id: "1",
        type: "bank",
        name: "Primary Bank Account",
        accountNumber: "1234567890",
        isDefault: true,
      },
      {
        _id: "2",
        type: "upi",
        name: "UPI ID",
        upiId: "user@paytm",
        isDefault: false,
      },
    ]

    // Tax information
    const currentYear = now.getFullYear()
    const yearStart = new Date(currentYear, 3, 1) // Financial year starts April 1st in India
    const yearlyTransactions = await Transaction.find({
      userId: decoded.userId,
      type: "campaign_payment",
      status: "completed",
      createdAt: { $gte: yearStart },
    })

    const totalTaxableIncome = yearlyTransactions.reduce((sum, t) => sum + t.amount, 0)
    const tdsDeducted = totalTaxableIncome * 0.1 // Assuming 10% TDS

    return NextResponse.json({
      overview: {
        totalEarnings,
        thisMonthEarnings,
        pendingEarnings,
        availableBalance: wallet?.balance || 0,
        earningsChange,
        completedCampaigns: completedApplications.length,
      },
      transactions,
      withdrawalMethods,
      earningsHistory,
      taxInfo: {
        totalTaxableIncome,
        tdsDeducted,
      },
    })
  } catch (error) {
    console.error("Error fetching earnings data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
