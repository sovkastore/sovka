import { redirect } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Plus, Package } from "lucide-react";
import { getAuthed } from "@/lib/supabase/authed";
import { Card } from "@/components/ui/card";
import { SovcartLogo } from "@/components/brand/logo";
import { SignOutButton } from "@/components/sign-out-button";
import { ProductList } from "@/components/products/product-list";

export default async function DashboardPage() {
  const authed = await getAuthed();
  if (!authed) redirect("/login");
  const { user, supabase } = authed;

  const { data: store } = await supabase.from("stores").select("*").eq("seller_id", user.id).maybeSingle();
  if (!store) redirect("/onboarding/store");

  const { data: products } = await supabase
    .from("products")
    .select("id, title, price, stock, status, featured, created_at, product_images(url, position)")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  const list = (products ?? []).map((p: any) => ({
    id: p.id,
    title: p.title,
    price: Number(p.price),
    stock: p.stock ?? 0,
    status: p.status,
    featured: !!p.featured,
    created_at: p.created_at,
    product_images: p.product_images ?? [],
  }));

  return (
    <main className="mx-auto max-w-md px-5 py-8">
      <header className="mb-6 flex items-center justify-between">
        <SovcartLogo size={32} />
        <SignOutButton />
      </header>

      <Card className="overflow-hidden p-0">
        <div
          className="h-28 w-full"
          style={{
            background: store.banner_url
              ? `center/cover url(${store.banner_url})`
              : "linear-gradient(120deg,#6E3BFF,#4A1FBF)",
          }}
        />
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
            <span className="mb-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold capitalize text-brand-700">
              {store.status}
            </span>
          </div>
          <h1 className="mt-3 text-xl font-bold text-ink">{store.name}</h1>
          <Link href={`/${store.slug}`} className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand">
            sovcart.app/{store.slug} <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          {store.bio && <p className="mt-3 text-sm text-muted">{store.bio}</p>}
        </div>
      </Card>

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">Products</h2>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-1.5 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      {list.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
            <Package className="h-6 w-6" />
          </div>
          <p className="font-semibold text-ink">No products yet</p>
          <p className="max-w-[15rem] text-sm text-muted">Add your first product and share your link to start selling.</p>
        </Card>
      ) : (
        <ProductList products={list} currency={store.currency} />
      )}
    </main>
  );
}
