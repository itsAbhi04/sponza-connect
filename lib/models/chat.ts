import { Schema, model, models } from "mongoose"

export interface IMessage {
  sender: string
  content: string
  timestamp: Date
  attachments?: string[]
}

export interface IChat {
  _id: string
  conversationId: string
  participants: string[]
  messages: IMessage[]
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  attachments: [
    {
      type: String,
      validate: {
        validator: (v: string) => /^https?:\/\/.+/.test(v),
        message: "Attachments must be valid URLs",
      },
    },
  ],
})

const chatSchema = new Schema<IChat>(
  {
    conversationId: {
      type: String,
      required: true,
      unique: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [messageSchema],
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
chatSchema.index({ conversationId: 1 })
chatSchema.index({ participants: 1 })
chatSchema.index({ "messages.timestamp": -1 })

// Validate that there are exactly 2 participants
chatSchema.pre("save", function () {
  if (this.participants.length !== 2) {
    throw new Error("Chat must have exactly 2 participants")
  }
})

export const Chat = models.Chat || model<IChat>("Chat", chatSchema)
