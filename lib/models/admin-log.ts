import { Schema, model, models } from "mongoose"

export interface IAdminLog {
  _id: string
  adminId: string
  action: string
  affectedEntities: Array<{
    entityType: string
    entityId: string
  }>
  createdAt: Date
  updatedAt: Date
}

const adminLogSchema = new Schema<IAdminLog>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      maxlength: 500,
    },
    affectedEntities: [
      {
        entityType: {
          type: String,
          required: true,
          enum: ["User", "Campaign", "Transaction", "Application", "Subscription"],
        },
        entityId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
adminLogSchema.index({ adminId: 1 })
adminLogSchema.index({ createdAt: -1 })
adminLogSchema.index({ "affectedEntities.entityType": 1 })

export const AdminLog = models.AdminLog || model<IAdminLog>("AdminLog", adminLogSchema)
