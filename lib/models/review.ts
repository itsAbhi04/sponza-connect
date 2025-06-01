import mongoose, { Schema, type Document } from "mongoose"

export interface IReview extends Document {
  reviewerId: mongoose.Types.ObjectId
  revieweeId: mongoose.Types.ObjectId
  campaignId: mongoose.Types.ObjectId
  rating: number
  comment: string
  reviewType: "brand_to_influencer" | "influencer_to_brand"
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    revieweeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    reviewType: {
      type: String,
      enum: ["brand_to_influencer", "influencer_to_brand"],
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

ReviewSchema.index({ revieweeId: 1, reviewType: 1 })
ReviewSchema.index({ campaignId: 1 })

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema)
