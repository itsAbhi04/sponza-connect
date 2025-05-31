import mongoose from "mongoose"

const invitationSchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      default: null,
    },
    message: {
      type: String,
      default: "",
    },
    customTerms: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "expired"],
      default: "pending",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    respondedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    response: {
      message: String,
      pricing: Number,
      timeline: String,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
invitationSchema.index({ brandId: 1, status: 1 })
invitationSchema.index({ influencerId: 1, status: 1 })
invitationSchema.index({ expiresAt: 1 })

const Invitation = mongoose.models.Invitation || mongoose.model("Invitation", invitationSchema)

export default Invitation
