"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Upload, Loader2, X, Check } from "lucide-react";
import { uploadImage } from "@/app/actions/cloudinary";
import { createCelebrity, updateCelebrity } from "@/app/actions/celebrity";

export default function CelebrityForm({ initialData }: { initialData?: any }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "Musician",
    bio: initialData?.bio || "",
    age: initialData?.age || "",
    knownFor: initialData?.knownFor || "",
    imageUrl: initialData?.imageUrl || "",
    cloudinaryId: initialData?.cloudinaryId || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData?.imageUrl || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let currentImageUrl = formData.imageUrl;
      let currentCharityId = formData.cloudinaryId;

      if (imageFile && preview) {
        const uploadRes = await uploadImage(preview);
        currentImageUrl = uploadRes.url;
        currentCharityId = uploadRes.publicId;
      }

      const finalData = {
        ...formData,
        slug: generateSlug(formData.name),
        imageUrl: currentImageUrl,
        cloudinaryId: currentCharityId,
        age: formData.age ? Number(formData.age) : undefined,
      };

      if (initialData?._id) {
        await updateCelebrity(initialData._id, finalData);
      } else {
        await createCelebrity(finalData);
      }

      router.push("/admin/celebrities");
      router.refresh();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-white mb-2">
            {initialData ? "Edit Star" : "Add New Star"}
          </h1>
          <p className="text-zinc-500">Enter the details for your icon</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
          {initialData ? "Update Celebrity" : "Save Celebrity"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image Upload */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-morphism p-6 rounded-[2rem] border border-white/5">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-4">Portrait Image</label>
            <div 
              className="relative aspect-[3/4] rounded-3xl bg-white/5 border-2 border-dashed border-white/10 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all group"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-zinc-700 mb-4 group-hover:text-zinc-500 transition-colors" />
                  <p className="text-zinc-500 font-bold uppercase tracking-tight text-xs">Drop Image or Click</p>
                </>
              )}
            </div>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-morphism p-8 rounded-[2rem] border border-white/5 cinematic-shadow space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Leonardo DiCaprio"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white appearance-none cursor-pointer"
                >
                  <option value="Musician" className="bg-zinc-900 text-white">Musician</option>
                  <option value="Actor" className="bg-zinc-900 text-white">Actor</option>
                  <option value="Athlete" className="bg-zinc-900 text-white">Athlete</option>
                  <option value="Influencer" className="bg-zinc-900 text-white">Influencer</option>
                  <option value="Other" className="bg-zinc-900 text-white">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Known For (Songs/Movies)</label>
                <input
                  type="text"
                  value={formData.knownFor}
                  onChange={(e) => setFormData({ ...formData, knownFor: e.target.value })}
                  placeholder="e.g. Inception, Titanic"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="e.g. 48"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Biography (Rich Text Supported)</label>
              <textarea
                rows={8}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Write a cinematic biography..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-white/30 transition-colors text-white leading-relaxed"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
