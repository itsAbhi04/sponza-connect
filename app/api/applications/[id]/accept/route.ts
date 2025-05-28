import { type NextRequest, NextResponse } from "next/server"
import { Application } from "@/lib/models/application"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// POST /api/applications/[id]/accept - Accept application
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const application = await Application.findById(params.id).populate("campaignId")
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Verify campaign ownership
    if (application.campaignId.brandId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    if (application.status !== "applied") {
      return NextResponse.json({ error: "Application cannot be accepted" }, { status: 400 })
    }

    application.status = "accepted"
    await application.save()

    return NextResponse.json(
      {
        message: "Application accepted successfully",
        application,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Accept application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
