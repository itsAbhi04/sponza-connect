import { type NextRequest, NextResponse } from "next/server"
import { Subscription } from "@/lib/models/subscription"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { createRazorpaySubscription } from "@/lib/razorpay"
import { z } from "zod"

const createSubscriptionSchema = z.object({
  planType: z.enum(["premium_monthly", "premium_annual"]),
})

// GET /api/subscription - Get user's subscription
export async function GET(request: NextRequest) {
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

    const subscription = await Subscription.findOne({ userId: decoded.userId })

    return NextResponse.json({ subscription }, { status: 200 })
  } catch (error) {
    console.error("Get subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/subscription - Create subscription
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

    // Create Razorpay subscription
    const razorpaySubscription = await createRazorpaySubscription(validatedData.planType, decoded.userId)

    // Update or create subscription record
    let subscription
    if (existingSubscription) {
      subscription = await Subscription.findOneAndUpdate(
        { userId: decoded.userId },
        {
          planType: validatedData.planType,
          razorpaySubscriptionId: razorpaySubscription.id,
          status: "inactive", // Will be activated after payment
          billingCycle: validatedData.planType === "premium_annual" ? "annual" : "monthly",
        },
        { new: true },
      )
    } else {
      subscription = new Subscription({
        userId: decoded.userId,
        planType: validatedData.planType,
        razorpaySubscriptionId: razorpaySubscription.id,
        status: "inactive",
        billingCycle: validatedData.planType === "premium_annual" ? "annual" : "monthly",
      })
      await subscription.save()
    }

    return NextResponse.json(
      {
        message: "Subscription created successfully",
        subscription,
        razorpaySubscription,
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
