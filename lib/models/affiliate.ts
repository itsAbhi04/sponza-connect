import { Schema, model, models } from "mongoose"

export interface IAffiliate {
  _id: string
  referralCode: string
  referrerId: string
  invitees: string[]
  rewardType: "fixed" | "percentage" | "tiered"
  rewardAmount: number
  status: "pending" | "credited" | "failed"
  createdAt: Date
  updatedAt: Date
}

const affiliateSchema = new Schema<IAffiliate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referrerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
    },
    rewardAmount: {
      type: Number,
      required: true,
      default: 500, // Default reward amount in INR
    },
    totalReferrals: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
affiliateSchema.index({ referralCode: 1 })
affiliateSchema.index({ referrerId: 1 })
affiliateSchema.index({ status: 1 })

export const Affiliate = models.Affiliate || model<IAffiliate>("Affiliate", affiliateSchema)
