import { type NextRequest, NextResponse } from "next/server"
import { Wallet } from "@/lib/models/wallet"
import { Transaction } from "@/lib/models/transaction"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET /api/wallet - Get user's wallet
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

    let wallet = await Wallet.findOne({ userId: decoded.userId })

    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = new Wallet({
        userId: decoded.userId,
        balance: 0,
        transactions: [],
      })
      await wallet.save()
    }

    // Get transactions
    const transactions = await Transaction.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(50)

    return NextResponse.json(
      {
        wallet: {
          ...wallet.toObject(),
          transactions,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get wallet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
