"use client";

import { useState } from "react";
import { Send, Loader2, Check } from "lucide-react";
import { createInquiry } from "@/app/actions/inquiry";

export default function InquiryForm({ 
  celebrities, 
  tiers 
}: { 
  celebrities: any[], 
  tiers: any[] 
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    celebrityId: "",
    tierId: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInquiry({
        ...formData,
        tierId: formData.tierId || undefined
      });
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        celebrityId: "",
        tierId: "",
        message: ""
      });
    } catch (err) {
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-white">Inquiry Received</h2>
          <p className="text-zinc-500">Our management team will contact you shortly.</p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="text-white font-bold underline underline-offset-4 hover:text-zinc-300 transition-colors"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Select Celebrity</label>
          <select 
            value={formData.celebrityId}
            onChange={(e) => setFormData({ ...formData, celebrityId: e.target.value })}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white cursor-pointer"
            required
          >
            <option value="" className="bg-zinc-900 text-white">Choose a star</option>
            {celebrities.map((celeb: any) => (
              <option key={celeb._id} value={celeb._id} className="bg-zinc-900 text-white">{celeb.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Fan Tier (Optional)</label>
          <select 
            value={formData.tierId}
            onChange={(e) => setFormData({ ...formData, tierId: e.target.value })}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white cursor-pointer"
          >
            <option value="" className="bg-zinc-900 text-white">Select a tier</option>
            {tiers.map((tier: any) => (
              <option key={tier._id} value={tier._id} className="bg-zinc-900 text-white">{tier.tier}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Message / Inquiry Details</label>
        <textarea 
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your request..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
          required
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
          <>
            Submit Inquiry
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
