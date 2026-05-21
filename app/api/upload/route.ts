import { NextResponse } from "next/server";
import { getAuthed } from "@/lib/supabase/authed";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_BUCKETS = ["store-assets", "product-images"];

export async function POST(request: Request) {
  // 1. Verify it's a real, logged-in seller.
  const authed = await getAuthed();
  if (!authed) return NextResponse.json({ error: "Your session expired — please log in again." }, { status: 401 });
  const { user, supabase } = authed;

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") || "asset");
  const bucket = String(form.get("bucket") || "store-assets");
  if (!ALLOWED_BUCKETS.includes(bucket)) return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > 6 * 1024 * 1024) return NextResponse.json({ error: "Image is too large" }, { status: 413 });

  // 2. Write with the service-role client (reliable, bypasses storage RLS).
  //    Falls back to the user-scoped client until the service key is configured.
  const admin = createAdminClient();
  const writer = admin ?? supabase;
  const usingAdmin = admin !== null;

  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  // Always scope the file under the seller's own folder, even with the master key.
  const path = `${user.id}/${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = await file.arrayBuffer();
  const { error } = await writer.storage
    .from(bucket)
    .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: true });
  if (error) {
    const hint = usingAdmin ? "" : " (server upload key not configured yet)";
    return NextResponse.json({ error: error.message + hint }, { status: 400 });
  }

  const { data } = writer.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
