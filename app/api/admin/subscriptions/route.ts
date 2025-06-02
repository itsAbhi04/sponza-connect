import { type NextRequest, NextResponse } from "next/server"
import { Subscription } from "@/lib/models/subscription"
import { User } from "@/lib/models/user"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const planType = searchParams.get("planType")
    const search = searchParams.get("search")

    // Build query
    const query: any = {}
    if (status) query.status = status
    if (planType) query.planType = planType

    // If search is provided, find users matching the search and include their subscriptions
    let userIds: string[] = []
    if (search) {
      const users = await User.find({
        $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
      }).select("_id")

      userIds = users.map((user) => user._id.toString())
      query.userId = { $in: userIds }
    }

    // Get subscriptions with pagination
    const subscriptions = await Subscription.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId", "name email role")

    // Get total count for pagination
    const total = await Subscription.countDocuments(query)

    // Get subscription stats
    const stats = await Subscription.aggregate([
      {
        $group: {
          _id: "$planType",
          count: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },
        },
      },
    ])

    return NextResponse.json({
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: stats.reduce((acc, stat) => {
        acc[stat._id] = {
          total: stat.count,
          active: stat.active,
        }
        return acc
      }, {}),
    })
  } catch (error) {
    console.error("Get subscriptions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
