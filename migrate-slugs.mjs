import connectDB from "./src/lib/mongodb";
import { Celebrity } from "./src/models/Celebrity";
import mongoose from "mongoose";

async function migrate() {
  await connectDB();
  const celebs = await Celebrity.find();
  
  for (const celeb of celebs) {
    // If slug is missing OR is a valid ObjectID (meaning it's not a name-slug)
    if (!celeb.slug || mongoose.Types.ObjectId.isValid(celeb.slug)) {
      const slug = celeb.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      
      celeb.slug = slug;
      await celeb.save();
      console.log(`Migrated ${celeb.name} -> ${slug}`);
    }
  }
  
  process.exit(0);
}

migrate();
