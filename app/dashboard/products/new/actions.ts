"use server";

import { getAuthed } from "@/lib/supabase/authed";

export type NewProduct = {
  title: string;
  description: string | null;
  price: number;
  stock: number;
  status: string;
  imageUrls: string[];
};

export async function createProduct(input: NewProduct): Promise<{ error?: string }> {
  const authed = await getAuthed();
  if (!authed) return { error: "Your session expired — please log in again." };
  const { user, supabase } = authed;

  const { data: store } = await supabase.from("stores").select("id").eq("seller_id", user.id).maybeSingle();
  if (!store) return { error: "Create your store first." };

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      store_id: store.id,
      title: input.title,
      description: input.description,
      price: input.price,
      stock: input.stock,
      status: input.status,
    })
    .select("id")
    .single();
  if (error || !product) return { error: error?.message || "Could not create product." };

  if (input.imageUrls.length) {
    const rows = input.imageUrls.map((url, i) => ({ product_id: product.id, url, position: i }));
    const { error: imgErr } = await supabase.from("product_images").insert(rows);
    if (imgErr) return { error: imgErr.message };
  }
  return {};
}
