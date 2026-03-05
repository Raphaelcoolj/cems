import connectDB from "@/lib/mongodb";
import { Celebrity } from "@/models/Celebrity";
import { FanCard } from "@/models/FanCard";
import InquiryForm from "@/components/ui/InquiryForm";

export const dynamic = "force-dynamic";

async function getData() {
  await connectDB();
  const celebrities = await Celebrity.find({}, "name").lean();
  const tiers = await FanCard.find({}, "tier").lean();
  return { 
    celebrities: JSON.parse(JSON.stringify(celebrities)), 
    tiers: JSON.parse(JSON.stringify(tiers)) 
  };
}

export default async function BookingsPage() {
  const { celebrities, tiers } = await getData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">Book an Icon</h1>
        <p className="text-zinc-500">Inquire about appearances, endorsements, or private events.</p>
      </div>

      <div className="glass-morphism p-8 md:p-12 rounded-3xl border border-white/5 cinematic-shadow">
        <InquiryForm celebrities={celebrities} tiers={tiers} />
      </div>
    </div>
  );
}
