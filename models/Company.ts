import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompany extends Document {
  name: string;
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

const Company: Model<ICompany> =
  mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);

export default Company;
