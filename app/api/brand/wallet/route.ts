import { type NextRequest, NextResponse } from "next/server"
import { Wallet } from "@/lib/models/wallet"
import { Transaction } from "@/lib/models/transaction"
import { Campaign } from "@/lib/models/campaign"
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
    if (!decoded || decoded.role !== "brand") {
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

    // Get campaign statistics
    const activeCampaigns = await Campaign.countDocuments({
      brandId: decoded.userId,
      status: { $in: ["published", "in-progress"] },
    })

    const totalSpent = await Transaction.aggregate([
      {
        $match: {
          userId: decoded.userId,
          type: "campaign_payment",
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $abs: "$amount" } },
        },
      },
    ])

    const pendingPayments = await Transaction.aggregate([
      {
        $match: {
          userId: decoded.userId,
          type: "campaign_payment",
          status: "pending",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $abs: "$amount" } },
        },
      },
    ])

    return NextResponse.json({
      balance: wallet.balance,
      totalSpent: totalSpent[0]?.total || 0,
      activeCampaigns,
      pendingPayments: pendingPayments[0]?.total || 0,
      transactions,
    })
  } catch (error) {
    console.error("Get brand wallet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
