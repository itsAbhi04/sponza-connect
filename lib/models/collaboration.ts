import mongoose, { Schema, type Document } from "mongoose"

export interface ICollaboration extends Document {
  campaignId: mongoose.Types.ObjectId
  brandId: mongoose.Types.ObjectId
  influencerId: mongoose.Types.ObjectId
  applicationId: mongoose.Types.ObjectId
  status: "active" | "completed" | "cancelled" | "disputed"
  terms: {
    deliverables: Array<{
      type: string
      quantity: number
      deadline: Date
      completed: boolean
    }>
    payment: {
      amount: number
      currency: string
      schedule: "upfront" | "milestone" | "completion"
      milestones?: Array<{
        description: string
        amount: number
        dueDate: Date
        completed: boolean
      }>
    }
    timeline: {
      startDate: Date
      endDate: Date
    }
  }
  progress: {
    completedDeliverables: number
    totalDeliverables: number
    percentageComplete: number
  }
  communications: Array<{
    senderId: mongoose.Types.ObjectId
    message: string
    timestamp: Date
    type: "message" | "milestone" | "deliverable" | "payment"
  }>
  createdAt: Date
  updatedAt: Date
}

const collaborationSchema = new Schema<ICollaboration>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    influencerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled", "disputed"],
      default: "active",
    },
    terms: {
      deliverables: [
        {
          type: { type: String, required: true },
          quantity: { type: Number, required: true },
          deadline: { type: Date, required: true },
          completed: { type: Boolean, default: false },
        },
      ],
      payment: {
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        schedule: {
          type: String,
          enum: ["upfront", "milestone", "completion"],
          default: "completion",
        },
        milestones: [
          {
            description: String,
            amount: Number,
            dueDate: Date,
            completed: { type: Boolean, default: false },
          },
        ],
      },
      timeline: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    },
    progress: {
      completedDeliverables: { type: Number, default: 0 },
      totalDeliverables: { type: Number, default: 0 },
      percentageComplete: { type: Number, default: 0 },
    },
    communications: [
      {
        senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        type: {
          type: String,
          enum: ["message", "milestone", "deliverable", "payment"],
          default: "message",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

collaborationSchema.index({ campaignId: 1, status: 1 })
collaborationSchema.index({ brandId: 1, status: 1 })
collaborationSchema.index({ influencerId: 1, status: 1 })

export default mongoose.models.Collaboration || mongoose.model<ICollaboration>("Collaboration", collaborationSchema)
