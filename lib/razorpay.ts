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

export async function createSubscription(planId: string, customerId: string, totalCount?: number) {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_id: customerId,
      total_count: totalCount,
      quantity: 1,
    })
    return subscription
  } catch (error) {
    console.error("Create subscription error:", error)
    throw new Error("Failed to create subscription")
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


export async function createPayout(
  amount: number,
  accountNumber: string,
  ifsc: string,
  purpose = "payout"
) {
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
      }
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
    amount: 99900, // ₹999 in paise
    currency: "INR",
    interval: 1,
    period: "monthly",
  },
  premium_annual: {
    id: "plan_premium_annual",
    name: "Premium Annual",
    amount: 999900, // ₹9999 in paise
    currency: "INR",
    interval: 1,
    period: "yearly",
  },
}

export const createRazorpaySubscription = async (params: any) => {
  // Implementation for creating Razorpay subscription
  // Add your logic here
}
