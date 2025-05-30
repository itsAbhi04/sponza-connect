import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Affiliate } from "@/lib/models/affiliate"
import { User } from "@/lib/models/user"
import { Transaction } from "@/lib/models/transaction"

// GET /api/influencer/referrals - Get referral data
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

    // Get or create affiliate record
    let affiliate = await Affiliate.findOne({ userId: decoded.userId })
    if (!affiliate) {
      affiliate = new Affiliate({
        userId: decoded.userId,
        referrerId: decoded.userId, // Set to self for initial creation
        referralCode: generateReferralCode(),
        rewardAmount: 500, // Default reward amount in INR
        totalReferrals: 0,
        totalEarnings: 0,
        status: "pending", // Start with pending status
      })
      await affiliate.save()
    }

    // Get referred users
    const referredUsers = await User.find({ referredBy: affiliate.referralCode })
      .select("name email createdAt")
      .sort({ createdAt: -1 })

    // Get referral transactions
    const referralTransactions = await Transaction.find({
      userId: decoded.userId,
      type: "referral_reward",
    }).sort({ createdAt: -1 })

    // Calculate metrics
    const totalReferrals = referredUsers.length
    const totalEarnings = referralTransactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)

    const pendingEarnings = referralTransactions
      .filter((t) => t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate this month's referrals
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const thisMonthReferrals = referredUsers.filter((user) => {
      const userDate = new Date(user.createdAt)
      return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear
    }).length

    const referralData = {
      referralCode: affiliate.referralCode,
      totalReferrals,
      thisMonthReferrals,
      totalEarnings,
      pendingEarnings,
      recentReferrals: referredUsers.slice(0, 10),
      recentTransactions: referralTransactions.slice(0, 10),
      tips: generateReferralTips(totalReferrals, thisMonthReferrals),
    }

    return NextResponse.json(referralData)
  } catch (error) {
    console.error("Get referrals error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/influencer/referrals - Generate new referral code
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

    const affiliate = await Affiliate.findOne({ userId: decoded.userId })
    if (!affiliate) {
      return NextResponse.json({ error: "Affiliate record not found" }, { status: 404 })
    }

    // Generate new referral code
    affiliate.referralCode = generateReferralCode()
    await affiliate.save()

    return NextResponse.json({ referralCode: affiliate.referralCode })
  } catch (error) {
    console.error("Generate referral code error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function generateReferralTips(totalReferrals: number, thisMonthReferrals: number): string[] {
  const tips: string[] = []

  if (totalReferrals === 0) {
    tips.push("Share your referral code on social media to get started")
    tips.push("Tell friends about Sponza's benefits for influencers")
  } else if (totalReferrals < 5) {
    tips.push("Create content about your Sponza experience")
    tips.push("Share success stories from your campaigns")
  } else if (totalReferrals < 20) {
    tips.push("Host a live session about influencer marketing")
    tips.push("Create tutorial content about using Sponza")
  } else {
    tips.push("Consider becoming a Sponza ambassador")
    tips.push("Mentor new influencers in your network")
  }

  if (thisMonthReferrals === 0) {
    tips.push("Post about Sponza in your Instagram Stories")
    tips.push("Share your referral link in your bio")
  }

  return tips
}
