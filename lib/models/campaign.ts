import { Schema, model, models } from "mongoose"

export interface IDeliverable {
  type: string
  description: string
  quantity: number
  platform: string
}

export interface ICampaign {
  _id: string
  brandId: string
  title: string
  description: string
  targetPlatforms: string[]
  budget: number
  deliverables: IDeliverable[]
  timeline: {
    startDate: Date
    endDate: Date
  }
  status: "draft" | "published" | "in-progress" | "completed" | "archived"
  requirements: string[]
  targetAudience: {
    ageRange: string
    gender: string
    location: string[]
    interests: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const deliverableSchema = new Schema<IDeliverable>({
  type: {
    type: String,
    required: true,
    enum: ["Post", "Story", "Reel", "Video", "Blog", "Review"],
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  platform: {
    type: String,
    required: true,
    enum: ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook", "Blog"],
  },
})

const campaignSchema = new Schema<ICampaign>(
  {
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    targetPlatforms: [
      {
        type: String,
        enum: ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"],
      },
    ],
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    deliverables: [deliverableSchema],
    timeline: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (this: ICampaign, endDate: Date) {
            return endDate > this.timeline.startDate
          },
          message: "End date must be after start date",
        },
      },
    },
    status: {
      type: String,
      enum: ["draft", "published", "in-progress", "completed", "archived"],
      default: "draft",
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    targetAudience: {
      ageRange: {
        type: String,
        enum: ["18-24", "25-34", "35-44", "45-54", "55+", "All Ages"],
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "All", "Non-binary"],
      },
      location: [
        {
          type: String,
          trim: true,
        },
      ],
      interests: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
campaignSchema.index({ brandId: 1 })
campaignSchema.index({ status: 1 })
campaignSchema.index({ targetPlatforms: 1 })
campaignSchema.index({ budget: -1 })
campaignSchema.index({ "timeline.startDate": 1 })
campaignSchema.index({ "timeline.endDate": 1 })

export const Campaign = models.Campaign || model<ICampaign>("Campaign", campaignSchema)
