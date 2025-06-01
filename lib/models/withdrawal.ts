import mongoose, { Schema, type Document } from "mongoose"

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId
  amount: number
  currency: string
  paymentMethod: string
  accountDetails: Record<string, any>
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  processedAt?: Date
  transactionId?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const withdrawalSchema = new Schema<IWithdrawal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      enum: ["bank_transfer", "upi", "paypal", "crypto"],
    },
    accountDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "cancelled"],
      default: "pending",
    },
    processedAt: {
      type: Date,
    },
    transactionId: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  },
)

withdrawalSchema.index({ userId: 1, status: 1 })
withdrawalSchema.index({ createdAt: -1 })

export default mongoose.models.Withdrawal || mongoose.model<IWithdrawal>("Withdrawal", withdrawalSchema)
