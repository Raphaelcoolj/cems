import mongoose, { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    adminTelegramLink: { type: String, default: "https://t.me/admin" },
    btcAddress: { type: String, default: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
    siteTitle: { type: String, default: "Star-access" },
    siteDescription: { type: String, default: "Celebrity Management & Fan Engagement" },
  },
  { timestamps: true }
);

export const Settings = models.Settings || model("Settings", SettingsSchema);
