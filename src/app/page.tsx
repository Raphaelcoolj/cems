import { ArrowRight, Star, Users, Ticket, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-zinc-950">
      <header className="mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h1 className="text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          STAR-ACCESS
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          The ultimate cinematic platform for celebrity management and exclusive fan engagement.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { icon: Users, title: "Celebrities", desc: "Discover and connect with your favorite stars.", href: "/celebrities" },
          { icon: Ticket, title: "Fan Cards", desc: "Unlock exclusive tiers and benefits.", href: "/fan-cards" },
          { icon: MessageSquare, title: "Bookings", desc: "Inquire about appearances and engagements.", href: "/bookings" },
          { icon: Star, title: "Elite Access", desc: "Experience the pinnacle of fan engagement.", href: "/connect" },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="glass-morphism p-6 rounded-2xl flex flex-col items-center gap-4 hover:scale-105 transition-transform cursor-pointer group"
          >
            <item.icon className="w-12 h-12 text-zinc-200 group-hover:text-white transition-colors" />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-zinc-500 text-sm">{item.desc}</p>
          </Link>
        ))}
      </div>

      <button className="mt-12 group flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
        Enter the Spotlight
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
