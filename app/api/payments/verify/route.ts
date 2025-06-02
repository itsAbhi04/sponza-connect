import { type NextRequest, NextResponse } from "next/server"
import { Transaction } from "@/lib/models/transaction"
import { Wallet } from "@/lib/models/wallet"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { verifyPayment } from "@/lib/razorpay"
import { z } from "zod"

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
})

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verifyPaymentSchema.parse(body)

    // Verify payment signature
    const isValid = await verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Find transaction
    const transaction = await Transaction.findOne({
      "razorpayDetails.orderId": razorpay_order_id,
    })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    // Update transaction
    transaction.status = "completed"
    transaction.razorpayDetails.paymentId = razorpay_payment_id
    transaction.razorpayDetails.signature = razorpay_signature
    await transaction.save()

    // Update wallet balance for wallet top-ups
    if (transaction.type === "wallet_topup") {
      let wallet = await Wallet.findOne({ userId: transaction.userId })
      if (!wallet) {
        wallet = new Wallet({
          userId: transaction.userId,
          balance: 0,
          transactions: [],
        })
      }

      wallet.balance += transaction.amount
      wallet.transactions.push(transaction._id)
      await wallet.save()
    }

    // Create notification
    const notification = new Notification({
      userId: transaction.userId,
      message: `Payment of ₹${transaction.amount} completed successfully`,
      type: "payment",
      readStatus: false,
    })
    await notification.save()

    return NextResponse.json({
      message: "Payment verified successfully",
      transaction,
    })
  } catch (error) {
    console.error("Verify payment error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
