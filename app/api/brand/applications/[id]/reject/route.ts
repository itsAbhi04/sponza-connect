import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Application from "@/lib/models/application"
import Campaign from "@/lib/models/campaign"

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

    const { feedback } = await request.json()

    const application = await Application.findById(params.id)

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
    application.status = "rejected"
    application.respondedAt = new Date()
    if (feedback) {
      application.feedback = feedback
    }
    await application.save()

    return NextResponse.json({
      message: "Application rejected successfully",
      application,
    })
  } catch (error) {
    console.error("Error rejecting application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
