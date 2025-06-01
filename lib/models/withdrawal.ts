import mongoose, { Schema, type Document } from "mongoose"

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId
  amount: number
  currency: string
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  bankDetails: {
    accountNumber: string
    ifscCode: string
    accountHolderName: string
    bankName: string
  }
  transactionId?: string
  adminNotes?: string
  processedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const WithdrawalSchema = new Schema<IWithdrawal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 100, // Minimum withdrawal amount
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "cancelled"],
      default: "pending",
    },
    bankDetails: {
      accountNumber: {
        type: String,
        required: true,
      },
      ifscCode: {
        type: String,
        required: true,
      },
      accountHolderName: {
        type: String,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
    },
    transactionId: {
      type: String,
    },
    adminNotes: {
      type: String,
    },
    processedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

WithdrawalSchema.index({ userId: 1, status: 1 })
WithdrawalSchema.index({ status: 1 })

export default mongoose.models.Withdrawal || mongoose.model<IWithdrawal>("Withdrawal", WithdrawalSchema)
