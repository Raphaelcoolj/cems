import mongoose, { Schema, model, models } from "mongoose";

const CelebritySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: ["Musician", "Actor", "Athlete", "Influencer", "Other"] },
    bio: { type: String, required: true },
    age: { type: Number },
    knownFor: { type: String }, // e.g. "Songs", "Movies"
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Celebrity = models.Celebrity || model("Celebrity", CelebritySchema);
