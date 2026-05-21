import { NextResponse } from "next/server";
import { getAuthed } from "@/lib/supabase/authed";

const ALLOWED_BUCKETS = ["store-assets", "product-images"];

export async function POST(request: Request) {
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

  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const path = `${user.id}/${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
