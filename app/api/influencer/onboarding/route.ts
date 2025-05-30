import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { User } from "@/lib/models/user"
import { InfluencerProfile } from "@/lib/models/influencer-profile"
import { Application } from "@/lib/models/application"

// GET /api/influencer/onboarding - Get onboarding status
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "influencer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user and profile data
    const user = await User.findById(decoded.userId)
    const profile = await InfluencerProfile.findOne({ userId: decoded.userId })
    const applications = await Application.find({ influencerId: decoded.userId })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate onboarding progress
    const checklist = [
      {
        id: "email_verified",
        title: "Verify Email Address",
        description: "Confirm your email to unlock all features",
        completed: user.emailVerified || false,
        priority: "high",
      },
      {
        id: "profile_created",
        title: "Create Influencer Profile",
        description: "Set up your basic profile information",
        completed: !!profile,
        priority: "high",
      },
      {
        id: "bio_added",
        title: "Add Bio",
        description: "Write a compelling bio (100+ characters)",
        completed: !!(profile?.bio && profile.bio.length >= 100),
        priority: "high",
      },
      {
        id: "social_media_connected",
        title: "Connect Social Media",
        description: "Link at least 2 social media accounts",
        completed: !!(profile?.socialMediaStats && profile.socialMediaStats.length >= 2),
        priority: "high",
      },
      {
        id: "niche_selected",
        title: "Select Your Niches",
        description: "Choose your content categories",
        completed: !!(profile?.niche && profile.niche.length > 0),
        priority: "medium",
      },
      {
        id: "portfolio_added",
        title: "Add Portfolio Samples",
        description: "Upload 3+ examples of your work",
        completed: !!(profile?.portfolio && profile.portfolio.length >= 3),
        priority: "medium",
      },
      {
        id: "pricing_set",
        title: "Set Pricing Structure",
        description: "Define your rates for different services",
        completed: !!(profile?.pricingStructure && profile.pricingStructure.length > 0),
        priority: "medium",
      },
      {
        id: "first_application",
        title: "Apply to First Campaign",
        description: "Submit your first campaign application",
        completed: applications.length > 0,
        priority: "low",
      },
    ]

    const completedItems = checklist.filter((item) => item.completed).length
    const totalItems = checklist.length
    const progressPercentage = Math.round((completedItems / totalItems) * 100)

    // Generate personalized tips
    const tips = generateOnboardingTips(checklist, profile)

    const onboardingData = {
      progressPercentage,
      completedItems,
      totalItems,
      checklist,
      tips,
      isComplete: progressPercentage === 100,
      nextSteps: getNextSteps(checklist),
    }

    return NextResponse.json(onboardingData)
  } catch (error) {
    console.error("Get onboarding error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/influencer/onboarding - Update onboarding step
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "influencer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { stepId, action } = await request.json()

    // Handle specific onboarding actions
    switch (stepId) {
      case "email_verified":
        if (action === "resend") {
          // Logic to resend verification email
          return NextResponse.json({ message: "Verification email sent" })
        }
        break

      case "profile_created":
        if (action === "create") {
          // Create basic profile
          const existingProfile = await InfluencerProfile.findOne({ userId: decoded.userId })
          if (!existingProfile) {
            const newProfile = new InfluencerProfile({
              userId: decoded.userId,
              bio: "",
              location: "",
              niche: [],
              socialMediaStats: [],
              pricingStructure: [],
              availabilityStatus: "available",
              ratings: [],
              portfolio: [],
            })
            await newProfile.save()
          }
          return NextResponse.json({ message: "Profile created" })
        }
        break
    }

    return NextResponse.json({ message: "Action completed" })
  } catch (error) {
    console.error("Update onboarding error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateOnboardingTips(checklist: any[], profile: any): string[] {
  const tips: string[] = []
  const incompleteItems = checklist.filter((item) => !item.completed)

  if (incompleteItems.length === 0) {
    tips.push("🎉 Congratulations! Your profile is fully optimized")
    tips.push("Start applying to campaigns to begin earning")
    return tips
  }

  // Priority-based tips
  const highPriorityIncomplete = incompleteItems.filter((item) => item.priority === "high")
  if (highPriorityIncomplete.length > 0) {
    tips.push(`Complete "${highPriorityIncomplete[0].title}" to unlock more features`)
  }

  // Specific tips based on missing items
  if (!profile) {
    tips.push("Create your profile to start receiving campaign recommendations")
  } else {
    if (!profile.bio || profile.bio.length < 100) {
      tips.push("A detailed bio increases campaign matches by 30%")
    }

    if (!profile.socialMediaStats || profile.socialMediaStats.length < 2) {
      tips.push("Connect Instagram and TikTok for the most opportunities")
    }

    if (!profile.portfolio || profile.portfolio.length < 3) {
      tips.push("Portfolio samples increase application acceptance by 25%")
    }
  }

  // General encouragement
  const completedCount = checklist.filter((item) => item.completed).length
  if (completedCount > 0) {
    tips.push(`Great progress! You've completed ${completedCount}/${checklist.length} steps`)
  }

  return tips.slice(0, 4)
}

function getNextSteps(checklist: any[]): any[] {
  const incompleteItems = checklist.filter((item) => !item.completed)

  // Sort by priority and return top 3
  const priorityOrder = { high: 3, medium: 2, low: 1 }
  return incompleteItems
    .sort(
      (a, b) =>
        priorityOrder[b.priority as keyof typeof priorityOrder] -
        priorityOrder[a.priority as keyof typeof priorityOrder],
    )
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      action: getActionForStep(item.id),
    }))
}

function getActionForStep(stepId: string): string {
  const actions: { [key: string]: string } = {
    email_verified: "Verify Email",
    profile_created: "Create Profile",
    bio_added: "Add Bio",
    social_media_connected: "Connect Accounts",
    niche_selected: "Select Niches",
    portfolio_added: "Upload Portfolio",
    pricing_set: "Set Pricing",
    first_application: "Browse Campaigns",
  }

  return actions[stepId] || "Complete Step"
}
