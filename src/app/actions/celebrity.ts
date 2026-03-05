"use server";

import connectDB from "@/lib/mongodb";
import { Celebrity } from "@/models/Celebrity";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export async function createCelebrity(data: {
  name: string;
  slug: string;
  category: string;
  bio: string;
  age?: number;
  knownFor?: string;
  imageUrl: string;
  cloudinaryId: string;
}) {
  try {
    await connectDB();
    const newCeleb = await Celebrity.create(data);
    revalidatePath("/celebrities");
    revalidatePath("/admin/celebrities");
    return JSON.parse(JSON.stringify(newCeleb));
  } catch (error) {
    console.error("Create celebrity error:", error);
    throw new Error("Failed to create celebrity");
  }
}

export async function updateCelebrity(id: string, data: any) {
  try {
    await connectDB();
    const updated = await Celebrity.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/celebrities");
    revalidatePath(`/celebrities/${updated.slug}`);
    revalidatePath("/admin/celebrities");
    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    console.error("Update celebrity error:", error);
    throw new Error("Failed to update celebrity");
  }
}

export async function deleteCelebrity(id: string) {
  try {
    await connectDB();
    const celeb = await Celebrity.findById(id);
    await Celebrity.findByIdAndDelete(id);
    revalidatePath("/celebrities");
    if (celeb) revalidatePath(`/celebrities/${celeb.slug}`);
    revalidatePath("/admin/celebrities");
    return { success: true };
  } catch (error) {
    console.error("Delete celebrity error:", error);
    throw new Error("Failed to delete celebrity");
  }
}

export async function getCelebrityBySlug(slug: string) {
  try {
    await connectDB();
    // Try to find by slug first, then by ID as fallback
    let celeb = await Celebrity.findOne({ slug });
    
    if (!celeb && mongoose.Types.ObjectId.isValid(slug)) {
      celeb = await Celebrity.findById(slug);
    }
    
    return JSON.parse(JSON.stringify(celeb));
  } catch (error) {
    console.error("Error fetching celebrity:", error);
    return null;
  }
}

// Alias for backwards compatibility
export const getCelebrityById = getCelebrityBySlug;
