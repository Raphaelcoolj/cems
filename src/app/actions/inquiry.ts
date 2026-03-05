"use server";

import connectDB from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import { Celebrity } from "@/models/Celebrity";
import { FanCard } from "@/models/FanCard";
import { revalidatePath } from "next/cache";

export async function createInquiry(data: {
  name: string;
  email: string;
  celebrityId: string;
  tierId?: string;
  message: string;
}) {
  try {
    await connectDB();
    const newInquiry = await Inquiry.create(data);
    revalidatePath("/admin/inquiries");
    return JSON.parse(JSON.stringify(newInquiry));
  } catch (error) {
    console.error("Create inquiry error:", error);
    throw new Error("Failed to submit inquiry");
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    await connectDB();
    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/dashboard");
    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    console.error("Update inquiry error:", error);
    throw new Error("Failed to update status");
  }
}

export async function getInquiries() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find()
      .populate("celebrityId", "name")
      .populate("tierId", "tier")
      .sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(inquiries));
  } catch (error) {
    return [];
  }
}
