import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { Application } from "@/lib/models/application"
import { Transaction } from "@/lib/models/transaction"
import { Wallet } from "@/lib/models/wallet"

// PUT /api/applications/[id]/update - Update application status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "brand") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status, feedback } = await request.json()

    const application = await Application.findById(params.id).populate("campaignId")
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Check if user owns the campaign
    if (application.campaignId.brandId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    application.status = status
    if (feedback) {
      application.feedback = feedback
    }

    // If accepted, create payment transaction
    if (status === "accepted") {
      const transaction = new Transaction({
        userId: application.influencerId,
        type: "campaign_payment",
        amount: application.pricing,
        description: `Payment for campaign: ${application.campaignId.title}`,
        status: "pending",
        metadata: {
          campaignId: application.campaignId._id,
          applicationId: application._id,
        },
      })
      await transaction.save()

      // Update influencer wallet
      let wallet = await Wallet.findOne({ userId: application.influencerId })
      if (!wallet) {
        wallet = new Wallet({
          userId: application.influencerId,
          balance: 0,
        })
      }
      wallet.pendingBalance = (wallet.pendingBalance || 0) + application.pricing
      await wallet.save()
    }

    await application.save()

    return NextResponse.json({
      message: "Application updated successfully",
      application,
    })
  } catch (error) {
    console.error("Update application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
