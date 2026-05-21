import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAuthedClient } from "@/lib/supabase/authed";

export async function POST(request: Request) {
  const ssr = createClient();
  const {
    data: { user },
  } = await ssr.auth.getUser();
  const {
    data: { session },
  } = await ssr.auth.getSession();
  if (!user || !session) {
    return NextResponse.json({ error: "Your session expired — please log in again." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") || "asset");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > 6 * 1024 * 1024) return NextResponse.json({ error: "Image is too large" }, { status: 413 });

  const supabase = createAuthedClient(session.access_token);
  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const path = `${user.id}/${kind}-${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from("store-assets")
    .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const { data } = supabase.storage.from("store-assets").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
