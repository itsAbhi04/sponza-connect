import { Schema, model, models } from "mongoose"

export interface IRazorpayDetails {
  orderId?: string
  paymentId?: string
  subscriptionId?: string
  payoutId?: string
  signature?: string
}

export interface ITransaction {
  _id: string
  userId: string
  type: "campaign_payment" | "withdrawal" | "referral_reward" | "subscription" | "wallet_topup" | "platform_fee"
  amount: number
  status: "pending" | "completed" | "failed"
  razorpayDetails: IRazorpayDetails
  description: string
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const razorpayDetailsSchema = new Schema<IRazorpayDetails>({
  orderId: {
    type: String,
    sparse: true,
  },
  paymentId: {
    type: String,
    sparse: true,
  },
  subscriptionId: {
    type: String,
    sparse: true,
  },
  payoutId: {
    type: String,
    sparse: true,
  },
  signature: {
    type: String,
    sparse: true,
  },
})

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["campaign_payment", "withdrawal", "referral_reward", "subscription", "wallet_topup", "platform_fee"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    razorpayDetails: razorpayDetailsSchema,
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
transactionSchema.index({ userId: 1 })
transactionSchema.index({ type: 1 })
transactionSchema.index({ status: 1 })
transactionSchema.index({ createdAt: -1 })
transactionSchema.index({ "razorpayDetails.orderId": 1 })
transactionSchema.index({ "razorpayDetails.paymentId": 1 })

export const Transaction = models.Transaction || model<ITransaction>("Transaction", transactionSchema)
