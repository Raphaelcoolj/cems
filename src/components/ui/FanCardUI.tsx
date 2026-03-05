"use client";

import { Check, Star, Copy, Send, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FanCardProps {
  tier: string;
  price: number;
  benefits: string[];
  popular?: boolean;
  btcAddress: string;
  adminTelegramLink: string;
}

const tierColors: Record<string, string> = {
  Standard: "from-zinc-400 to-zinc-600",
  Beta: "from-blue-400 to-blue-600",
  Pro: "from-purple-400 to-purple-600",
  Elite: "from-amber-400 to-amber-600",
};

export default function FanCardUI({ tier, price, benefits, popular, btcAddress, adminTelegramLink }: FanCardProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-full">
      <motion.div
        whileHover={!showPayment ? { y: -10 } : {}}
        className={`relative group glass-morphism p-8 rounded-3xl flex flex-col h-full border ${
          popular ? "border-amber-500/50" : "border-white/10"
        } transition-all duration-500 ${showPayment ? "blur-sm opacity-50 pointer-events-none" : ""}`}
      >
        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Most Popular
          </div>
        )}

        <div className={`w-12 h-12 rounded-2xl mb-6 bg-gradient-to-br ${tierColors[tier] || "from-white to-zinc-500"} flex items-center justify-center`}>
          <Star className="w-6 h-6 text-black fill-black" />
        </div>

        <h3 className="text-2xl font-bold mb-2">{tier}</h3>
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-4xl font-extrabold">${price}</span>
          <span className="text-zinc-500">/one-time</span>
        </div>

        <ul className="space-y-4 mb-12 flex-grow">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-300">
              <Check className="w-5 h-5 text-emerald-500 shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>

        <button 
          onClick={() => setShowPayment(true)}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            popular 
              ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:opacity-90 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              : "bg-white/5 hover:bg-white/10 text-white"
          }`}
        >
          Choose {tier}
        </button>
      </motion.div>

      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute inset-0 z-10 glass-morphism p-8 rounded-3xl border border-white/20 flex flex-col items-center justify-center text-center backdrop-blur-xl bg-black/40"
          >
            <button 
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-blue-500" />
            </div>

            <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Complete Payment</h4>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              To activate your <span className="text-white font-bold">{tier}</span> access, please complete the payment below.
            </p>

            <div className="w-full space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-1">BTC Address</label>
                <div className="flex gap-2">
                  <div className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-zinc-300 truncate">
                    {btcAddress}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
                    title="Copy Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-[11px] text-zinc-400 leading-relaxed font-medium text-left space-y-2">
                <p>
                  <strong className="text-amber-200/80">OPTION 1:</strong> Pay to the BTC address above and send proof to the manager for activation.
                </p>
                <div className="h-[1px] bg-white/5 w-full" />
                <p>
                  <strong className="text-blue-400">OPTION 2:</strong> Message the manager directly on Telegram to choose a more convenient payment method or if you have any questions.
                </p>
              </div>

              <a 
                href={adminTelegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#24A1DE] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Go to Telegram
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
