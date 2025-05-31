import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Invitation from "@/lib/models/invitation"
import Notification from "@/lib/models/notification"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "influencer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    const query: any = { influencerId: decoded.userId }
    if (status) query.status = status

    const invitations = await Invitation.find(query)
      .populate("brandId", "name email profilePicture")
      .populate("campaignId", "title budget description timeline")
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

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "influencer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { invitationId, status, response } = await request.json()

    if (!["accepted", "declined"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const invitation = await Invitation.findOne({
      _id: invitationId,
      influencerId: decoded.userId,
      status: "pending",
    })

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 })
    }

    // Check if invitation has expired
    if (new Date() > invitation.expiresAt) {
      await Invitation.findByIdAndUpdate(invitationId, { status: "expired" })
      return NextResponse.json({ error: "Invitation has expired" }, { status: 400 })
    }

    // Update invitation
    const updatedInvitation = await Invitation.findByIdAndUpdate(
      invitationId,
      {
        status,
        respondedAt: new Date(),
        response: response || {},
      },
      { new: true },
    ).populate("brandId", "name")

    // Create notification for brand
    await Notification.create({
      userId: invitation.brandId,
      type: "invitation_response",
      title: `Invitation ${status}`,
      message: `${decoded.name} has ${status} your campaign invitation`,
      data: {
        invitationId,
        influencerId: decoded.userId,
        status,
      },
      isRead: false,
    })

    return NextResponse.json({
      message: `Invitation ${status} successfully`,
      invitation: updatedInvitation,
    })
  } catch (error) {
    console.error("Update invitation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
