import mongoose, { Schema, type Document } from "mongoose"

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId
  campaignId: mongoose.Types.ObjectId
  influencerId?: mongoose.Types.ObjectId
  amount: number
  currency: string
  paymentMethod: string
  paymentGateway: string
  transactionId: string
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  description: string
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    influencerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentGateway: {
      type: String,
      required: true,
      default: "razorpay",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "refunded"],
      default: "pending",
    },
    description: {
      type: String,
      required: true,
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

paymentSchema.index({ userId: 1, status: 1 })
paymentSchema.index({ campaignId: 1 })
paymentSchema.index({ transactionId: 1 })

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema)
