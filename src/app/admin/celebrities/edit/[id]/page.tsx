import CelebrityForm from "@/components/admin/CelebrityForm";
import { getCelebrityById } from "@/app/actions/celebrity";
import { notFound } from "next/navigation";

export default async function EditCelebrityPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const celebrity = await getCelebrityById(id);
  
  if (!celebrity) {
    notFound();
  }

  return <CelebrityForm initialData={celebrity} />;
}
