import { NextResponse } from "next/server";
import { getAuthed } from "@/lib/supabase/authed";

const ALLOWED_BUCKETS = ["store-assets", "product-images"];

export async function POST(request: Request) {
  const authed = await getAuthed();
  if (!authed) return NextResponse.json({ error: "Your session expired — please log in again." }, { status: 401 });
  const { user, token } = authed;

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") || "asset");
  const bucket = String(form.get("bucket") || "store-assets");
  if (!ALLOWED_BUCKETS.includes(bucket)) return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > 6 * 1024 * 1024) return NextResponse.json({ error: "Image is too large" }, { status: 413 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  // Use the service-role key if it's been configured; otherwise the verified user's own token.
  const bearer = process.env.SUPABASE_SERVICE_ROLE_KEY || token;

  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const path = `${user.id}/${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      apikey: anon,
      "Content-Type": file.type || "image/jpeg",
      "x-upsert": "true",
      "cache-control": "3600",
    },
    body: bytes,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    return NextResponse.json({ error: `Upload failed (${res.status}): ${msg.slice(0, 180)}` }, { status: 400 });
  }

  const publicUrl = `${url}/storage/v1/object/public/${bucket}/${path}`;
  return NextResponse.json({ url: publicUrl });
}
