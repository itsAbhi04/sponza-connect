import { type NextRequest, NextResponse } from "next/server"
import { Transaction } from "@/lib/models/transaction"
import { Wallet } from "@/lib/models/wallet"
import { Subscription } from "@/lib/models/subscription"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { validateWebhookSignature } from "@/lib/razorpay"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature || !validateWebhookSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)
    const { event: eventType, payload } = event

    switch (eventType) {
      case "payment.captured":
        await handlePaymentCaptured(payload.payment.entity)
        break
      case "payment.failed":
        await handlePaymentFailed(payload.payment.entity)
        break
      case "subscription.charged":
        await handleSubscriptionCharged(payload.subscription.entity, payload.payment.entity)
        break
      case "subscription.cancelled":
        await handleSubscriptionCancelled(payload.subscription.entity)
        break
      default:
        console.log(`Unhandled webhook event: ${eventType}`)
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handlePaymentCaptured(payment: any) {
  const transaction = await Transaction.findOne({
    "razorpayDetails.orderId": payment.order_id,
  })

  if (transaction) {
    transaction.status = "completed"
    transaction.razorpayDetails.paymentId = payment.id
    await transaction.save()

    // Update wallet balance
    const wallet = await Wallet.findOne({ userId: transaction.userId })
    if (wallet && transaction.type === "campaign_payment") {
      wallet.balance += transaction.amount
      wallet.transactions.push(transaction._id)
      await wallet.save()
    }

    // Send notification
    const notification = new Notification({
      userId: transaction.userId,
      message: `Payment of ₹${transaction.amount} has been processed successfully`,
      type: "payment",
    })
    await notification.save()
  }
}

async function handlePaymentFailed(payment: any) {
  const transaction = await Transaction.findOne({
    "razorpayDetails.orderId": payment.order_id,
  })

  if (transaction) {
    transaction.status = "failed"
    transaction.razorpayDetails.paymentId = payment.id
    await transaction.save()

    // Send notification
    const notification = new Notification({
      userId: transaction.userId,
      message: `Payment of ₹${transaction.amount} failed. Please try again.`,
      type: "payment",
    })
    await notification.save()
  }
}

async function handleSubscriptionCharged(subscription: any, payment: any) {
  const userSubscription = await Subscription.findOne({
    razorpaySubscriptionId: subscription.id,
  })

  if (userSubscription) {
    // Create transaction record
    const transaction = new Transaction({
      userId: userSubscription.userId,
      type: "subscription",
      amount: payment.amount / 100, // Convert from paise to rupees
      status: "completed",
      razorpayDetails: {
        subscriptionId: subscription.id,
        paymentId: payment.id,
      },
      description: `Subscription renewal - ${userSubscription.planType}`,
    })
    await transaction.save()

    // Update subscription end date
    const currentEndDate = userSubscription.endDate || new Date()
    const newEndDate = new Date(currentEndDate)

    if (userSubscription.billingCycle === "monthly") {
      newEndDate.setMonth(newEndDate.getMonth() + 1)
    } else {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1)
    }

    userSubscription.endDate = newEndDate
    userSubscription.status = "active"
    await userSubscription.save()

    // Send notification
    const notification = new Notification({
      userId: userSubscription.userId,
      message: `Your ${userSubscription.planType} subscription has been renewed successfully`,
      type: "payment",
    })
    await notification.save()
  }
}

async function handleSubscriptionCancelled(subscription: any) {
  const userSubscription = await Subscription.findOne({
    razorpaySubscriptionId: subscription.id,
  })

  if (userSubscription) {
    userSubscription.status = "cancelled"
    await userSubscription.save()

    // Send notification
    const notification = new Notification({
      userId: userSubscription.userId,
      message: "Your subscription has been cancelled",
      type: "payment",
    })
    await notification.save()
  }
}
