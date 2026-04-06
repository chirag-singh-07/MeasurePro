import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  userId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  subject: string;
  description: string;
  status: "Open" | "In-Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  category: "Technical" | "Billing" | "Feature-Request" | "Other";
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "In-Progress", "Resolved", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: ["Technical", "Billing", "Feature-Request", "Other"],
      default: "Technical",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema);
