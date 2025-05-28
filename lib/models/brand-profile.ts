import { Schema, model, models } from "mongoose"

export interface IBrandProfile {
  _id: string
  userId: string
  companyName: string
  website?: string
  industry: string
  contactInfo: {
    phone?: string
    address?: string
    contactEmail?: string
  }
  campaignHistory: string[]
  createdAt: Date
  updatedAt: Date
}

const brandProfileSchema = new Schema<IBrandProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) => !v || /^https?:\/\/.+/.test(v),
        message: "Website must be a valid URL",
      },
    },
    industry: {
      type: String,
      required: true,
      enum: [
        "Fashion",
        "Beauty",
        "Technology",
        "Lifestyle",
        "Food & Beverage",
        "Travel",
        "Fitness",
        "Gaming",
        "Education",
        "Finance",
        "Healthcare",
        "Automotive",
        "Real Estate",
        "Entertainment",
        "Other",
      ],
    },
    contactInfo: {
      phone: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
        maxlength: 500,
      },
      contactEmail: {
        type: String,
        trim: true,
        lowercase: true,
      },
    },
    campaignHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
brandProfileSchema.index({ userId: 1 })
brandProfileSchema.index({ industry: 1 })
brandProfileSchema.index({ companyName: 1 })

export const BrandProfile = models.BrandProfile || model<IBrandProfile>("BrandProfile", brandProfileSchema)
