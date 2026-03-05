import FanCardUI from "@/components/ui/FanCardUI";
import connectDB from "@/lib/mongodb";
import { FanCard } from "@/models/FanCard";
import { Settings } from "@/models/Settings";

export const dynamic = "force-dynamic";

async function getInitialData() {
  await connectDB();
  const cards = await FanCard.find().sort({ price: 1 });
  const settings = await Settings.findOne() || { btcAddress: "", adminTelegramLink: "" };
  return { cards, settings };
}

export default async function FanCardsPage() {
  const { cards, settings } = await getInitialData();

  const defaultCards = [
    { tier: "Standard", price: 49, benefits: ["Access to fan group", "Monthly newsletter", "Digital badge"] },
    { tier: "Beta", price: 99, benefits: ["All Standard benefits", "Exclusive live streams", "Priority chat access"] },
    { tier: "Pro", price: 199, benefits: ["All Beta benefits", "Exclusive merch discount", "Q&A participation"], popular: true },
    { tier: "Elite", price: 499, benefits: ["All Pro benefits", "1-on-1 video call", "Meet & Greet access", "Signed memorabilia"] },
  ];

  const displayCards = cards.length > 0 ? cards : defaultCards;

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
          Choose Your Access
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Elevate your connection with your favorite icons. Choose a tier that fits your passion and unlock unprecedented benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayCards.map((card: any, i: number) => (
          <FanCardUI
            key={i}
            tier={card.tier}
            price={card.price}
            benefits={card.benefits}
            popular={card.popular}
            btcAddress={settings.btcAddress}
            adminTelegramLink={settings.adminTelegramLink}
          />
        ))}
      </div>
    </div>
  );
}
