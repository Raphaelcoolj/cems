import mongoose, { Schema, model, models } from "mongoose";
import "./Celebrity";
import "./FanCard";

const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    celebrityId: { type: Schema.Types.ObjectId, ref: "Celebrity", required: true },
    tierId: { type: Schema.Types.ObjectId, ref: "FanCard", required: true },
    message: { type: String },
    status: { type: String, enum: ["Pending", "Reviewed", "Contacted", "Closed"], default: "Pending" },
  },
  { timestamps: true }
);

export const Inquiry = models.Inquiry || model("Inquiry", InquirySchema);
