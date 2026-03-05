import { getCelebrityById } from "@/app/actions/celebrity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ArrowLeft, Calendar, MessageSquare, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CelebrityProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const celebrity = await getCelebrityById(params.id);

  if (!celebrity) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={celebrity.imageUrl} 
          alt={celebrity.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto w-full">
          <Link 
            href="/celebrities"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Stars
          </Link>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-300">
                {celebrity.category}
              </span>
              {celebrity.age && (
                <span className="text-zinc-500 font-medium text-sm">• {celebrity.age} Years Old</span>
              )}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              {celebrity.name}
            </h1>
            {celebrity.knownFor && (
              <p className="text-xl md:text-2xl text-zinc-400 font-medium tracking-tight max-w-2xl italic">
                Known for: {celebrity.knownFor}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-white" />
              Biography
            </h2>
            <div className="text-zinc-400 text-lg leading-relaxed whitespace-pre-wrap font-medium">
              {celebrity.bio}
            </div>
          </section>

          <section className="p-8 rounded-3xl glass-morphism border border-white/5 space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              Verified Representation
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Star-access is the exclusive management partner for {celebrity.name}. All inquiries, bookings, and fan engagements are handled directly through our secure platform to ensure the highest level of professional excellence and icon security.
            </p>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/10 cinematic-shadow flex flex-col gap-8">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Engagement</div>
                <div className="text-3xl font-black uppercase">Elite Access</div>
              </div>

              <div className="space-y-4">
                <Link 
                  href="/bookings"
                  className="w-full py-4 bg-white text-black rounded-2xl font-black text-center block hover:bg-zinc-200 transition-colors"
                >
                  Book Appearance
                </Link>
                <Link 
                  href="/fan-cards"
                  className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-center block hover:bg-white/10 transition-colors"
                >
                  Get Fan Card
                </Link>
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Calendar className="w-5 h-5" />
                  <span>Availability: 2026 Season</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <MessageSquare className="w-5 h-5" />
                  <span>Response Time: &lt; 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
