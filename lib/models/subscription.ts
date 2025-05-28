import { Schema, model, models } from "mongoose"

export interface ISubscription {
  _id: string
  userId: string
  planType: "free" | "premium_monthly" | "premium_annual"
  razorpaySubscriptionId?: string
  status: "active" | "inactive" | "cancelled" | "expired"
  startDate: Date
  endDate?: Date
  billingCycle: "monthly" | "annual"
  createdAt: Date
  updatedAt: Date
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    planType: {
      type: String,
      enum: ["free", "premium_monthly", "premium_annual"],
      default: "free",
    },
    razorpaySubscriptionId: {
      type: String,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "annual"],
      default: "monthly",
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
subscriptionSchema.index({ userId: 1 })
subscriptionSchema.index({ status: 1 })
subscriptionSchema.index({ planType: 1 })
subscriptionSchema.index({ endDate: 1 })

export const Subscription = models.Subscription || model<ISubscription>("Subscription", subscriptionSchema)
