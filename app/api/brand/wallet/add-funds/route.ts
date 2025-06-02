import { type NextRequest, NextResponse } from "next/server"
import { Transaction } from "@/lib/models/transaction"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { createOrder } from "@/lib/razorpay"
import { z } from "zod"

const addFundsSchema = z.object({
  amount: z.number().min(100).max(1000000),
})

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { amount } = addFundsSchema.parse(body)

    // Create Razorpay order
    const order = await createOrder(amount, "INR", `wallet_${decoded.userId}_${Date.now()}`)

    // Create transaction record
    const transaction = new Transaction({
      userId: decoded.userId,
      type: "wallet_topup",
      amount,
      status: "pending",
      razorpayDetails: {
        orderId: order.id,
      },
      description: `Wallet top-up of ₹${amount}`,
    })
    await transaction.save()

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      transactionId: transaction._id,
    })
  } catch (error) {
    console.error("Add funds error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
