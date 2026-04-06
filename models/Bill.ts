import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBill extends Document {
  billNumber: string;
  projectId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  projectName: string;
  clientName: string;
  billDate: Date;
  sections: any[]; 
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  itemsCount: number;
  status: "Draft" | "Sent" | "Paid";
  createdAt: Date;
  updatedAt: Date;
}

const BillSchema = new Schema<IBill>(
  {
    billNumber: { 
      type: String, 
      required: true, 
      unique: true,
      index: true 
    },
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: "Project", 
      required: true 
    },
    companyId: { 
      type: Schema.Types.ObjectId, 
      ref: "Company", 
      required: true, 
      index: true 
    },
    projectName: { 
      type: String, 
      required: true 
    },
    clientName: { 
      type: String, 
      required: true 
    },
    billDate: { 
      type: Date, 
      required: true, 
      default: Date.now 
    },
    sections: { 
      type: Schema.Types.Mixed, 
      required: true 
    },
    subtotal: { 
      type: Number, 
      required: true 
    },
    gstAmount: { 
      type: Number, 
      required: true 
    },
    totalAmount: { 
      type: Number, 
      required: true 
    },
    itemsCount: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["Draft", "Sent", "Paid"], 
      default: "Sent" 
    }
  },
  { 
    timestamps: true 
  }
);

BillSchema.index({ companyId: 1, createdAt: -1 });

const Bill: Model<IBill> =
  mongoose.models.Bill || mongoose.model<IBill>("Bill", BillSchema);

export default Bill;
