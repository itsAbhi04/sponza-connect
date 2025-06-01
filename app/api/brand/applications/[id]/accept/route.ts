import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Application from "@/lib/models/application"
import Notification from "@/lib/models/notification"
import Collaboration from "@/lib/models/collaboration"

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

    const { message, customTerms } = await request.json()

    const application = await Application.findById(params.id).populate("campaignId").populate("influencerId")

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Verify the campaign belongs to the brand
    if (application.campaignId.brandId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    if (application.status !== "applied") {
      return NextResponse.json({ error: "Application cannot be accepted" }, { status: 400 })
    }

    // Update application status
    application.status = "accepted"
    application.acceptedAt = new Date()
    if (message) application.brandMessage = message
    await application.save()

    // Create collaboration
    const collaboration = new Collaboration({
      campaignId: application.campaignId._id,
      brandId: decoded.userId,
      influencerId: application.influencerId._id,
      status: "active",
      terms: {
        budget: application.proposedBudget || application.campaignId.budget,
        deliverables: application.campaignId.deliverables,
        timeline: application.campaignId.timeline,
        paymentTerms: customTerms || "Payment upon completion",
      },
      progress: {
        contentSubmitted: 0,
        contentApproved: 0,
        totalDeliverables: application.campaignId.deliverables.reduce((sum, d) => sum + d.quantity, 0),
        completionPercentage: 0,
      },
      payments: [
        {
          amount: application.proposedBudget || application.campaignId.budget,
          status: "pending",
          dueDate: application.campaignId.timeline.endDate,
        },
      ],
    })

    await collaboration.save()

    // Create notification for influencer
    const notification = new Notification({
      userId: application.influencerId._id,
      type: "application_accepted",
      title: "Application Accepted!",
      message: `Your application for "${application.campaignId.title}" has been accepted.`,
      data: {
        applicationId: application._id,
        campaignId: application.campaignId._id,
        collaborationId: collaboration._id,
      },
    })

    await notification.save()

    return NextResponse.json({
      message: "Application accepted successfully",
      application,
      collaboration,
    })
  } catch (error) {
    console.error("Accept application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
