import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { z } from "zod"

// In a real app, you'd store these in a database
let platformSettings = {
  commissionRate: 10, // percentage
  minimumWithdrawal: 1000, // in rupees
  autoApprovalThreshold: 5000, // campaigns below this amount are auto-approved
  maintenanceMode: false,
  allowNewRegistrations: true,
  emailNotifications: true,
  smsNotifications: false,
  maxCampaignBudget: 1000000,
  minCampaignBudget: 1000,
}

const settingsSchema = z.object({
  commissionRate: z.number().min(0).max(50).optional(),
  minimumWithdrawal: z.number().min(100).optional(),
  autoApprovalThreshold: z.number().min(0).optional(),
  maintenanceMode: z.boolean().optional(),
  allowNewRegistrations: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  maxCampaignBudget: z.number().min(1000).optional(),
  minCampaignBudget: z.number().min(100).optional(),
})

export async function GET(request: NextRequest) {
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

    return NextResponse.json({ settings: platformSettings })
  } catch (error) {
    console.error("Get platform settings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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
    const validatedSettings = settingsSchema.parse(body)

    // Update platform settings
    platformSettings = { ...platformSettings, ...validatedSettings }

    return NextResponse.json({
      message: "Platform settings updated successfully",
      settings: platformSettings,
    })
  } catch (error) {
    console.error("Update platform settings error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
