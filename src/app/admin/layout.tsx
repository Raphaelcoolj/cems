"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Users, 
  Ticket, 
  MessageSquare, 
  Settings as SettingsIcon, 
  LogOut, 
  Star,
  ChevronRight
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Celebrities", href: "/admin/celebrities", icon: Users },
  { name: "Fan Cards", href: "/admin/fan-cards", icon: Ticket },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-white/5 flex flex-col fixed h-full z-40">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Star className="w-6 h-6 text-white fill-white" />
            <span className="text-lg font-black tracking-tighter text-white">STAR-ADMIN</span>
          </Link>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                    ? "bg-white text-black" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "text-zinc-500"}`} />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
