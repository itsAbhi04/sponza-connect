import { type NextRequest, NextResponse } from "next/server"
import { Wallet } from "@/lib/models/wallet"
import { Transaction } from "@/lib/models/transaction"
import { Application } from "@/lib/models/application"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

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

    // Get or create wallet
    let wallet = await Wallet.findOne({ userId: decoded.userId })
    if (!wallet) {
      wallet = new Wallet({
        userId: decoded.userId,
        balance: 0,
        transactions: [],
      })
      await wallet.save()
    }

    // Get recent transactions
    const transactions = await Transaction.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(20)

    // Get earnings statistics
    const totalEarnings = await Transaction.aggregate([
      {
        $match: {
          userId: decoded.userId,
          type: "campaign_payment",
          status: "completed",
          amount: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ])

    const pendingEarnings = await Application.aggregate([
      {
        $match: {
          influencerId: decoded.userId,
          status: "completed",
          paymentStatus: "pending",
        },
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign",
        },
      },
      {
        $unwind: "$campaign",
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$agreedAmount" },
        },
      },
    ])

    const activeCampaigns = await Application.countDocuments({
      influencerId: decoded.userId,
      status: { $in: ["accepted", "in-progress"] },
    })

    return NextResponse.json({
      balance: wallet.balance,
      totalEarnings: totalEarnings[0]?.total || 0,
      pendingEarnings: pendingEarnings[0]?.total || 0,
      activeCampaigns,
      transactions,
    })
  } catch (error) {
    console.error("Get influencer wallet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
