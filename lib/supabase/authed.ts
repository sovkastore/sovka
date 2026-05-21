import { createClient as createBaseClient } from "@supabase/supabase-js";
import { createClient as createSsrClient } from "@/lib/supabase/server";

// A Supabase client that explicitly carries a verified user's access token,
// so Storage + Postgres requests run as that authenticated user (RLS-safe).
export function createAuthedClient(accessToken: string) {
  return createBaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    }
  );
}

// Verify the logged-in user (server-side) and return a token-scoped client.
export async function getAuthed() {
  const ssr = createSsrClient();
  const {
    data: { user },
  } = await ssr.auth.getUser();
  const {
    data: { session },
  } = await ssr.auth.getSession();
  if (!user || !session) return null;
  return { user, supabase: createAuthedClient(session.access_token) };
}
