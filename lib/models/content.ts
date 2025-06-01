import mongoose, { Schema, type Document } from "mongoose"

export interface IContent extends Document {
  campaignId: mongoose.Types.ObjectId
  influencerId: mongoose.Types.ObjectId
  brandId: mongoose.Types.ObjectId
  contentType: "post" | "story" | "reel" | "video" | "blog" | "other"
  platform: string
  title: string
  description: string
  mediaUrls: string[]
  postUrl?: string
  metrics: {
    views?: number
    likes?: number
    comments?: number
    shares?: number
    saves?: number
    engagementRate?: number
  }
  status: "draft" | "submitted" | "approved" | "rejected" | "published"
  submittedAt?: Date
  approvedAt?: Date
  publishedAt?: Date
  feedback?: string
  createdAt: Date
  updatedAt: Date
}

const contentSchema = new Schema<IContent>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    influencerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contentType: {
      type: String,
      enum: ["post", "story", "reel", "video", "blog", "other"],
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    mediaUrls: [
      {
        type: String,
      },
    ],
    postUrl: {
      type: String,
    },
    metrics: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      saves: { type: Number, default: 0 },
      engagementRate: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected", "published"],
      default: "draft",
    },
    submittedAt: {
      type: Date,
    },
    approvedAt: {
      type: Date,
    },
    publishedAt: {
      type: Date,
    },
    feedback: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
)

contentSchema.index({ campaignId: 1, status: 1 })
contentSchema.index({ influencerId: 1, status: 1 })
contentSchema.index({ brandId: 1, status: 1 })

export default mongoose.models.Content || mongoose.model<IContent>("Content", contentSchema)
