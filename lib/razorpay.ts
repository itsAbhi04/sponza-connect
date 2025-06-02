import Razorpay from "razorpay"
import axios from "axios"
import crypto from "crypto"

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay credentials are not configured")
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export function validateWebhookSignature(body: string, signature: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex")

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  } catch (error) {
    console.error("Webhook signature validation error:", error)
    return false
  }
}

export async function createOrder(amount: number, currency = "INR", receipt?: string) {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `order_${Date.now()}`,
    })
    return order
  } catch (error) {
    console.error("Create order error:", error)
    throw new Error("Failed to create payment order")
  }
}

export async function createRazorpaySubscription(params: {
  plan_id: string
  customer_name: string
  customer_email: string
  customer_contact: string
  total_count: number
}) {
  try {
    // First create a customer
    const customer = await razorpay.customers.create({
      name: params.customer_name,
      email: params.customer_email,
      contact: params.customer_contact,
    })

    // Then create a subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: params.plan_id,
      customer_id: customer.id,
      total_count: params.total_count,
      quantity: 1,
    })

    return subscription
  } catch (error) {
    console.error("Create subscription error:", error)
    throw new Error("Failed to create subscription")
  }
}

export async function cancelRazorpaySubscription(subscriptionId: string) {
  try {
    const subscription = await razorpay.subscriptions.cancel(subscriptionId, {
      cancel_at_cycle_end: true,
    })
    return subscription
  } catch (error) {
    console.error("Cancel subscription error:", error)
    throw new Error("Failed to cancel subscription")
  }
}

export async function createCustomer(name: string, email: string, contact?: string) {
  try {
    const customer = await razorpay.customers.create({
      name,
      email,
      contact,
    })
    return customer
  } catch (error) {
    console.error("Create customer error:", error)
    throw new Error("Failed to create customer")
  }
}

export async function createPayout(amount: number, accountNumber: string, ifsc: string, purpose = "payout") {
  try {
    const response = await axios.post(
      "https://api.razorpay.com/v1/payouts",
      {
        account_number: process.env.RAZORPAYX_ACCOUNT_NUMBER!,
        fund_account: {
          account_type: "bank_account",
          bank_account: {
            name: "Beneficiary Name",
            ifsc,
            account_number: accountNumber,
          },
        },
        amount: amount * 100, // in paise
        currency: "INR",
        mode: "IMPS",
        purpose,
        queue_if_low_balance: true,
      },
      {
        auth: {
          username: process.env.RAZORPAY_KEY_ID!,
          password: process.env.RAZORPAY_KEY_SECRET!,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return response.data
  } catch (error: any) {
    console.error("Create payout error:", error.response?.data || error.message)
    throw new Error("Failed to create payout")
  }
}

export async function verifyPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {
  try {
    const body = orderId + "|" + paymentId
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(body).digest("hex")

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  } catch (error) {
    console.error("Payment verification error:", error)
    return false
  }
}

export const SUBSCRIPTION_PLANS = {
  premium_monthly: {
    id: "plan_premium_monthly",
    name: "Premium Monthly",
    amount: 299900, // ₹2,999 in paise
    currency: "INR",
    interval: 1,
    period: "monthly",
    features: [
      "Unlimited campaigns",
      "Advanced analytics",
      "Priority support",
      "Premium verification",
      "Custom branding",
    ],
  },
  premium_annual: {
    id: "plan_premium_annual",
    name: "Premium Annual",
    amount: 2999900, // ₹29,999 in paise
    currency: "INR",
    interval: 1,
    period: "yearly",
    features: [
      "Everything in Premium Monthly",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
      "API access",
    ],
  },
  free: {
    id: "plan_free",
    name: "Free",
    amount: 0,
    currency: "INR",
    interval: 0,
    period: "free",
    features: ["Up to 3 campaigns per month", "Basic analytics", "Email support", "Standard verification"],
  },
}
