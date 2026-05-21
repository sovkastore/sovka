"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Star, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type ProductRow = {
  id: string;
  title: string;
  price: number;
  stock: number;
  status: string;
  featured: boolean;
  created_at: string;
  product_images: { url: string; position: number }[];
};

type Sort = "newest" | "price_asc" | "price_desc" | "name";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "hidden", label: "Hidden" },
] as const;

export function ProductList({ products, currency }: { products: ProductRow[]; currency: string }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const shown = useMemo(() => {
    let list = [...products];
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));
    if (status === "active") list = list.filter((p) => p.status === "active");
    if (status === "hidden") list = list.filter((p) => p.status !== "active");
    list.sort((a, b) => {
      if (sort === "price_asc") return Number(a.price) - Number(b.price);
      if (sort === "price_desc") return Number(b.price) - Number(a.price);
      if (sort === "name") return a.title.localeCompare(b.title);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return list;
  }, [products, query, status, sort]);

  return (
    <div>
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="h-11 w-full rounded-2xl border border-black/10 bg-white pl-10 pr-4 text-[15px] text-ink outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
        />
      </div>

      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
              status === f.key ? "bg-ink text-white" : "bg-white text-muted shadow-soft"
            }`}
          >
            {f.label}
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="ml-auto shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-muted shadow-soft outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">No products match.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {shown.map((p) => {
            const img = [...(p.product_images ?? [])].sort((a, b) => a.position - b.position)[0]?.url;
            const soldOut = p.stock <= 0;
            const hidden = p.status !== "active";
            return (
              <Link
                key={p.id}
                href={`/dashboard/products/${p.id}/edit`}
                className="overflow-hidden rounded-3xl bg-white shadow-card transition active:scale-[0.98]"
              >
                <div className="relative aspect-square w-full bg-canvas">
                  {img ? (
                    <img src={img} alt="" className={`h-full w-full object-cover ${hidden ? "opacity-50" : ""}`} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted">
                      <Package className="h-7 w-7" />
                    </div>
                  )}
                  {p.featured && (
                    <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-soft">
                      <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                    </span>
                  )}
                  {(soldOut || hidden) && (
                    <span className="absolute right-2 top-2 rounded-full bg-ink/85 px-2 py-0.5 text-[11px] font-semibold text-white">
                      {hidden ? "Hidden" : "Sold out"}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-ink">{p.title}</p>
                  <p className="text-sm font-bold text-brand">{formatPrice(Number(p.price), currency)}</p>
                  <p className="mt-0.5 text-xs text-muted">{soldOut ? "Out of stock" : `${p.stock} in stock`}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
