import { type NextRequest, NextResponse } from "next/server"
import { Subscription } from "@/lib/models/subscription"
import { Transaction } from "@/lib/models/transaction"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { verifyPayment } from "@/lib/razorpay"
import { z } from "zod"

const verifyPaymentSchema = z.object({
  razorpay_payment_id: z.string(),
  razorpay_subscription_id: z.string(),
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
    const validatedData = verifyPaymentSchema.parse(body)

    // Verify payment signature
    const isValid = verifyPayment(
      validatedData.razorpay_subscription_id,
      validatedData.razorpay_payment_id,
      validatedData.razorpay_signature,
    )

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Find subscription
    const subscription = await Subscription.findOne({
      razorpaySubscriptionId: validatedData.razorpay_subscription_id,
      userId: decoded.userId,
    })

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Update subscription status
    subscription.status = "active"

    // Set subscription dates
    const now = new Date()
    subscription.startDate = now

    // Set end date based on billing cycle
    if (subscription.billingCycle === "monthly") {
      const endDate = new Date(now)
      endDate.setMonth(endDate.getMonth() + 1)
      subscription.endDate = endDate
    } else {
      const endDate = new Date(now)
      endDate.setFullYear(endDate.getFullYear() + 1)
      subscription.endDate = endDate
    }

    await subscription.save()

    // Update transaction
    const transaction = await Transaction.findOneAndUpdate(
      {
        userId: decoded.userId,
        type: "subscription",
        status: "pending",
        "razorpayDetails.subscriptionId": validatedData.razorpay_subscription_id,
      },
      {
        status: "completed",
        "razorpayDetails.paymentId": validatedData.razorpay_payment_id,
        "razorpayDetails.signature": validatedData.razorpay_signature,
      },
      { new: true },
    )

    if (!transaction) {
      console.warn("Transaction not found for subscription payment")
    }

    return NextResponse.json({
      message: "Subscription payment verified successfully",
      subscription,
    })
  } catch (error) {
    console.error("Verify subscription payment error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
