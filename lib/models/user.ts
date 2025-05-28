import { Schema, model, models } from "mongoose"

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: "admin" | "brand" | "influencer"
  profilePicture?: string
  verificationStatus: "pending" | "verified" | "rejected"
  subscriptionPlan?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "brand", "influencer"],
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    subscriptionPlan: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ verificationStatus: 1 })

export const User = models.User || model<IUser>("User", userSchema)
