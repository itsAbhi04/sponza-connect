import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Application from "@/lib/models/application"
import Notification from "@/lib/models/notification"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reason } = await request.json()

    const application = await Application.findById(params.id).populate("campaignId").populate("influencerId")

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Verify the campaign belongs to the brand
    if (application.campaignId.brandId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    if (application.status !== "applied") {
      return NextResponse.json({ error: "Application cannot be rejected" }, { status: 400 })
    }

    // Update application status
    application.status = "rejected"
    application.rejectedAt = new Date()
    if (reason) application.brandMessage = reason
    await application.save()

    // Create notification for influencer
    const notification = new Notification({
      userId: application.influencerId._id,
      type: "application_rejected",
      title: "Application Update",
      message: `Your application for "${application.campaignId.title}" was not selected this time.`,
      data: {
        applicationId: application._id,
        campaignId: application.campaignId._id,
        reason,
      },
    })

    await notification.save()

    return NextResponse.json({
      message: "Application rejected",
      application,
    })
  } catch (error) {
    console.error("Reject application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
