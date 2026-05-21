import { redirect } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { SovcartLogo } from "@/components/brand/logo";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("seller_id", user.id)
    .maybeSingle();
  if (!store) redirect("/onboarding/store");

  return (
    <main className="mx-auto max-w-md px-5 py-8">
      <header className="mb-6 flex items-center justify-between">
        <SovcartLogo size={32} />
        <SignOutButton />
      </header>

      <Card className="overflow-hidden p-0">
        <div className="h-28 w-full" style={{ background: store.banner_url ? `center/cover url(${store.banner_url})` : "linear-gradient(120deg,#6E3BFF,#4A1FBF)" }} />
        <div className="px-5 pb-5">
          <div className="-mt-8 flex items-end gap-3">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border-4 border-white bg-canvas shadow-soft">
              {store.logo_url ? (
                <img src={store.logo_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-extrabold text-brand">
                  {store.name?.[0]?.toUpperCase() ?? "S"}
                </div>
              )}
            </div>
            <span className="mb-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 capitalize">
              {store.status}
            </span>
          </div>
          <h1 className="mt-3 text-xl font-bold text-ink">{store.name}</h1>
          <Link
            href={`/${store.slug}`}
            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand"
          >
            sovcart.app/{store.slug} <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          {store.bio && <p className="mt-3 text-sm text-muted">{store.bio}</p>}
        </div>
      </Card>

      <Card className="mt-4 flex items-center justify-between p-5">
        <div>
          <p className="font-semibold text-ink">Products</p>
          <p className="text-sm text-muted">Add your first product to start selling.</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-2xl bg-canvas px-3 py-2 text-sm font-semibold text-muted">
          <Plus className="h-4 w-4" /> Soon
        </span>
      </Card>
    </main>
  );
}
