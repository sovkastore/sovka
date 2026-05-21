import { createClient } from "@supabase/supabase-js";

// Service-role client for trusted server-side operations (bypasses RLS).
// NEVER import this into client components. The key lives only in server env vars.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
