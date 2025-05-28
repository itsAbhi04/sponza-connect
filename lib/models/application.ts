import { Schema, model, models } from "mongoose"

export interface IApplication {
  _id: string
  influencerId: string
  campaignId: string
  proposal: string
  pricing: number
  status: "applied" | "accepted" | "rejected" | "completed"
  feedback?: {
    rating?: number
    comment?: string
  }
  createdAt: Date
  updatedAt: Date
}

const applicationSchema = new Schema<IApplication>(
  {
    influencerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    proposal: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    pricing: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["applied", "accepted", "rejected", "completed"],
      default: "applied",
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        maxlength: 500,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
applicationSchema.index({ influencerId: 1 })
applicationSchema.index({ campaignId: 1 })
applicationSchema.index({ status: 1 })
applicationSchema.index({ createdAt: -1 })

// Compound index for unique applications
applicationSchema.index({ influencerId: 1, campaignId: 1 }, { unique: true })

export const Application = models.Application || model<IApplication>("Application", applicationSchema)
