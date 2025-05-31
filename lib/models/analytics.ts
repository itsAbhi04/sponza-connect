import mongoose from "mongoose"

const analyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    period: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    metrics: {
      profileViews: {
        type: Number,
        default: 0,
      },
      followerGrowth: {
        type: Number,
        default: 0,
      },
      engagementRate: {
        type: Number,
        default: 0,
      },
      impressions: {
        type: Number,
        default: 0,
      },
      reach: {
        type: Number,
        default: 0,
      },
      clicks: {
        type: Number,
        default: 0,
      },
      saves: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
    platformBreakdown: [
      {
        platform: {
          type: String,
          required: true,
        },
        followers: {
          type: Number,
          default: 0,
        },
        engagement: {
          type: Number,
          default: 0,
        },
        posts: {
          type: Number,
          default: 0,
        },
        reach: {
          type: Number,
          default: 0,
        },
      },
    ],
    campaignMetrics: {
      totalCampaigns: {
        type: Number,
        default: 0,
      },
      completedCampaigns: {
        type: Number,
        default: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
      },
      averageRating: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Create compound index for efficient queries
analyticsSchema.index({ userId: 1, period: 1, date: -1 })

const Analytics = mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema)

export default Analytics
