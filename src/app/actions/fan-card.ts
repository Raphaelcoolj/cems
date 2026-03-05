"use server";

import connectDB from "@/lib/mongodb";
import { FanCard } from "@/models/FanCard";
import { revalidatePath } from "next/cache";

export async function updateFanCard(id: string, data: {
  price: number;
  benefits: string[];
  popular?: boolean;
}) {
  try {
    await connectDB();
    const updated = await FanCard.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/fan-cards");
    revalidatePath("/admin/fan-cards");
    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    console.error("Update fan card error:", error);
    throw new Error("Failed to update fan card");
  }
}

export async function getFanCards() {
  try {
    await connectDB();
    const cards = await FanCard.find().sort({ price: 1 });
    return JSON.parse(JSON.stringify(cards));
  } catch (error) {
    return [];
  }
}

export async function seedFanCards() {
  try {
    await connectDB();
    const count = await FanCard.countDocuments();
    if (count === 0) {
      const defaultCards = [
        { tier: "Standard", price: 49, benefits: ["Access to fan group", "Monthly newsletter", "Digital badge"] },
        { tier: "Beta", price: 99, benefits: ["All Standard benefits", "Exclusive live streams", "Priority chat access"] },
        { tier: "Pro", price: 199, benefits: ["All Beta benefits", "Exclusive merch discount", "Q&A participation"], popular: true },
        { tier: "Elite", price: 499, benefits: ["All Pro benefits", "1-on-1 video call", "Meet & Greet access", "Signed memorabilia"] },
      ];
      await FanCard.insertMany(defaultCards);
    }
    return { success: true };
  } catch (error) {
    console.error("Seed error:", error);
    return { success: false };
  }
}
