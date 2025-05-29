import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { AdminLog } from "@/lib/models/admin-log"
import { Notification } from "@/lib/models/notification"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// POST /api/admin/campaigns/[id]/approve - Approve campaign
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

    const campaign = await Campaign.findByIdAndUpdate(params.id, { status: "published" }, { new: true }).populate(
      "brandId",
    )

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Log admin action
    const adminLog = new AdminLog({
      adminId: decoded.userId,
      action: `Approved campaign: ${campaign.title}`,
      affectedEntities: [campaign._id],
    })
    await adminLog.save()

    // Notify brand
    const notification = new Notification({
      userId: campaign.brandId._id,
      message: `Your campaign "${campaign.title}" has been approved and is now live!`,
      type: "campaign_update",
      readStatus: false,
    })
    await notification.save()

    return NextResponse.json({ message: "Campaign approved successfully", campaign })
  } catch (error) {
    console.error("Approve campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
