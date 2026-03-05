import connectDB from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import "@/models/Celebrity";
import "@/models/FanCard";
import { Mail, User, Clock, MessageSquare, Star } from "lucide-react";
import { updateInquiryStatus } from "@/app/actions/inquiry";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
    await connectDB();
    const inquiries = await Inquiry.find()
        .populate("celebrityId", "name")
        .populate("tierId", "tier")
        .sort({ createdAt: -1 });

    const statusColors: any = {
        Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        Reviewed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        Contacted: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        Closed: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase text-white mb-2">Inquiries</h1>
                <p className="text-zinc-500">Manage booking requests and fan connections</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {inquiries.map((inquiry: any) => (
                    <div key={inquiry._id} className="glass-morphism p-8 rounded-[2rem] border border-white/5 cinematic-shadow group hover:border-white/20 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                                    <User className="w-6 h-6 text-zinc-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{inquiry.name}</h3>
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">
                                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {inquiry.email}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[inquiry.status]}`}>
                                    {inquiry.status}
                                </div>
                                <select
                                    defaultValue={inquiry.status}
                                    // In a real app, wrap in a Client Component for status update
                                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Reviewed">Reviewed</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-amber-500" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Celebrity</div>
                                        <div className="font-bold text-white uppercase">{inquiry.celebrityId?.name || "Deleted"}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-zinc-500" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Fan Tier</div>
                                        <div className="font-bold text-white uppercase">{inquiry.tierId?.tier || "General Inquiry"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                    <MessageSquare className="w-3 h-3" /> Message
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed italic">
                                    "{inquiry.message || "No message provided."}"
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {inquiries.length === 0 && (
                    <div className="glass-morphism p-20 rounded-[3rem] border border-white/5 text-center">
                        <MessageSquare className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-500">No inquiries yet</h3>
                        <p className="text-zinc-600 mt-2">When fans submit bookings, they'll appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
