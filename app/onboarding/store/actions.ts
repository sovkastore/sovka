"use server";

import { createClient } from "@/lib/supabase/server";
import { createAuthedClient } from "@/lib/supabase/authed";

export type CreateStoreInput = {
  name: string;
  slug: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  brandColor: string;
  bio: string | null;
  whatsapp: string | null;
  instagram: string | null;
  countryCode: string;
  currency: string;
};

export async function createStore(input: CreateStoreInput): Promise<{ error?: string; code?: string }> {
  const ssr = createClient();
  const {
    data: { user },
  } = await ssr.auth.getUser();
  const {
    data: { session },
  } = await ssr.auth.getSession();
  if (!user || !session) return { error: "Your session expired — please log in again." };

  const supabase = createAuthedClient(session.access_token);
  const { error } = await supabase.from("stores").insert({
    seller_id: user.id,
    name: input.name,
    slug: input.slug,
    logo_url: input.logoUrl,
    banner_url: input.bannerUrl,
    brand_color: input.brandColor,
    bio: input.bio,
    whatsapp_number: input.whatsapp,
    instagram_handle: input.instagram,
    country: input.countryCode,
    currency: input.currency,
  });
  if (error) return { error: error.message, code: error.code };

  await supabase.from("sellers").update({ country: input.countryCode }).eq("id", user.id);
  return {};
}
