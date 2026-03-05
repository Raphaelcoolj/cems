"use server";

import connectDB from "@/lib/mongodb";
import { Settings } from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function updateSettings(data: {
  adminTelegramLink?: string;
  btcAddress?: string;
  siteTitle?: string;
  siteDescription?: string;
}) {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(data);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, data, { new: true });
    }
    revalidatePath("/connect");
    revalidatePath("/admin/settings");
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Update settings error:", error);
    throw new Error("Failed to update settings");
  }
}

export async function getSettings() {
  try {
    await connectDB();
    const settings = await Settings.findOne() || await Settings.create({});
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    return null;
  }
}
