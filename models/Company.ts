import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompany extends Document {
  name: string;
  owner?: mongoose.Types.ObjectId;
  subscriptionPlan: "Basic" | "Pro" | "Enterprise";
  stripeCustomerId?: string;
  projectLimit: number;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subscriptionPlan: {
      type: String,
      enum: ["Basic", "Pro", "Enterprise"],
      default: "Basic",
    },
    stripeCustomerId: {
      type: String,
    },
    projectLimit: {
      type: Number,
      default: 5, // Basic plan limit
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Create indexes for faster queries
CompanySchema.index({ owner: 1 }); // Find companies by owner
CompanySchema.index({ subscriptionPlan: 1 }); // Find companies by subscription plan
CompanySchema.index({ createdAt: -1 }); // Sort by creation date
CompanySchema.index({ stripeCustomerId: 1 }); // Find companies by Stripe ID

const Company: Model<ICompany> =
  mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);

export default Company;
