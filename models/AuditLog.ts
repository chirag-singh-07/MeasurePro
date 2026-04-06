import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  event: string;
  ipAddress: string;
  status: "success" | "blocked" | "pending" | "alert" | "failed";
  severity: "low" | "medium" | "high" | "critical";
  companyId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    event: { type: String, required: true },
    ipAddress: { type: String, default: "SYSTEM" },
    status: {
      type: String,
      enum: ["success", "blocked", "pending", "alert", "failed"],
      default: "success",
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
