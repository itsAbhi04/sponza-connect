import mongoose, { Schema, type Document } from "mongoose"

export interface ICollaboration extends Document {
  campaignId: mongoose.Types.ObjectId
  brandId: mongoose.Types.ObjectId
  influencerId: mongoose.Types.ObjectId
  status: "pending" | "active" | "completed" | "cancelled"
  terms: {
    budget: number
    deliverables: Array<{
      type: string
      description: string
      quantity: number
      platform: string
    }>
    timeline: {
      startDate: Date
      endDate: Date
    }
    paymentTerms: string
  }
  progress: {
    contentSubmitted: number
    contentApproved: number
    totalDeliverables: number
    completionPercentage: number
  }
  payments: Array<{
    amount: number
    status: "pending" | "completed" | "failed"
    dueDate: Date
    paidAt?: Date
    paymentId?: string
  }>
  communications: Array<{
    from: mongoose.Types.ObjectId
    message: string
    timestamp: Date
    type: "message" | "revision_request" | "approval" | "rejection"
  }>
  createdAt: Date
  updatedAt: Date
}

const CollaborationSchema = new Schema<ICollaboration>(
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
    status: {
      type: String,
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },
    terms: {
      budget: {
        type: Number,
        required: true,
        min: 0,
      },
      deliverables: [
        {
          type: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
          platform: {
            type: String,
            required: true,
          },
        },
      ],
      timeline: {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
      paymentTerms: {
        type: String,
        required: true,
      },
    },
    progress: {
      contentSubmitted: {
        type: Number,
        default: 0,
      },
      contentApproved: {
        type: Number,
        default: 0,
      },
      totalDeliverables: {
        type: Number,
        default: 0,
      },
      completionPercentage: {
        type: Number,
        default: 0,
      },
    },
    payments: [
      {
        amount: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "completed", "failed"],
          default: "pending",
        },
        dueDate: {
          type: Date,
          required: true,
        },
        paidAt: {
          type: Date,
        },
        paymentId: {
          type: String,
        },
      },
    ],
    communications: [
      {
        from: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        type: {
          type: String,
          enum: ["message", "revision_request", "approval", "rejection"],
          default: "message",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

CollaborationSchema.index({ campaignId: 1 })
CollaborationSchema.index({ brandId: 1, status: 1 })
CollaborationSchema.index({ influencerId: 1, status: 1 })

export default mongoose.models.Collaboration || mongoose.model<ICollaboration>("Collaboration", CollaborationSchema)
