import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItem extends Document {
  sectionId: mongoose.Types.ObjectId;
  description: string;
  uom: string; // Unit of Measurement
  size: number;
  qty: number;
  rate: number;
  amount: number; // Auto-calculated: (size * qty) * rate
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<IItem>(
  {
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    uom: {
      type: String,
      required: [true, "Unit of measurement is required"],
      default: "Nos",
    },
    size: {
      type: Number,
      required: true,
      default: 1,
    },
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
    rate: {
      type: Number,
      required: true,
      default: 0,
    },
    amount: {
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

// Auto-calculate amount before saving
ItemSchema.pre("save", function (next) {
  this.amount = this.size * this.qty * this.rate;
  next();
});

// Index for faster queries
ItemSchema.index({ sectionId: 1, order: 1 });

const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);

export default Item;
