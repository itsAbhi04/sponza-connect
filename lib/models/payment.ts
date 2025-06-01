import mongoose, { Schema, type Document } from "mongoose"

export interface IPayment extends Document {
  paymentId: string
  orderId: string
  userId: mongoose.Types.ObjectId
  campaignId?: mongoose.Types.ObjectId
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: "razorpay" | "stripe" | "paypal" | "bank_transfer"
  gatewayResponse: any
  description: string
  metadata: any
  createdAt: Date
  updatedAt: Date
}

const PaymentSchema = new Schema<IPayment>(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "stripe", "paypal", "bank_transfer"],
      default: "razorpay",
    },
    gatewayResponse: {
      type: Schema.Types.Mixed,
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
)

PaymentSchema.index({ userId: 1, status: 1 })
PaymentSchema.index({ campaignId: 1 })
PaymentSchema.index({ paymentId: 1 })

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema)
