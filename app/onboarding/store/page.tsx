import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StoreForm } from "@/components/onboarding/store-form";

export default async function OnboardingStorePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("seller_id", user.id)
    .maybeSingle();
  if (store) redirect("/dashboard");

  return <StoreForm userId={user.id} />;
}
