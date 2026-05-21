"use server";

import { revalidatePath } from "next/cache";
import { getAuthed } from "@/lib/supabase/authed";

async function ownStore() {
  const authed = await getAuthed();
  if (!authed) return null;
  const { user, supabase } = authed;
  const { data: store } = await supabase.from("stores").select("id").eq("seller_id", user.id).maybeSingle();
  if (!store) return null;
  return { supabase, storeId: store.id as string };
}

export type UpdateProductInput = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrls: string[];
};

export async function updateProduct(input: UpdateProductInput): Promise<{ error?: string }> {
  const ctx = await ownStore();
  if (!ctx) return { error: "Your session expired — please log in again." };
  const { supabase, storeId } = ctx;

  const { error } = await supabase
    .from("products")
    .update({
      title: input.title,
      description: input.description,
      price: input.price,
      stock: input.stock,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id)
    .eq("store_id", storeId);
  if (error) return { error: error.message };

  // Replace the image set with whatever the form currently holds
  await supabase.from("product_images").delete().eq("product_id", input.id);
  if (input.imageUrls.length) {
    const rows = input.imageUrls.map((url, i) => ({ product_id: input.id, url, position: i }));
    const { error: imgErr } = await supabase.from("product_images").insert(rows);
    if (imgErr) return { error: imgErr.message };
  }
  revalidatePath("/dashboard");
  return {};
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  const ctx = await ownStore();
  if (!ctx) return { error: "Your session expired — please log in again." };
  const { supabase, storeId } = ctx;
  // product_images rows cascade-delete with the product
  const { error } = await supabase.from("products").delete().eq("id", id).eq("store_id", storeId);
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return {};
}

export async function duplicateProduct(id: string): Promise<{ error?: string }> {
  const ctx = await ownStore();
  if (!ctx) return { error: "Your session expired — please log in again." };
  const { supabase, storeId } = ctx;
  const { data: src, error: e1 } = await supabase
    .from("products")
    .select("title, description, price, compare_price, stock")
    .eq("id", id)
    .eq("store_id", storeId)
    .single();
  if (e1 || !src) return { error: e1?.message || "Product not found." };
  const { data: copy, error: e2 } = await supabase
    .from("products")
    .insert({
      store_id: storeId,
      title: `${src.title} (copy)`,
      description: src.description,
      price: src.price,
      compare_price: src.compare_price,
      stock: src.stock,
      status: "hidden",
    })
    .select("id")
    .single();
  if (e2 || !copy) return { error: e2?.message || "Could not duplicate." };
  const { data: imgs } = await supabase.from("product_images").select("url, position").eq("product_id", id);
  if (imgs && imgs.length) {
    await supabase.from("product_images").insert(
      imgs.map((im: any) => ({ product_id: copy.id, url: im.url, position: im.position }))
    );
  }
  revalidatePath("/dashboard");
  return {};
}

export async function setProductStatus(id: string, status: string): Promise<{ error?: string }> {
  const ctx = await ownStore();
  if (!ctx) return { error: "Your session expired — please log in again." };
  const { supabase, storeId } = ctx;
  const { error } = await supabase.from("products").update({ status }).eq("id", id).eq("store_id", storeId);
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return {};
}

export async function setProductFeatured(id: string, featured: boolean): Promise<{ error?: string }> {
  const ctx = await ownStore();
  if (!ctx) return { error: "Your session expired — please log in again." };
  const { supabase, storeId } = ctx;
  const { error } = await supabase.from("products").update({ featured }).eq("id", id).eq("store_id", storeId);
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return {};
}
