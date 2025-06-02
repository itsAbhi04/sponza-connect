import { Schema, model, models } from "mongoose"

export interface ISubscription {
  _id: string
  userId: string
  planType: "free" | "premium_monthly" | "premium_annual"
  razorpaySubscriptionId?: string
  status: "active" | "pending" | "cancelled" | "expired"
  startDate: Date
  endDate?: Date
  billingCycle: "monthly" | "annual" | "none"
  features: {
    maxCampaigns: number
    maxBudget: number
    analytics: "basic" | "advanced" | "premium"
    support: "email" | "priority" | "dedicated"
    verification: "standard" | "premium"
    customBranding: boolean
    apiAccess: boolean
  }
  createdAt: Date
  updatedAt: Date
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
      enum: ["active", "pending", "cancelled", "expired"],
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
      enum: ["monthly", "annual", "none"],
      default: "none",
    },
    features: {
      maxCampaigns: {
        type: Number,
        default: 3, // Free tier default
      },
      maxBudget: {
        type: Number,
        default: 50000, // ₹50,000 for free tier
      },
      analytics: {
        type: String,
        enum: ["basic", "advanced", "premium"],
        default: "basic",
      },
      support: {
        type: String,
        enum: ["email", "priority", "dedicated"],
        default: "email",
      },
      verification: {
        type: String,
        enum: ["standard", "premium"],
        default: "standard",
      },
      customBranding: {
        type: Boolean,
        default: false,
      },
      apiAccess: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Pre-save hook to set features based on plan type
subscriptionSchema.pre("save", function (next) {
  if (this.planType === "free") {
    this.features = {
      maxCampaigns: 3,
      maxBudget: 50000, // ₹50,000
      analytics: "basic",
      support: "email",
      verification: "standard",
      customBranding: false,
      apiAccess: false,
    }
    this.billingCycle = "none"
  } else if (this.planType === "premium_monthly") {
    this.features = {
      maxCampaigns: 999, // Unlimited for practical purposes
      maxBudget: 500000, // ₹5,00,000
      analytics: "advanced",
      support: "priority",
      verification: "premium",
      customBranding: true,
      apiAccess: false,
    }
    this.billingCycle = "monthly"
  } else if (this.planType === "premium_annual") {
    this.features = {
      maxCampaigns: 999, // Unlimited for practical purposes
      maxBudget: 2000000, // ₹20,00,000
      analytics: "premium",
      support: "dedicated",
      verification: "premium",
      customBranding: true,
      apiAccess: true,
    }
    this.billingCycle = "annual"
  }
  next()
})

// Indexes for better query performance
subscriptionSchema.index({ userId: 1 })
subscriptionSchema.index({ status: 1 })
subscriptionSchema.index({ planType: 1 })
subscriptionSchema.index({ endDate: 1 })
subscriptionSchema.index({ razorpaySubscriptionId: 1 })

export const Subscription = models.Subscription || model<ISubscription>("Subscription", subscriptionSchema)
