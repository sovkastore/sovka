import { createClient as createBaseClient } from "@supabase/supabase-js";
import { createClient as createSsrClient } from "@/lib/supabase/server";

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

export async function getAuthed() {
  const ssr = createSsrClient();
  const {
    data: { user },
  } = await ssr.auth.getUser();
  const {
    data: { session },
  } = await ssr.auth.getSession();
  if (!user || !session) return null;
  return { user, token: session.access_token, supabase: createAuthedClient(session.access_token) };
}
