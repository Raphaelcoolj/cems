"use server";

import cloudinary from "@/lib/cloudinary";

export async function uploadImage(fileString: string) {
  try {
    const res = await cloudinary.uploader.upload(fileString, {
      folder: "star-access",
    });
    return {
      url: res.secure_url,
      publicId: res.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
}

export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image");
  }
}
