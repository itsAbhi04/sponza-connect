import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Wallet from "@/lib/models/wallet"
import Payment from "@/lib/models/payment"
import Transaction from "@/lib/models/transaction"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Get or create wallet
    let wallet = await Wallet.findOne({ userId: decoded.userId })
    if (!wallet) {
      wallet = new Wallet({
        userId: decoded.userId,
        balance: 0,
        currency: "INR",
      })
      await wallet.save()
    }

    // Get recent transactions
    const transactions = await Transaction.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    // Get payment statistics
    const paymentStats = await Payment.aggregate([
      { $match: { userId: decoded.userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ])

    // Calculate monthly spending
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const monthlySpending = await Payment.aggregate([
      {
        $match: {
          userId: decoded.userId,
          status: "completed",
          createdAt: { $gte: currentMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" },
        },
      },
    ])

    const totalTransactions = await Transaction.countDocuments({ userId: decoded.userId })

    return NextResponse.json({
      wallet,
      transactions,
      paymentStats,
      monthlySpending: monthlySpending[0]?.totalSpent || 0,
      pagination: {
        page,
        limit,
        total: totalTransactions,
        pages: Math.ceil(totalTransactions / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching wallet data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
