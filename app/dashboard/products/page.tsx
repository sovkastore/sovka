import { redirect } from "next/navigation";
import { getAuthed } from "@/lib/supabase/authed";
import { ProductsManager } from "@/components/products/products-manager";

export const metadata = { title: "Products — Sovcart" };

export default async function ProductsPage() {
  const authed = await getAuthed();
  if (!authed) redirect("/login");
  return <ProductsManager />;
}
