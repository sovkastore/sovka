import { createClient } from "@supabase/supabase-js";

// A Supabase client that explicitly carries a verified user's access token,
// so Storage + Postgres requests run as that authenticated user (RLS-safe).
export function createAuthedClient(accessToken: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    }
  );
}
