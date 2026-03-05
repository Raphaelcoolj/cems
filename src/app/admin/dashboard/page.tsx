import { BarChart3, Users, Ticket, MessageSquare } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { Celebrity } from "@/models/Celebrity";
import { FanCard } from "@/models/FanCard";
import { Inquiry } from "@/models/Inquiry";

export const dynamic = "force-dynamic";

async function getStats() {
  await connectDB();
  const [celebrityCount, tierCount, inquiryCount, recentInquiries] = await Promise.all([
    Celebrity.countDocuments(),
    FanCard.countDocuments(),
    Inquiry.countDocuments({ status: "Pending" }),
    Inquiry.find().sort({ createdAt: -1 }).limit(3).lean(),
  ]);

  return { 
    celebrityCount, 
    tierCount, 
    inquiryCount,
    recentInquiries: JSON.parse(JSON.stringify(recentInquiries))
  };
}

export default async function AdminDashboardPage() {
  const { celebrityCount, tierCount, inquiryCount, recentInquiries } = await getStats();

  const stats = [
    { name: "Total Celebrities", value: celebrityCount.toString(), icon: Users },
    { name: "Active Tiers", value: tierCount.toString(), icon: Ticket },
    { name: "Pending Inquiries", value: inquiryCount.toString(), icon: MessageSquare },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-black tracking-tighter uppercase text-white mb-2">Dashboard</h1>
        <p className="text-zinc-500">Overview of your platform's activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-morphism p-6 rounded-3xl border border-white/5 cinematic-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-2xl">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.name}</div>
            <div className="text-4xl font-black text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-morphism p-8 rounded-3xl border border-white/5 cinematic-shadow">
          <h3 className="text-xl font-bold mb-6 text-white">Recent Inquiries</h3>
          <div className="space-y-4">
            {recentInquiries.length > 0 ? recentInquiries.map((inquiry: any) => (
              <div key={inquiry._id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                <div>
                  <div className="font-bold text-white">{inquiry.name}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{inquiry.status}</div>
                </div>
                <div className="text-zinc-300 text-sm">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </div>
              </div>
            )) : (
              <p className="text-zinc-500 text-center py-4">No recent inquiries found.</p>
            )}
          </div>
        </div>

        <div className="glass-morphism p-8 rounded-3xl border border-white/5 cinematic-shadow">
          <h3 className="text-xl font-bold mb-6 text-white">Platform Activity</h3>
          <div className="relative h-48 flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-white/10 rounded-t-lg hover:bg-white/30 transition-all cursor-pointer relative group"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
