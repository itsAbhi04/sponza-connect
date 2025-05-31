import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import User from "@/lib/models/user"
import Notification from "@/lib/models/notification"
import Invitation from "@/lib/models/invitation"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { influencerIds, campaignId, message, customTerms } = await request.json()

    if (!influencerIds || !Array.isArray(influencerIds) || influencerIds.length === 0) {
      return NextResponse.json({ error: "Influencer IDs are required" }, { status: 400 })
    }

    const invitations = []
    const notifications = []

    for (const influencerId of influencerIds) {
      // Check if influencer exists
      const influencer = await User.findById(influencerId)
      if (!influencer || influencer.role !== "influencer") {
        continue
      }

      // Create invitation record
      const invitation = {
        influencerId,
        brandId: decoded.userId,
        campaignId,
        message,
        customTerms,
        status: "pending",
        sentAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
      invitations.push(invitation)

      // Create notification
      const notification = new Notification({
        userId: influencerId,
        type: "campaign_invitation",
        title: "New Campaign Invitation",
        message: `You've been invited to participate in a campaign${campaignId ? ` for ${campaignId}` : ""}`,
        data: {
          brandId: decoded.userId,
          campaignId,
          invitationId: invitation._id,
        },
        isRead: false,
      })
      notifications.push(notification)
    }

    // Save notifications
    await Notification.insertMany(notifications)

    return NextResponse.json({
      message: "Invitations sent successfully",
      invitationsSent: invitations.length,
      invitations,
    })
  } catch (error) {
    console.error("Invite error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    const query: any = { brandId: decoded.userId }
    if (status) query.status = status

    const invitations = await Invitation.find(query)
      .populate("influencerId", "name email profilePicture")
      .populate("campaignId", "title budget")
      .sort({ sentAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    const total = await Invitation.countDocuments(query)

    return NextResponse.json({
      invitations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get invitations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
