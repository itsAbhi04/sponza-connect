import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { AdminLog } from "@/lib/models/admin-log"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

const rejectSchema = z.object({
  reason: z.string().min(1).max(500),
})

// POST /api/admin/campaigns/[id]/reject - Reject campaign
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const body = await request.json()
    const { reason } = rejectSchema.parse(body)

    const campaign = await Campaign.findByIdAndUpdate(params.id, { status: "rejected" }, { new: true }).populate(
      "brandId",
    )

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Log admin action
    const adminLog = new AdminLog({
      adminId: decoded.userId,
      action: `Rejected campaign: ${campaign.title} - Reason: ${reason}`,
      affectedEntities: [campaign._id],
    })
    await adminLog.save()

    // Notify brand
    const notification = new Notification({
      userId: campaign.brandId._id,
      message: `Your campaign "${campaign.title}" was rejected. Reason: ${reason}`,
      type: "campaign_update",
      readStatus: false,
    })
    await notification.save()

    return NextResponse.json({ message: "Campaign rejected successfully", campaign })
  } catch (error) {
    console.error("Reject campaign error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
