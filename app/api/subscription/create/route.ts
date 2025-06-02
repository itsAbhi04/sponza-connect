import { type NextRequest, NextResponse } from "next/server"
import { Subscription } from "@/lib/models/subscription"
import { User } from "@/lib/models/user"
import { Transaction } from "@/lib/models/transaction"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { createRazorpaySubscription, SUBSCRIPTION_PLANS } from "@/lib/razorpay"
import { z } from "zod"

const createSubscriptionSchema = z.object({
  planType: z.enum(["premium_monthly", "premium_annual"]),
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
    const validatedData = createSubscriptionSchema.parse(body)

    // Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({
      userId: decoded.userId,
      status: "active",
    })

    if (existingSubscription && existingSubscription.planType !== "free") {
      return NextResponse.json({ error: "You already have an active subscription" }, { status: 400 })
    }

    // Get user details for Razorpay
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create Razorpay subscription
    const plan = SUBSCRIPTION_PLANS[validatedData.planType]
    const razorpaySubscription = await createRazorpaySubscription({
      plan_id: plan.id,
      customer_name: user.name,
      customer_email: user.email,
      customer_contact: user.phone || "",
      total_count: validatedData.planType === "premium_annual" ? 1 : 12, // Annual is one payment, monthly is 12
    })

    // Update or create subscription record
    let subscription
    if (existingSubscription) {
      subscription = await Subscription.findOneAndUpdate(
        { userId: decoded.userId },
        {
          planType: validatedData.planType,
          razorpaySubscriptionId: razorpaySubscription.id,
          status: "pending", // Will be activated after payment
          billingCycle: validatedData.planType === "premium_annual" ? "annual" : "monthly",
        },
        { new: true },
      )
    } else {
      subscription = new Subscription({
        userId: decoded.userId,
        planType: validatedData.planType,
        razorpaySubscriptionId: razorpaySubscription.id,
        status: "pending",
        billingCycle: validatedData.planType === "premium_annual" ? "annual" : "monthly",
      })
      await subscription.save()
    }

    // Create transaction record
    const transaction = new Transaction({
      userId: decoded.userId,
      type: "subscription",
      amount: -(plan.amount / 100), // Convert from paise to rupees
      status: "pending",
      razorpayDetails: {
        subscriptionId: razorpaySubscription.id,
      },
      description: `Subscription payment for ${plan.name}`,
    })
    await transaction.save()

    return NextResponse.json(
      {
        message: "Subscription created successfully",
        subscription,
        razorpaySubscription,
        transaction: transaction._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create subscription error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
