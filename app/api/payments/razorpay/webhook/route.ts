import { type NextRequest, NextResponse } from "next/server"
import { Transaction } from "@/lib/models/transaction"
import { Wallet } from "@/lib/models/wallet"
import { Subscription } from "@/lib/models/subscription"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { validateWebhookSignature } from "@/lib/razorpay"
import { subscriptionConfirmationEmail, paymentConfirmationEmail } from "@/email/template"

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

    console.log(`Processing Razorpay webhook: ${eventType}`)

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
      case "subscription.activated":
        await handleSubscriptionActivated(payload.subscription.entity)
        break
      case "subscription.completed":
        await handleSubscriptionCompleted(payload.subscription.entity)
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
  }).populate("userId", "name email")

  if (transaction) {
    transaction.status = "completed"
    transaction.razorpayDetails.paymentId = payment.id
    await transaction.save()

    // Update wallet balance for wallet top-ups
    if (transaction.type === "wallet_topup") {
      const wallet = await Wallet.findOne({ userId: transaction.userId })
      if (wallet) {
        wallet.balance += Math.abs(transaction.amount)
        wallet.transactions.push(transaction._id)
        await wallet.save()

        // Send notification
        const notification = new Notification({
          userId: transaction.userId,
          message: `Payment of ₹${Math.abs(transaction.amount)} has been added to your wallet`,
          type: "payment",
        })
        await notification.save()

        // Send email confirmation
        if (transaction.userId.email) {
          await paymentConfirmationEmail(
            transaction.userId.name,
            transaction.userId.email,
            "Wallet Top-up",
            `₹${Math.abs(transaction.amount)}`,
          )
        }
      }
    }
  }
}

async function handlePaymentFailed(payment: any) {
  const transaction = await Transaction.findOne({
    "razorpayDetails.orderId": payment.order_id,
  }).populate("userId", "name email")

  if (transaction) {
    transaction.status = "failed"
    transaction.razorpayDetails.paymentId = payment.id
    await transaction.save()

    // Send notification
    const notification = new Notification({
      userId: transaction.userId._id,
      message: `Payment of ₹${Math.abs(transaction.amount)} failed. Please try again.`,
      type: "payment",
    })
    await notification.save()
  }
}

async function handleSubscriptionCharged(subscription: any, payment: any) {
  const userSubscription = await Subscription.findOne({
    razorpaySubscriptionId: subscription.id,
  }).populate("userId", "name email")

  if (userSubscription) {
    // Create transaction record
    const transaction = new Transaction({
      userId: userSubscription.userId._id,
      type: "subscription",
      amount: -payment.amount / 100, // Convert from paise to rupees
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
      userId: userSubscription.userId._id,
      message: `Your ${userSubscription.planType} subscription has been renewed successfully`,
      type: "payment",
    })
    await notification.save()

    // Send email confirmation
    if (userSubscription.userId.email) {
      await subscriptionConfirmationEmail(
        userSubscription.userId.name,
        userSubscription.userId.email,
        userSubscription.planType === "premium_monthly" ? "Premium Monthly" : "Premium Annual",
      )
    }
  }
}

async function handleSubscriptionCancelled(subscription: any) {
  const userSubscription = await Subscription.findOne({
    razorpaySubscriptionId: subscription.id,
  }).populate("userId", "name email")

  if (userSubscription) {
    userSubscription.status = "cancelled"
    await userSubscription.save()

    // Create a free subscription that will activate when the current one expires
    const freeSubscription = new Subscription({
      userId: userSubscription.userId._id,
      planType: "free",
      status: "pending",
      startDate: userSubscription.endDate || new Date(),
    })
    await freeSubscription.save()

    // Send notification
    const notification = new Notification({
      userId: userSubscription.userId._id,
      message:
        "Your subscription has been cancelled. You will be moved to the free plan when your current subscription expires.",
      type: "payment",
    })
    await notification.save()
  }
}

async function handleSubscriptionActivated(subscription: any) {
  const userSubscription = await Subscription.findOne({
    razorpaySubscriptionId: subscription.id,
  }).populate("userId", "name email")

  if (userSubscription) {
    userSubscription.status = "active"
    await userSubscription.save()

    // Send notification
    const notification = new Notification({
      userId: userSubscription.userId._id,
      message: `Your ${userSubscription.planType} subscription has been activated successfully`,
      type: "payment",
    })
    await notification.save()
  }
}

async function handleSubscriptionCompleted(subscription: any) {
  const userSubscription = await Subscription.findOne({
    razorpaySubscriptionId: subscription.id,
  }).populate("userId", "name email")

  if (userSubscription) {
    userSubscription.status = "expired"
    await userSubscription.save()

    // Create a free subscription
    const freeSubscription = new Subscription({
      userId: userSubscription.userId._id,
      planType: "free",
      status: "active",
      startDate: new Date(),
    })
    await freeSubscription.save()

    // Send notification
    const notification = new Notification({
      userId: userSubscription.userId._id,
      message: "Your subscription has expired. You've been moved to the free plan.",
      type: "payment",
    })
    await notification.save()
  }
}
