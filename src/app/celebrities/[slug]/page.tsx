import { getCelebrityBySlug } from "@/app/actions/celebrity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ArrowLeft, Calendar, MessageSquare, ShieldCheck, User, Award, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CelebrityProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const celebrity = await getCelebrityBySlug(slug);

  if (!celebrity) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <Link
          href="/celebrities"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all Stars
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 cinematic-shadow group">
              <img
                src={celebrity.imageUrl || "/placeholder-star.png"}
                alt={celebrity.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  Executive Managed
                </div>
              </div>
            </div>

            <div className="glass-morphism p-6 rounded-3xl border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Verified Profile</div>
                <div className="text-zinc-500 text-xs mt-0.5">Direct Management Channel</div>
              </div>
            </div>
          </div>

          {/* Right Column: Info Grid */}
          <div className="lg:col-span-7 space-y-12">
            {/* Header */}
            <div>
              <div className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
                <Star className="w-3 h-3 text-white" />
                {celebrity.category}
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                {celebrity.name}
              </h1>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-morphism p-6 rounded-3xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-zinc-500">
                  <User className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Age</span>
                </div>
                <div className="text-2xl font-black">{celebrity.age || "N/A"}</div>
              </div>
              <div className="glass-morphism p-6 rounded-3xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Award className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Known For</span>
                </div>
                <div className="text-xl font-black truncate">{celebrity.knownFor || "Various Works"}</div>
              </div>
            </div>

            {/* Biography Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-zinc-400">
                <Info className="w-5 h-5" />
                <h2 className="text-lg font-black uppercase tracking-tighter">Biography</h2>
              </div>
              <div className="text-zinc-400 text-lg leading-relaxed font-medium bg-white/5 p-8 rounded-[2rem] border border-white/5">
                {celebrity.bio}
              </div>
            </div>

            {/* CTA Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <Link
                href="/bookings"
                className="group relative overflow-hidden bg-white text-black px-8 py-5 rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all"
              >
                Book Appearance
                <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Link>
              <Link
                href="/fan-cards"
                className="group border border-white/10 bg-white/5 text-white px-8 py-5 rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
              >
                Access Fan Card
                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Link>
            </div>

            {/* Metadata Footer */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 text-zinc-500">
                <ShieldCheck className="w-5 h-5" />
                <div className="text-[10px] font-black uppercase tracking-[0.1em]">Exclusive Partner</div>
              </div>
              <div className="flex items-center gap-3 text-zinc-500">
                <Calendar className="w-5 h-5" />
                <div className="text-[10px] font-black uppercase tracking-[0.1em]">2026 Availability Open</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
