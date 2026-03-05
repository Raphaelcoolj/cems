import connectDB from "@/lib/mongodb";
import { Settings } from "@/models/Settings";
import { Send, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

async function getSettings() {
  await connectDB();
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      adminTelegramLink: "https://t.me/admin",
    });
  }
  return settings;
}

export default async function ConnectPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="glass-morphism p-12 rounded-[3rem] border border-white/10 cinematic-shadow max-w-2xl">
        <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          <Send className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-6">Direct Connection</h1>
        <p className="text-zinc-400 text-lg mb-10">
          Need immediate assistance or have a specific business proposal? Connect directly with our management team on Telegram.
        </p>
        
        <a 
          href={settings.adminTelegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#24A1DE] text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
        >
          Message on Telegram
          <ExternalLink className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
