import connectDB from "@/lib/mongodb";
import { Celebrity } from "@/models/Celebrity";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { deleteCelebrity } from "@/app/actions/celebrity";
import { deleteImage } from "@/app/actions/cloudinary";

export const dynamic = "force-dynamic";

export default async function AdminCelebritiesPage() {
  await connectDB();
  const celebrities = await Celebrity.find().sort({ createdAt: -1 });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-white mb-2">Celebrities</h1>
          <p className="text-zinc-500">Manage your roster of stars</p>
        </div>
        <Link 
          href="/admin/celebrities/new"
          className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Celebrity
        </Link>
      </div>

      <div className="glass-morphism rounded-3xl border border-white/5 cinematic-shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 font-bold uppercase tracking-widest text-[10px] text-zinc-400">
              <th className="px-6 py-4">Star</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Known For</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {celebrities.map((celeb) => (
              <tr key={celeb._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
                      <img src={celeb.imageUrl} alt={celeb.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold text-white uppercase tracking-tight">{celeb.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">{celeb.category}</td>
                <td className="px-6 py-4 text-zinc-400">{celeb.knownFor || "N/A"}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      href={`/celebrities/${celeb._id}`} 
                      target="_blank"
                      className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link 
                      href={`/admin/celebrities/edit/${celeb._id}`}
                      className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button 
                      className="p-2 bg-white/5 rounded-lg text-red-500/50 hover:text-red-500 transition-colors"
                      // In a real app, wrap in a Client Component for delete functionality
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {celebrities.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-zinc-600 italic">
                  No celebrities found. Add your first star to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
