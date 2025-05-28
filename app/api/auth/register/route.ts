import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { User } from "@/lib/models/user"
import { Wallet } from "@/lib/models/wallet"
import { Subscription } from "@/lib/models/subscription"
import { Affiliate } from "@/lib/models/affiliate"
import { connectDB } from "@/lib/db"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["brand", "influencer"]),
  referralCode: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: validatedData.role,
      verificationStatus: "pending",
    })

    await user.save()

    // Create wallet for the user
    const wallet = new Wallet({
      userId: user._id,
      balance: 0,
      transactions: [],
    })
    await wallet.save()

    // Create free subscription
    const subscription = new Subscription({
      userId: user._id,
      planType: "free",
      status: "active",
      startDate: new Date(),
      billingCycle: "monthly",
    })
    await subscription.save()

    // Handle referral code if provided
    if (validatedData.referralCode) {
      try {
        const affiliate = await Affiliate.findOne({ referralCode: validatedData.referralCode.toUpperCase() })
        if (affiliate) {
          affiliate.invitees.push(user._id as any)
          await affiliate.save()

          // Create referral reward transaction (to be processed later)
          // This would typically trigger a background job to process the reward
        }
      } catch (referralError) {
        console.log("Referral processing failed:", referralError)
        // Don't fail registration if referral processing fails
      }
    }

    // Generate referral code for new user
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    let referralCode = generateReferralCode()
    let codeExists = await Affiliate.findOne({ referralCode })

    // Ensure unique referral code
    while (codeExists) {
      referralCode = generateReferralCode()
      codeExists = await Affiliate.findOne({ referralCode })
    }

    const userAffiliate = new Affiliate({
      referralCode,
      referrerId: user._id,
      invitees: [],
      rewardType: "fixed",
      rewardAmount: 500, // ₹500 per referral
      status: "pending",
    })
    await userAffiliate.save()

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
      referralCode: referralCode,
    }

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
