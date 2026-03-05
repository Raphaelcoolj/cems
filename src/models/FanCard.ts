import mongoose, { Schema, model, models } from "mongoose";

const FanCardSchema = new Schema(
  {
    tier: { type: String, required: true, enum: ["Standard", "Beta", "Pro", "Elite"], unique: true },
    price: { type: Number, required: true },
    benefits: { type: [String], required: true },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const FanCard = models.FanCard || model("FanCard", FanCardSchema);
