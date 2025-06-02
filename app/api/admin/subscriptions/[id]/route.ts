import { type NextRequest, NextResponse } from "next/server"
import { Subscription } from "@/lib/models/subscription"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const updateSubscriptionSchema = z.object({
  status: z.enum(["active", "pending", "cancelled", "expired"]).optional(),
  planType: z.enum(["free", "premium_monthly", "premium_annual"]).optional(),
  endDate: z.string().optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const subscription = await Subscription.findById(params.id).populate("userId", "name email role")

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Get subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    const validatedData = updateSubscriptionSchema.parse(body)

    const subscription = await Subscription.findById(params.id)

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Update subscription fields
    if (validatedData.status) subscription.status = validatedData.status
    if (validatedData.planType) subscription.planType = validatedData.planType
    if (validatedData.endDate) subscription.endDate = new Date(validatedData.endDate)

    await subscription.save()

    return NextResponse.json({
      message: "Subscription updated successfully",
      subscription,
    })
  } catch (error) {
    console.error("Update subscription error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
