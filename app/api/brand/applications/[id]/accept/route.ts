import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Application from "@/lib/models/application"
import Campaign from "@/lib/models/campaign"
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

    const application = await Application.findById(params.id).populate("campaignId")

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Verify the campaign belongs to the brand
    const campaign = await Campaign.findOne({
      _id: application.campaignId,
      brandId: decoded.userId,
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Update application status
    application.status = "accepted"
    application.respondedAt = new Date()
    await application.save()

    // Create collaboration
    const collaboration = new Collaboration({
      campaignId: application.campaignId,
      brandId: decoded.userId,
      influencerId: application.influencerId,
      applicationId: application._id,
      terms: {
        deliverables: campaign.deliverables.map((d) => ({
          type: d.type,
          quantity: d.quantity,
          deadline: campaign.timeline.endDate,
          completed: false,
        })),
        payment: {
          amount: application.pricing,
          currency: "INR",
          schedule: "completion",
        },
        timeline: {
          startDate: campaign.timeline.startDate,
          endDate: campaign.timeline.endDate,
        },
      },
      progress: {
        completedDeliverables: 0,
        totalDeliverables: campaign.deliverables.length,
        percentageComplete: 0,
      },
    })

    await collaboration.save()

    return NextResponse.json({
      message: "Application accepted successfully",
      application,
      collaboration,
    })
  } catch (error) {
    console.error("Error accepting application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
