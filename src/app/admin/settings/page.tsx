import SettingsPage from "@/components/admin/SettingsPage";
import { getSettings } from "@/app/actions/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const settings = await getSettings();
  return <SettingsPage initialSettings={settings} />;
}
