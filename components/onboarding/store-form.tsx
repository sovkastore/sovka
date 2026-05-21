"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, ImagePlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SovcartLogo } from "@/components/brand/logo";

const COUNTRIES = [
  { code: "GH", name: "Ghana", currency: "GHS", symbol: "₵", dial: "+233" },
  { code: "NG", name: "Nigeria", currency: "NGN", symbol: "₦", dial: "+234" },
];

export function StoreForm({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [bio, setBio] = useState("");
  const [countryCode, setCountryCode] = useState("GH");
  const [brandColor, setBrandColor] = useState("#5A31F4");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<"logo" | "banner" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const country = COUNTRIES.find((c) => c.code === countryCode)!;

  function onName(v: string) {
    setName(v);
    if (!slugEdited) setSlug(slugify(v));
  }

  async function uploadImage(kind: "logo" | "banner", file: File | undefined) {
    if (!file) return;
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    setUploading(kind);
    const ext = file.name.split(".").pop() || "png";
    const path = `${userId}/${kind}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("store-assets")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) {
      setUploading(null);
      setError(upErr.message);
      return;
    }
    const { data } = supabase.storage.from("store-assets").getPublicUrl(path);
    if (kind === "logo") setLogoUrl(data.publicUrl);
    else setBannerUrl(data.publicUrl);
    setUploading(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) {
      setError("Please enter your store name.");
      return;
    }
    if (slug.length < 3) {
      setError("Your store link needs at least 3 characters.");
      return;
    }
    setSaving(true);
    const { error: insErr } = await supabase.from("stores").insert({
      seller_id: userId,
      name: name.trim(),
      slug,
      logo_url: logoUrl,
      banner_url: bannerUrl,
      brand_color: brandColor,
      bio: bio.trim() || null,
      whatsapp_number: whatsapp.trim() || null,
      instagram_handle: instagram.trim().replace(/^@/, "") || null,
      country: countryCode,
      currency: country.currency,
    });
    if (insErr) {
      setSaving(false);
      if (insErr.code === "23505") {
        setError("That store link is already taken — try another one.");
        setSlugEdited(true);
      } else {
        setError(insErr.message);
      }
      return;
    }
    await supabase.from("sellers").update({ country: countryCode }).eq("id", userId);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-5 py-8">
      <div className="mb-6 flex justify-center">
        <SovcartLogo size={32} />
      </div>
      <h1 className="text-2xl font-bold text-ink">Set up your store</h1>
      <p className="mt-1 text-sm text-muted">This is what buyers see. You can change it anytime.</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <Card className="overflow-hidden p-0">
          {/* Banner */}
          <label className="relative block h-32 w-full cursor-pointer">
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: bannerUrl
                  ? `center/cover url(${bannerUrl})`
                  : "linear-gradient(120deg,#6E3BFF,#4A1FBF)",
              }}
            >
              {!bannerUrl && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  <ImagePlus className="h-4 w-4" /> Add cover banner
                </span>
              )}
              {uploading === "banner" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadImage("banner", e.target.files?.[0])}
            />
          </label>

          <div className="px-5 pb-5">
            {/* Logo */}
            <label className="relative -mt-9 mb-4 block h-[72px] w-[72px] cursor-pointer">
              <div className="h-full w-full overflow-hidden rounded-2xl border-4 border-white bg-canvas shadow-soft">
                {logoUrl ? (
                  <img src={logoUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted">
                    <Camera className="h-5 w-5" />
                  </div>
                )}
              </div>
              {uploading === "logo" && (
                <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => uploadImage("logo", e.target.files?.[0])}
              />
            </label>

            <div className="flex flex-col gap-4">
              <div>
                <Label>Store name</Label>
                <Input value={name} onChange={(e) => onName(e.target.value)} placeholder="e.g. Ama Fashion" required />
              </div>

              <div>
                <Label>Your store link</Label>
                <div className="flex items-center rounded-2xl border border-black/10 bg-white pl-4 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
                  <span className="text-[15px] text-muted">sovcart.app/</span>
                  <input
                    value={slug}
                    onChange={(e) => {
                      setSlugEdited(true);
                      setSlug(slugify(e.target.value));
                    }}
                    placeholder="ama-fashion"
                    className="h-12 flex-1 bg-transparent pr-4 text-[15px] text-ink outline-none"
                  />
                </div>
              </div>

              <div>
                <Label>Country</Label>
                <div className="grid grid-cols-2 gap-2">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setCountryCode(c.code)}
                      className={
                        "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition " +
                        (countryCode === c.code
                          ? "border-brand bg-brand-50 text-brand-700"
                          : "border-black/10 text-ink hover:bg-canvas")
                      }
                    >
                      {c.name}
                      <span className="block text-xs font-medium text-muted">
                        {c.currency} {c.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Short bio</Label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell buyers what you sell in a sentence or two."
                  maxLength={160}
                />
              </div>

              <div>
                <Label>WhatsApp number</Label>
                <Input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder={`${country.dial} ...`}
                  inputMode="tel"
                />
              </div>

              <div>
                <Label>Instagram (optional)</Label>
                <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@yourhandle" />
              </div>

              <div>
                <Label>Brand color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="h-11 w-14 cursor-pointer rounded-xl border border-black/10 bg-white p-1"
                  />
                  <span className="text-sm font-medium uppercase text-muted">{brandColor}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {error && <p className="mt-3 text-sm text-accent">{error}</p>}

        <Button type="submit" disabled={saving || uploading !== null} className="mt-4 w-full">
          {saving ? "Creating your store…" : "Create store"}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">
          You can add products right after this.
        </p>
      </form>
    </main>
  );
}
