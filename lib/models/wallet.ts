import { Schema, model, models } from "mongoose"

export interface IWallet {
  _id: string
  userId: string
  balance: number
  transactions: string[]
  paymentMethods: {
    type: "bank" | "upi" | "paypal"
    details: Record<string, any>
    isDefault: boolean
  }[]
  createdAt: Date
  updatedAt: Date
}

const paymentMethodSchema = new Schema({
  type: {
    type: String,
    enum: ["bank", "upi", "paypal"],
    required: true,
  },
  details: {
    type: Schema.Types.Mixed,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
})

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
    paymentMethods: [paymentMethodSchema],
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
walletSchema.index({ userId: 1 })

export const Wallet = models.Wallet || model<IWallet>("Wallet", walletSchema)
