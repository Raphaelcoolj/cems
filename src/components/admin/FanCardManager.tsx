"use client";

import { useState } from "react";
import { Check, Star, Plus, Minus, Loader2, Save, Eye, EyeOff } from "lucide-react";
import { updateFanCard } from "@/app/actions/fan-card";
import { motion, AnimatePresence } from "framer-motion";
import FanCardUI from "../ui/FanCardUI";

export default function FanCardManager({ initialCards }: { initialCards: any[] }) {
  const [cards, setCards] = useState(initialCards);
  const [loading, setLoading] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePriceChange = (id: string, price: string) => {
    setCards(cards.map(c => c._id === id ? { ...c, price: Number(price) } : c));
  };

  const handleBenefitChange = (cardId: string, index: number, value: string) => {
    const updatedCards = cards.map(c => {
      if (c._id === cardId) {
        const newBenefits = [...c.benefits];
        newBenefits[index] = value;
        return { ...c, benefits: newBenefits };
      }
      return c;
    });
    setCards(updatedCards);
  };

  const addBenefit = (cardId: string) => {
    setCards(cards.map(c => c._id === cardId ? { ...c, benefits: [...c.benefits, ""] } : c));
  };

  const removeBenefit = (cardId: string, index: number) => {
    setCards(cards.map(c => {
      if (c._id === cardId) {
        const newBenefits = c.benefits.filter((_: any, i: number) => i !== index);
        return { ...c, benefits: newBenefits };
      }
      return c;
    }));
  };

  const togglePopular = (cardId: string) => {
    setCards(cards.map(c => c._id === cardId ? { ...c, popular: !c.popular } : c));
  };

  const handleSave = async (card: any) => {
    setLoading(card._id);
    try {
      await updateFanCard(card._id, {
        price: card.price,
        benefits: card.benefits,
        popular: card.popular
      });
      alert(`${card.tier} Tier saved successfully!`);
    } catch (err) {
      alert("Failed to save changes");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-white mb-2">Fan Card Manager</h1>
          <p className="text-zinc-500">Update pricing tiers and fan benefits in real-time</p>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            showPreview ? "bg-amber-500 text-black" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          {showPreview ? "Hide Preview" : "Live Preview"}
        </button>
      </div>

      <AnimatePresence>
        {showPreview && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-zinc-900/50 p-12 rounded-[3rem] border border-white/5 mb-12">
              <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-12">Live Preview Area</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card) => (
                  <FanCardUI key={card._id} {...card} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cards.map((card) => (
          <div key={card._id} className="glass-morphism p-8 rounded-[2.5rem] border border-white/5 cinematic-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Star className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{card.tier} Tier</h3>
              </div>
              <button
                onClick={() => handleSave(card)}
                disabled={loading === card._id}
                className="bg-white text-black px-5 py-2 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {loading === card._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Price ($)</label>
                  <input
                    type="number"
                    value={card.price}
                    onChange={(e) => handlePriceChange(card._id, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Popular Toggle</label>
                  <button
                    onClick={() => togglePopular(card._id)}
                    className={`w-full py-3 rounded-xl border font-bold text-sm transition-all ${
                      card.popular ? "bg-amber-500/10 border-amber-500/50 text-amber-500" : "bg-white/5 border-white/10 text-zinc-500"
                    }`}
                  >
                    {card.popular ? "Most Popular" : "Regular Tier"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Benefits</label>
                  <button onClick={() => addBenefit(card._id)} className="text-white hover:text-zinc-400 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {card.benefits.map((benefit: string, bIndex: number) => (
                    <div key={bIndex} className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleBenefitChange(card._id, bIndex, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-sm pr-10"
                        />
                      </div>
                      <button 
                        onClick={() => removeBenefit(card._id, bIndex)}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
