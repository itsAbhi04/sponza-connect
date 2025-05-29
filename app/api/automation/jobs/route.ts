import { type NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/lib/models/campaign"
import { Application } from "@/lib/models/application"
import { Notification } from "@/lib/models/notification"
import { Subscription } from "@/lib/models/subscription"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// POST /api/automation/jobs - Trigger automated jobs
export async function POST(request: NextRequest) {
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

    const { jobType } = await request.json()

    let result: any = {}

    switch (jobType) {
      case "campaign_reminders":
        result = await sendCampaignReminders()
        break
      case "subscription_renewals":
        result = await processSubscriptionRenewals()
        break
      case "cleanup_expired":
        result = await cleanupExpiredData()
        break
      case "generate_reports":
        result = await generateAutomatedReports()
        break
      default:
        return NextResponse.json({ error: "Invalid job type" }, { status: 400 })
    }

    return NextResponse.json({
      jobType,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Automation job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function sendCampaignReminders() {
  // Find campaigns ending in 3 days
  const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  const endingSoonCampaigns = await Campaign.find({
    "timeline.endDate": { $lte: threeDaysFromNow, $gte: new Date() },
    status: "in-progress",
  }).populate("brandId")

  let remindersSent = 0

  for (const campaign of endingSoonCampaigns) {
    // Get accepted applications for this campaign
    const acceptedApplications = await Application.find({
      campaignId: campaign._id,
      status: "accepted",
    }).populate("influencerId")

    // Send reminders to influencers
    for (const application of acceptedApplications) {
      const notification = new Notification({
        userId: application.influencerId._id,
        message: `Reminder: Campaign "${campaign.title}" ends in 3 days. Please submit your deliverables.`,
        type: "campaign_update",
      })
      await notification.save()
      remindersSent++
    }

    // Send reminder to brand
    const brandNotification = new Notification({
      userId: campaign.brandId._id,
      message: `Your campaign "${campaign.title}" ends in 3 days. Please review submitted deliverables.`,
      type: "campaign_update",
    })
    await brandNotification.save()
    remindersSent++
  }

  return { remindersSent, campaignsProcessed: endingSoonCampaigns.length }
}

async function processSubscriptionRenewals() {
  // Find subscriptions expiring in 7 days
  const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const expiringSubscriptions = await Subscription.find({
    endDate: { $lte: sevenDaysFromNow, $gte: new Date() },
    status: "active",
    planType: { $ne: "free" },
  }).populate("userId")

  let renewalNotificationsSent = 0

  for (const subscription of expiringSubscriptions) {
    const notification = new Notification({
      userId: subscription.userId._id,
      message: `Your ${subscription.planType} subscription expires in 7 days. Renew now to continue enjoying premium features.`,
      type: "payment",
    })
    await notification.save()
    renewalNotificationsSent++
  }

  // Find expired subscriptions and downgrade to free
  const expiredSubscriptions = await Subscription.find({
    endDate: { $lt: new Date() },
    status: "active",
    planType: { $ne: "free" },
  })

  let subscriptionsDowngraded = 0

  for (const subscription of expiredSubscriptions) {
    subscription.planType = "free"
    subscription.status = "expired"
    await subscription.save()

    const notification = new Notification({
      userId: subscription.userId._id,
      message: "Your premium subscription has expired. You've been moved to the free plan.",
      type: "payment",
    })
    await notification.save()
    subscriptionsDowngraded++
  }

  return { renewalNotificationsSent, subscriptionsDowngraded }
}

async function cleanupExpiredData() {
  // Archive completed campaigns older than 6 months
  const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
  const oldCompletedCampaigns = await Campaign.updateMany(
    {
      status: "completed",
      updatedAt: { $lt: sixMonthsAgo },
    },
    { status: "archived" },
  )

  // Delete old notifications (older than 3 months)
  const threeMonthsAgo = new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
  const deletedNotifications = await Notification.deleteMany({
    createdAt: { $lt: threeMonthsAgo },
    readStatus: true,
  })

  return {
    campaignsArchived: oldCompletedCampaigns.modifiedCount,
    notificationsDeleted: deletedNotifications.deletedCount,
  }
}

async function generateAutomatedReports() {
  // Generate daily platform statistics
  const today = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

  const dailyStats = {
    newCampaigns: await Campaign.countDocuments({
      createdAt: { $gte: yesterday, $lt: today },
    }),
    newApplications: await Application.countDocuments({
      createdAt: { $gte: yesterday, $lt: today },
    }),
    completedCampaigns: await Campaign.countDocuments({
      status: "completed",
      updatedAt: { $gte: yesterday, $lt: today },
    }),
  }

  // In a real implementation, this would save to a reports collection
  // or send to analytics services

  return { dailyStats, reportGenerated: true }
}

// GET /api/automation/jobs - Get job status and history
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real implementation, this would fetch from a job queue/history table
    const jobStatus = {
      availableJobs: [
        {
          type: "campaign_reminders",
          description: "Send reminders for campaigns ending soon",
          lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: "scheduled",
        },
        {
          type: "subscription_renewals",
          description: "Process subscription renewals and notifications",
          lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          nextRun: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          status: "scheduled",
        },
        {
          type: "cleanup_expired",
          description: "Archive old data and clean up expired content",
          lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: "scheduled",
        },
        {
          type: "generate_reports",
          description: "Generate automated daily reports",
          lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: "scheduled",
        },
      ],
    }

    return NextResponse.json(jobStatus)
  } catch (error) {
    console.error("Get automation jobs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
