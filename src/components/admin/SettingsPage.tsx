"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Send, Globe, Save, Loader2, Check } from "lucide-react";
import { updateSettings } from "@/app/actions/settings";

export default function AdminSettingsPage({ initialSettings }: { initialSettings: any }) {
  const [formData, setFormData] = useState({
    adminTelegramLink: initialSettings?.adminTelegramLink || "",
    btcAddress: initialSettings?.btcAddress || "",
    siteTitle: initialSettings?.siteTitle || "",
    siteDescription: initialSettings?.siteDescription || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSettings(formData);
      alert("Settings updated successfully!");
    } catch (err) {
      alert("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-white mb-2">Settings</h1>
          <p className="text-zinc-500">Configure your platform's core details</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="glass-morphism p-10 rounded-[2.5rem] border border-white/5 cinematic-shadow space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Send className="w-5 h-5 text-blue-500" /> Management Link
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Admin Telegram Link</label>
              <input
                type="url"
                value={formData.adminTelegramLink}
                onChange={(e) => setFormData({ ...formData, adminTelegramLink: e.target.value })}
                placeholder="https://t.me/your_admin_link"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
                required
              />
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">This link is used on the "Connect" page for users to message you.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">BTC Address</label>
              <input
                type="text"
                value={formData.btcAddress}
                onChange={(e) => setFormData({ ...formData, btcAddress: e.target.value })}
                placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
                required
              />
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">This address will be displayed to fans during the payment process.</p>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full" />

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-500" /> Site Information
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Site Title</label>
                <input
                  type="text"
                  value={formData.siteTitle}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  placeholder="Star-access"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Site Description</label>
                <textarea
                  rows={3}
                  value={formData.siteDescription}
                  onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                  placeholder="Celebrity Management..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white leading-relaxed"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Site Settings
          </button>
        </form>
      </div>
    </div>
  );
}
