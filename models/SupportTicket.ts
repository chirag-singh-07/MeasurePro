import mongoose, { Schema, model, Document } from "mongoose";

export interface ISupportTicket extends Document {
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: "bug" | "feature-request" | "general-inquiry" | "billing";
  createdBy: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  responses: {
    message: string;
    sentBy: mongoose.Types.ObjectId;
    senderName: string;
    createdAt: Date;
  }[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: String,
      enum: ["bug", "feature-request", "general-inquiry", "billing"],
      default: "general-inquiry",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    responses: [
      {
        message: {
          type: String,
          required: true,
        },
        sentBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        senderName: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    attachments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
SupportTicketSchema.index({ companyId: 1, createdAt: -1 });
SupportTicketSchema.index({ companyId: 1, status: 1 });
SupportTicketSchema.index({ createdBy: 1, companyId: 1 });

export default mongoose.models.SupportTicket ||
  model<ISupportTicket>("SupportTicket", SupportTicketSchema);
