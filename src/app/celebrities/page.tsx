import CelebrityCard from "@/components/ui/CelebrityCard";
import connectDB from "@/lib/mongodb";
import { Celebrity } from "@/models/Celebrity";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getCelebrities(page = 1, limit = 8, category?: string) {
  await connectDB();
  const query = category && category !== "All" ? { category } : {};
  const total = await Celebrity.countDocuments(query);
  const celebs = await Celebrity.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  
  return {
    celebs,
    totalPages: Math.ceil(total / limit),
  };
}

export default async function CelebritiesPage({
  searchParams,
}: {
  searchParams: any; // Using any to handle potential promise in Next 15
}) {
  // Safe way to handle both Next 14 and Next 15 searchParams
  const sp = await searchParams;
  const page = Number(sp?.page) || 1;
  const category = sp?.category || "All";
  const { celebs, totalPages } = await getCelebrities(page, 8, category);

  const categories = ["All", "Musician", "Actor", "Athlete", "Influencer"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Our Stars</h1>
          <p className="text-zinc-500">Discover the icons that shape our culture.</p>
        </div>
        
        <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 gap-2 p-1 glass-morphism rounded-full">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/celebrities?category=${cat}`}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                category === cat ? "bg-white text-black" : "text-zinc-500 hover:text-white"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {celebs.map((celeb: any) => {
          const celebritySlug = celeb.slug || (celeb._id ? celeb._id.toString() : "");
          return (
            <CelebrityCard
              key={celebritySlug || celeb.name}
              slug={celebritySlug}
              name={celeb.name}
              category={celeb.category}
              imageUrl={celeb.imageUrl}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-20 flex justify-center gap-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/celebrities?page=${i + 1}&category=${category}`}
              className={`w-12 h-12 flex items-center justify-center rounded-full font-bold border transition-all ${
                page === i + 1 ? "bg-white text-black border-white" : "text-zinc-500 border-white/10 hover:border-white/30"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
