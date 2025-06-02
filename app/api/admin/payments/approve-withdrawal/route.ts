import { type NextRequest, NextResponse } from "next/server"
import { Transaction } from "@/lib/models/transaction"
import { Notification } from "@/lib/models/notification"
import { AdminLog } from "@/lib/models/admin-log"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { createPayout } from "@/lib/razorpay"
import { z } from "zod"

const approveWithdrawalSchema = z.object({
  transactionId: z.string(),
  bankDetails: z.object({
    accountNumber: z.string(),
    ifscCode: z.string(),
    accountHolderName: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { transactionId, bankDetails } = approveWithdrawalSchema.parse(body)

    const transaction = await Transaction.findById(transactionId).populate("userId")
    if (!transaction || transaction.type !== "withdrawal") {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    if (transaction.status !== "pending") {
      return NextResponse.json({ error: "Transaction already processed" }, { status: 400 })
    }

    try {
      // Create payout via Razorpay X
      const payout = await createPayout(
        Math.abs(transaction.amount),
        bankDetails.accountNumber,
        bankDetails.ifscCode,
        "salary",
      )

      // Update transaction with payout details
      transaction.status = "completed"
      transaction.razorpayDetails.payoutId = payout.id
      await transaction.save()

      // Create notification
      const notification = new Notification({
        userId: transaction.userId,
        message: `Your withdrawal of ₹${Math.abs(transaction.amount)} has been processed successfully`,
        type: "payment",
        readStatus: false,
      })
      await notification.save()

      // Log admin action
      const adminLog = new AdminLog({
        adminId: decoded.userId,
        action: `Approved withdrawal of ₹${Math.abs(transaction.amount)} for user ${transaction.userId.email}`,
        affectedEntities: [transaction._id],
        metadata: { payoutId: payout.id },
      })
      await adminLog.save()

      return NextResponse.json({
        message: "Withdrawal approved and processed successfully",
        payoutId: payout.id,
      })
    } catch (payoutError) {
      console.error("Payout creation failed:", payoutError)

      // Mark transaction as failed
      transaction.status = "failed"
      await transaction.save()

      return NextResponse.json({ error: "Failed to process payout" }, { status: 500 })
    }
  } catch (error) {
    console.error("Approve withdrawal error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
