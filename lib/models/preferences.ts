import mongoose from "mongoose"

const preferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      campaignUpdates: {
        type: Boolean,
        default: true,
      },
      newMessages: {
        type: Boolean,
        default: true,
      },
      applicationStatus: {
        type: Boolean,
        default: true,
      },
      paymentAlerts: {
        type: Boolean,
        default: true,
      },
      marketingEmails: {
        type: Boolean,
        default: false,
      },
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ["public", "private", "brands-only"],
        default: "public",
      },
      showEarnings: {
        type: Boolean,
        default: false,
      },
      showAnalytics: {
        type: Boolean,
        default: true,
      },
      allowDirectMessages: {
        type: Boolean,
        default: true,
      },
      allowCampaignInvitations: {
        type: Boolean,
        default: true,
      },
    },
    communication: {
      preferredLanguage: {
        type: String,
        default: "en",
      },
      timezone: {
        type: String,
        default: "UTC",
      },
      availableHours: {
        start: {
          type: String,
          default: "09:00",
        },
        end: {
          type: String,
          default: "18:00",
        },
      },
      autoReply: {
        enabled: {
          type: Boolean,
          default: false,
        },
        message: {
          type: String,
          default: "Thank you for your message. I'll get back to you soon!",
        },
      },
    },
    content: {
      preferredNiches: [
        {
          type: String,
        },
      ],
      excludedBrands: [
        {
          type: String,
        },
      ],
      minimumBudget: {
        type: Number,
        default: 0,
      },
      preferredCampaignTypes: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)

const Preferences = mongoose.models.Preferences || mongoose.model("Preferences", preferencesSchema)

export default Preferences
