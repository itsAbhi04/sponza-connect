import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Application from "@/lib/models/application"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month")
    const year = searchParams.get("year")

    // Get accepted applications for the influencer
    const applications = await Application.find({
      influencerId: decoded.userId,
      status: "accepted",
    }).populate({
      path: "campaignId",
      select: "title timeline deliverables brandId",
      populate: {
        path: "brandId",
        select: "name",
      },
    })

    // Format calendar events
    const events = applications.map((app) => ({
      id: app._id,
      title: app.campaignId.title,
      brand: app.campaignId.brandId.name,
      startDate: app.campaignId.timeline.startDate,
      endDate: app.campaignId.timeline.endDate,
      deliverables: app.campaignId.deliverables,
      status: app.status,
      type: "campaign",
    }))

    // Add milestone events
    const milestones = []
    applications.forEach((app) => {
      if (app.campaignId.deliverables) {
        app.campaignId.deliverables.forEach((deliverable, index) => {
          milestones.push({
            id: `${app._id}-milestone-${index}`,
            title: `Deliverable: ${deliverable.type}`,
            brand: app.campaignId.brandId.name,
            date: deliverable.dueDate,
            description: deliverable.description,
            type: "milestone",
            campaignId: app.campaignId._id,
          })
        })
      }
    })

    return NextResponse.json({
      events: [...events, ...milestones],
      summary: {
        totalCampaigns: applications.length,
        upcomingDeadlines: milestones.filter(
          (m) => new Date(m.date) > new Date() && new Date(m.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ).length,
      },
    })
  } catch (error) {
    console.error("Calendar fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
