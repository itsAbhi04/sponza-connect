import { Schema, model, models } from "mongoose"

export interface INotification {
  _id: string
  userId: string
  message: string
  type: "campaign_update" | "application_status" | "payment" | "referral" | "admin"
  readStatus: boolean
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    type: {
      type: String,
      enum: ["campaign_update", "application_status", "payment", "referral", "admin"],
      required: true,
    },
    readStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
notificationSchema.index({ userId: 1 })
notificationSchema.index({ readStatus: 1 })
notificationSchema.index({ type: 1 })
notificationSchema.index({ createdAt: -1 })

export const Notification = models.Notification || model<INotification>("Notification", notificationSchema)
