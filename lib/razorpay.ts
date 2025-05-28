import Razorpay from "razorpay"
import crypto from "crypto"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
})

export async function createRazorpaySubscription(planType: string, userId: string) {
  const plans = {
    premium_monthly: {
      amount: 299900, // ₹2999 in paise
      interval: 1,
      period: "monthly",
    },
    premium_annual: {
      amount: 2999900, // ₹29999 in paise
      interval: 1,
      period: "yearly",
    },
  }

  const plan = plans[planType as keyof typeof plans]
  if (!plan) {
    throw new Error("Invalid plan type")
  }

  try {
    // Create Razorpay plan
    const razorpayPlan = await razorpay.plans.create({
      period: plan.period,
      interval: plan.interval,
      item: {
        name: `Sponza ${planType.replace("_", " ")} Plan`,
        amount: plan.amount,
        currency: "INR",
      },
    })

    // Create subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: razorpayPlan.id,
      customer_notify: 1,
      total_count: planType === "premium_annual" ? 1 : 12, // 1 year for annual, 12 months for monthly
      notes: {
        userId: userId,
        planType: planType,
      },
    })

    return subscription
  } catch (error) {
    console.error("Razorpay subscription creation failed:", error)
    throw new Error("Failed to create subscription")
  }
}

export async function createRazorpayOrder(amount: number, currency = "INR", notes: any = {}) {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      notes,
    })

    return order
  } catch (error) {
    console.error("Razorpay order creation failed:", error)
    throw new Error("Failed to create order")
  }
}

export async function createRazorpayPayout(amount: number, bankDetails: any, notes: any = {}) {
  try {
    const payout = await razorpay.payouts.create({
      account_number: process.env.RAZORPAY_ACCOUNT_NUMBER,
      amount: amount * 100, // Convert to paise
      currency: "INR",
      mode: "NEFT",
      purpose: "payout",
      fund_account: {
        account_type: "bank_account",
        bank_account: {
          name: bankDetails.accountHolderName,
          ifsc: bankDetails.ifscCode,
          account_number: bankDetails.accountNumber,
        },
      },
      queue_if_low_balance: true,
      reference_id: `payout_${Date.now()}`,
      narration: "Sponza influencer payout",
      notes,
    })

    return payout
  } catch (error) {
    console.error("Razorpay payout creation failed:", error)
    throw new Error("Failed to create payout")
  }
}

export function verifyRazorpayWebhook(body: string, signature: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(body)
      .digest("hex")

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  } catch (error) {
    console.error("Webhook verification failed:", error)
    return false
  }
}

export function verifyRazorpayPayment(orderId: string, paymentId: string, signature: string): boolean {
  try {
    const body = orderId + "|" + paymentId
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body)
      .digest("hex")

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  } catch (error) {
    console.error("Payment verification failed:", error)
    return false
  }
}
