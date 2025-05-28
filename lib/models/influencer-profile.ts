import { Schema, model, models } from "mongoose"

export interface ISocialMediaStat {
  platform: string
  followers: number
  engagementRate: number
  username: string
}

export interface IPricingStructure {
  service: string
  price: number
  description?: string
}

export interface IReview {
  rating: number
  comment: string
  reviewerId: string
  campaignId?: string
  createdAt: Date
}

export interface IInfluencerProfile {
  _id: string
  userId: string
  bio: string
  location: string
  niche: string[]
  socialMediaStats: ISocialMediaStat[]
  pricingStructure: IPricingStructure[]
  availabilityStatus: "available" | "busy" | "unavailable"
  ratings: IReview[]
  portfolio: string[]
  averageRating: number
  totalReviews: number
  createdAt: Date
  updatedAt: Date
}

const socialMediaStatSchema = new Schema<ISocialMediaStat>({
  platform: {
    type: String,
    required: true,
    enum: ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"],
  },
  followers: {
    type: Number,
    required: true,
    min: 0,
  },
  engagementRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
})

const pricingStructureSchema = new Schema<IPricingStructure>({
  service: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
})

const reviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    },
  },
  {
    timestamps: true,
  },
)

const influencerProfileSchema = new Schema<IInfluencerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 500,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    niche: [
      {
        type: String,
        required: true,
        enum: [
          "Fashion",
          "Beauty",
          "Technology",
          "Lifestyle",
          "Food",
          "Travel",
          "Fitness",
          "Gaming",
          "Education",
          "Business",
        ],
      },
    ],
    socialMediaStats: [socialMediaStatSchema],
    pricingStructure: [pricingStructureSchema],
    availabilityStatus: {
      type: String,
      enum: ["available", "busy", "unavailable"],
      default: "available",
    },
    ratings: [reviewSchema],
    portfolio: [
      {
        type: String,
        validate: {
          validator: (v: string) => /^https?:\/\/.+/.test(v),
          message: "Portfolio items must be valid URLs",
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
influencerProfileSchema.index({ userId: 1 })
influencerProfileSchema.index({ niche: 1 })
influencerProfileSchema.index({ availabilityStatus: 1 })
influencerProfileSchema.index({ averageRating: -1 })
influencerProfileSchema.index({ "socialMediaStats.platform": 1 })
influencerProfileSchema.index({ "socialMediaStats.followers": -1 })

// Calculate average rating before saving
influencerProfileSchema.pre("save", function () {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, review) => acc + review.rating, 0)
    this.averageRating = sum / this.ratings.length
    this.totalReviews = this.ratings.length
  }
})

export const InfluencerProfile =
  models.InfluencerProfile || model<IInfluencerProfile>("InfluencerProfile", influencerProfileSchema)
