import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import {User} from "@/lib/models/user"
import {Campaign} from "@/lib/models/campaign"
import {Application} from "@/lib/models/application"
import {Transaction} from "@/lib/models/transaction"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // const token = request.headers.get("authorization")?.replace("Bearer ", "")
    // console.log("Token received:", token);
    
    // if (!token) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }
    // console.log("Token exists, verifying...");
    

    // const decoded = verifyToken(token)
    // if (!decoded || decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }
    // console.log("Token verified, user is admin:", decoded);

    // Get current date ranges
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // User statistics
    const totalUsers = await User.countDocuments()
    const totalInfluencers = await User.countDocuments({ role: "influencer" })
    const totalBrands = await User.countDocuments({ role: "brand" })
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth },
    })
    const newUsersLastMonth = await User.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    })

    // Campaign statistics
    const totalCampaigns = await Campaign.countDocuments()
    const activeCampaigns = await Campaign.countDocuments({ status: "published" })
    const completedCampaigns = await Campaign.countDocuments({ status: "completed" })
    const pendingCampaigns = await Campaign.countDocuments({ status: "pending" })

    // Application statistics
    const totalApplications = await Application.countDocuments()
    const pendingApplications = await Application.countDocuments({ status: "applied" })
    const acceptedApplications = await Application.countDocuments({ status: "accepted" })

    // Revenue statistics
    const totalRevenue = await Transaction.aggregate([
      { $match: { type: "platform_fee", status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    const thisMonthRevenue = await Transaction.aggregate([
      {
        $match: {
          type: "platform_fee",
          status: "completed",
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    const lastMonthRevenue = await Transaction.aggregate([
      {
        $match: {
          type: "platform_fee",
          status: "completed",
          createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    // Calculate growth percentages
    const userGrowth = newUsersLastMonth > 0 ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100 : 0

    const revenueGrowth =
      lastMonthRevenue[0]?.total > 0
        ? (((thisMonthRevenue[0]?.total || 0) - lastMonthRevenue[0].total) / lastMonthRevenue[0].total) * 100
        : 0

    // Recent activities
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10).select("name email role createdAt")

    const recentCampaigns = await Campaign.find()
      .populate("brandId", "name")
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status budget createdAt brandId")

    const recentApplications = await Application.find()
      .populate("influencerId", "name")
      .populate("campaignId", "title")
      .sort({ createdAt: -1 })
      .limit(10)
      .select("status createdAt influencerId campaignId")

    // Platform insights
    const topPerformingInfluencers = await Application.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$influencerId", completedCampaigns: { $sum: 1 } } },
      { $sort: { completedCampaigns: -1 } },
      { $limit: 5 },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { name: "$user.name", completedCampaigns: 1 } },
    ])

    const topSpendingBrands = await Campaign.aggregate([
      { $group: { _id: "$brandId", totalSpent: { $sum: "$budget" } } },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { name: "$user.name", totalSpent: 1 } },
    ])

    return NextResponse.json({
      stats: {
        users: {
          total: totalUsers,
          influencers: totalInfluencers,
          brands: totalBrands,
          newThisMonth: newUsersThisMonth,
          growth: userGrowth,
        },
        campaigns: {
          total: totalCampaigns,
          active: activeCampaigns,
          completed: completedCampaigns,
          pending: pendingCampaigns,
        },
        applications: {
          total: totalApplications,
          pending: pendingApplications,
          accepted: acceptedApplications,
          successRate: totalApplications > 0 ? (acceptedApplications / totalApplications) * 100 : 0,
        },
        revenue: {
          total: totalRevenue[0]?.total || 0,
          thisMonth: thisMonthRevenue[0]?.total || 0,
          growth: revenueGrowth,
        },
      },
      recentActivity: {
        users: recentUsers,
        campaigns: recentCampaigns,
        applications: recentApplications,
      },
      insights: {
        topInfluencers: topPerformingInfluencers,
        topBrands: topSpendingBrands,
      },
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
