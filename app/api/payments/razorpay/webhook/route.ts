import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { Transaction } from "@/lib/models/transaction"
import { Subscription } from "@/lib/models/subscription"
import { Wallet } from "@/lib/models/wallet"
import { connectDB } from "@/lib/db"

// POST /api/payments/razorpay/webhook - Handle Razorpay webhooks
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex")

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    switch (event.event) {
      case "payment.captured":
        await handlePaymentCaptured(event.payload.payment.entity)
        break

      case "subscription.activated":
        await handleSubscriptionActivated(event.payload.subscription.entity)
        break

      case "subscription.cancelled":
        await handleSubscriptionCancelled(event.payload.subscription.entity)
        break

      case "payout.processed":
        await handlePayoutProcessed(event.payload.payout.entity)
        break

      default:
        console.log("Unhandled webhook event:", event.event)
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handlePaymentCaptured(payment: any) {
  const transaction = await Transaction.findOne({ "razorpayDetails.orderId": payment.order_id })

  if (transaction) {
    transaction.status = "completed"
    transaction.razorpayDetails.paymentId = payment.id
    await transaction.save()

    // Update wallet if it's a campaign payment
    if (transaction.type === "campaign_payment") {
      const wallet = await Wallet.findOne({ userId: transaction.userId })
      if (wallet) {
        wallet.balance += transaction.amount
        await wallet.save()
      }
    }
  }
}

async function handleSubscriptionActivated(subscription: any) {
  const userSubscription = await Subscription.findOne({ razorpaySubscriptionId: subscription.id })

  if (userSubscription) {
    userSubscription.status = "active"
    userSubscription.startDate = new Date()
    await userSubscription.save()
  }
}

async function handleSubscriptionCancelled(subscription: any) {
  const userSubscription = await Subscription.findOne({ razorpaySubscriptionId: subscription.id })

  if (userSubscription) {
    userSubscription.status = "cancelled"
    userSubscription.endDate = new Date()
    await userSubscription.save()
  }
}

async function handlePayoutProcessed(payout: any) {
  const transaction = await Transaction.findOne({ "razorpayDetails.payoutId": payout.id })

  if (transaction) {
    transaction.status = "completed"
    await transaction.save()
  }
}
