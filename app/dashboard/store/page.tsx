import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StoreCustomizer } from "@/components/dashboard/store-customizer";

export default async function StorePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return <StoreCustomizer />;
}
