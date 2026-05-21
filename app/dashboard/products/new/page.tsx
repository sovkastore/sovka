import { redirect } from "next/navigation";
import { getAuthed } from "@/lib/supabase/authed";
import { ProductForm } from "@/components/products/product-form";

export default async function NewProductPage() {
  const authed = await getAuthed();
  if (!authed) redirect("/login");
  const { user, supabase } = authed;
  const { data: store } = await supabase
    .from("stores")
    .select("id, currency")
    .eq("seller_id", user.id)
    .maybeSingle();
  if (!store) redirect("/onboarding/store");
  return <ProductForm currency={store.currency as string} />;
}
