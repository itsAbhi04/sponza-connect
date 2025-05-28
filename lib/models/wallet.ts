import { Schema, model, models } from "mongoose"

export interface IWallet {
  _id: string
  userId: string
  balance: number
  transactions: string[]
  createdAt: Date
  updatedAt: Date
}

const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
walletSchema.index({ userId: 1 })

export const Wallet = models.Wallet || model<IWallet>("Wallet", walletSchema)
