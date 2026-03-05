import FanCardManager from "@/components/admin/FanCardManager";
import { getFanCards, seedFanCards } from "@/app/actions/fan-card";

export const dynamic = "force-dynamic";

export default async function AdminFanCardsPage() {
  await seedFanCards(); // Ensure cards exist
  const cards = await getFanCards();

  return <FanCardManager initialCards={cards} />;
}
