"use client";

import Link from "next/link";
import { Star, Instagram, Twitter, Facebook, Send } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Star className="w-8 h-8 text-white fill-white" />
            <span className="text-xl font-black tracking-tighter">STAR-ACCESS</span>
          </Link>
          <p className="text-zinc-500 max-w-sm mb-6">
            Connecting icons with their most dedicated fans through exclusive experiences and premium access.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/celebrities" className="text-zinc-500 hover:text-white transition-colors">Celebrities</Link></li>
            <li><Link href="/fan-cards" className="text-zinc-500 hover:text-white transition-colors">Fan Cards</Link></li>
            <li><Link href="/bookings" className="text-zinc-500 hover:text-white transition-colors">Bookings</Link></li>
            <li><Link href="/about" className="text-zinc-500 hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} Star-access. All rights reserved.
      </div>
    </footer>
  );
}
