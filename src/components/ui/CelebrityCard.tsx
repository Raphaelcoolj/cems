import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CelebrityCardProps {
  name: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export default function CelebrityCard({ name, category, imageUrl, slug }: CelebrityCardProps) {
  return (
    <Link href={`/celebrities/${slug}`} className="group relative overflow-hidden rounded-3xl cinematic-shadow bg-zinc-900 border border-white/5 block">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">{category}</div>
        <h3 className="text-2xl font-black text-white mb-4">{name}</h3>
        
        <div className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
          View Profile
          <span className="w-8 h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>
      </div>
    </Link>
  );
}
