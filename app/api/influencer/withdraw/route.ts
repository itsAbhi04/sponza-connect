import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Transaction from "@/lib/models/transaction"
import Wallet from "@/lib/models/wallet"

export async function POST(request: NextRequest) {
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

    const { amount, methodId } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    if (!methodId) {
      return NextResponse.json({ error: "Payment method required" }, { status: 400 })
    }

    // Get user's wallet
    const wallet = await Wallet.findOne({ userId: decoded.userId })
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
    }

    if (wallet.balance < amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Create withdrawal transaction
    const transaction = new Transaction({
      userId: decoded.userId,
      type: "withdrawal",
      amount: amount,
      status: "pending",
      description: `Withdrawal to payment method ${methodId}`,
      metadata: {
        methodId,
        withdrawalFee: amount * 0.02, // 2% withdrawal fee
      },
    })

    await transaction.save()

    // Update wallet balance
    wallet.balance -= amount
    await wallet.save()

    return NextResponse.json(
      {
        message: "Withdrawal request submitted successfully",
        transaction,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing withdrawal:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
