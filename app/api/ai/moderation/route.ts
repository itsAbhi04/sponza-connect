import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// POST /api/ai/moderation - Moderate content using AI
export async function POST(request: NextRequest) {
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

    const { contentType, contentId, content } = await request.json()

    if (!contentType || !contentId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate AI moderation (in real implementation, this would call an AI service)
    const moderationResult = await moderateContent(content)

    // Update content based on moderation result
    if (contentType === "campaign") {
      await Campaign.findByIdAndUpdate(contentId, {
        moderationStatus: moderationResult.approved ? "approved" : "flagged",
        moderationScore: moderationResult.score,
        moderationFlags: moderationResult.flags,
      })
    } else if (contentType === "profile") {
      await InfluencerProfile.findByIdAndUpdate(contentId, {
        moderationStatus: moderationResult.approved ? "approved" : "flagged",
        moderationScore: moderationResult.score,
        moderationFlags: moderationResult.flags,
      })
    }

    return NextResponse.json({
      approved: moderationResult.approved,
      score: moderationResult.score,
      flags: moderationResult.flags,
      confidence: moderationResult.confidence,
    })
  } catch (error) {
    console.error("AI moderation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function moderateContent(content: string) {
  // Simplified AI moderation logic
  // In production, this would integrate with services like OpenAI Moderation API

  const flags: string[] = []
  let score = 100 // Start with perfect score

  // Check for inappropriate content
  const inappropriateWords = ["spam", "fake", "scam", "illegal", "adult", "violence"]
  const lowerContent = content.toLowerCase()

  inappropriateWords.forEach((word) => {
    if (lowerContent.includes(word)) {
      flags.push(`Contains inappropriate content: ${word}`)
      score -= 20
    }
  })

  // Check for excessive capitalization
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
  if (capsRatio > 0.3) {
    flags.push("Excessive capitalization")
    score -= 10
  }

  // Check for excessive punctuation
  const punctuationRatio = (content.match(/[!?]{2,}/g) || []).length
  if (punctuationRatio > 2) {
    flags.push("Excessive punctuation")
    score -= 5
  }

  // Check content length
  if (content.length < 10) {
    flags.push("Content too short")
    score -= 15
  }

  const approved = score >= 70 && flags.length === 0
  const confidence = Math.min(100, Math.max(0, score)) / 100

  return {
    approved,
    score,
    flags,
    confidence,
  }
}

// GET /api/ai/moderation/queue - Get moderation queue
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
    const status = searchParams.get("status") || "pending"
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // Get flagged campaigns
    const flaggedCampaigns = await Campaign.find({
      $or: [{ moderationStatus: "flagged" }, { moderationStatus: { $exists: false } }],
    })
      .populate("brandId", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)

    // Get flagged profiles
    const flaggedProfiles = await InfluencerProfile.find({
      $or: [{ moderationStatus: "flagged" }, { moderationStatus: { $exists: false } }],
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)

    return NextResponse.json({
      campaigns: flaggedCampaigns,
      profiles: flaggedProfiles,
      total: flaggedCampaigns.length + flaggedProfiles.length,
    })
  } catch (error) {
    console.error("Get moderation queue error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
