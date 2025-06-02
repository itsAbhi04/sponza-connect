import { type NextRequest, NextResponse } from "next/server"
import { Subscription } from "@/lib/models/subscription"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cancelRazorpaySubscription } from "@/lib/razorpay"

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

    // Find active subscription
    const subscription = await Subscription.findOne({
      userId: decoded.userId,
      status: "active",
    })

    if (!subscription) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 })
    }

    if (subscription.razorpaySubscriptionId) {
      // Cancel subscription in Razorpay
      await cancelRazorpaySubscription(subscription.razorpaySubscriptionId)
    }

    // Update subscription status
    subscription.status = "cancelled"
    await subscription.save()

    // Create a free subscription that will activate when the current one expires
    const freeSubscription = new Subscription({
      userId: decoded.userId,
      planType: "free",
      status: "pending",
      startDate: subscription.endDate || new Date(),
    })
    await freeSubscription.save()

    return NextResponse.json({
      message: "Subscription cancelled successfully",
      subscription,
    })
  } catch (error) {
    console.error("Cancel subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
