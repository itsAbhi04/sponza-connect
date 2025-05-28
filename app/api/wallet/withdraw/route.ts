import { type NextRequest, NextResponse } from "next/server"
import { Wallet } from "@/lib/models/wallet"
import { Transaction } from "@/lib/models/transaction"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const withdrawSchema = z.object({
  amount: z.number().min(100),
  bankDetails: z.object({
    accountNumber: z.string().min(1),
    ifscCode: z.string().min(1),
    accountHolderName: z.string().min(1),
  }),
})

// POST /api/wallet/withdraw - Request withdrawal
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const validatedData = withdrawSchema.parse(body)

    // Check wallet balance
    const wallet = await Wallet.findOne({ userId: decoded.userId })
    if (!wallet || wallet.balance < validatedData.amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Create withdrawal transaction
    const transaction = new Transaction({
      userId: decoded.userId,
      type: "withdrawal",
      amount: -validatedData.amount,
      status: "pending",
      description: `Withdrawal request for ₹${validatedData.amount}`,
      razorpayDetails: {},
    })

    await transaction.save()

    // Update wallet balance
    wallet.balance -= validatedData.amount
    wallet.transactions.push(transaction._id as any)
    await wallet.save()

    // In a real implementation, you would process the payout via Razorpay
    // For now, we'll mark it as pending for admin approval

    return NextResponse.json(
      {
        message: "Withdrawal request submitted successfully",
        transaction,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Withdrawal error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
