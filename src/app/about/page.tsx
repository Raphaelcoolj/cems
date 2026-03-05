import { Star, Shield, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  const features = [
    { icon: Star, title: "Elite Management", desc: "We represent the world's most influential icons with precision and vision." },
    { icon: Shield, title: "Secure Access", desc: "Privacy and security are at the core of every fan engagement we facilitate." },
    { icon: Zap, title: "Dynamic Engagement", desc: "Breaking the barrier between stars and fans through innovative technology." },
    { icon: Globe, title: "Global Reach", desc: "A cinematic platform designed for a worldwide audience of dedicated supporters." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-6 leading-none">
            Defining the <span className="bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent">Future</span> of Fame
          </h1>
          <p className="text-zinc-400 text-xl mb-8 leading-relaxed">
            Star-access is more than a platform; it's a bridge. We specialize in creating high-impact, cinematic experiences that bring fans closer to their idols than ever before.
          </p>
          <div className="flex gap-4">
            <div className="p-4 glass-morphism rounded-2xl">
              <div className="text-3xl font-black mb-1">100+</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Global Icons</div>
            </div>
            <div className="p-4 glass-morphism rounded-2xl">
              <div className="text-3xl font-black mb-1">1M+</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Fan Engagements</div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-zinc-900 to-black rounded-[4rem] group overflow-hidden border border-white/10 flex items-center justify-center cinematic-shadow">
            <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500 group-hover:scale-110">
                <Star className="w-16 h-16 text-white fill-white group-hover:rotate-12 transition-transform duration-700" />
              </div>
              <div className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px]">Elite Access Platform</div>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-12 bg-white/5 rounded-full blur-2xl opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="p-8 glass-morphism rounded-3xl border border-white/5">
            <feature.icon className="w-10 h-10 text-white mb-6" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-tighter">{feature.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
