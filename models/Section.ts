import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISection extends Document {
  title: string;
  projectId: mongoose.Types.ObjectId;
  totalAmount: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
  {
    title: {
      type: String,
      required: [true, "Section title is required"],
      trim: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
SectionSchema.index({ projectId: 1, order: 1 });

const Section: Model<ISection> =
  mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema);

export default Section;
