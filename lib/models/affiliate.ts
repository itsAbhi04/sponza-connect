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
    referralCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      minlength: 6,
      maxlength: 10,
    },
    referrerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invitees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rewardType: {
      type: String,
      enum: ["fixed", "percentage", "tiered"],
      default: "fixed",
    },
    rewardAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "credited", "failed"],
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
