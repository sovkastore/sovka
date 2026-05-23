"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, ArrowUpDown, Plus, Download, Upload, ChevronDown, ChevronLeft,
  Link2, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon,
  Copy, Pencil, MoreVertical, Bell, Sparkles, ArrowRight, X, FileText, Film, Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, card, Sidebar, MobileTopBar, MobileBottomNav, MobileDrawer } from "@/components/dashboard/shell";
import { SELLER } from "@/lib/dashboard-mock";
import {
  PRODUCTS, DESKTOP_TABS, TABLET_TABS, EDITOR_CATEGORIES, EDITOR_MEDIA, STOCK_LABEL,
  MOBILE_PRODUCTS, MOBILE_STATS, MOBILE_TABS_P, MOBILE_SHEET, AI_PRODUCT_CHIPS,
  type Product, type StockState,
} from "@/lib/products-mock";

/* ───────────────── shared helpers ───────────────── */
const inputCls =
  "w-full rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[13px] text-ink placeholder:text-muted focus:border-brand-400/50 focus:outline-none";

function statusBadge(status: string) {
  switch (status) {
    case "Active": return "bg-success/15 text-success";
    case "Out of Stock": return "bg-danger/15 text-danger";
    case "Low Stock": return "bg-warning/15 text-warning";
    default: return "bg-white/10 text-muted"; // Draft / Archived
  }
}
const stockColor: Record<StockState, string> = { in: "text-success", low: "text-warning", out: "text-danger" };

function Pill({ children, active, count }: { children: React.ReactNode; active?: boolean; count?: number }) {
  return (
    <button
      className={cn(
        "flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-[12.5px] font-medium transition",
        active ? "bg-brand-grad text-white shadow-glow" : "text-muted hover:bg-white/[0.04] hover:text-ink"
      )}
    >
      {children}
      {count != null && (
        <span className={cn("rounded-full px-1.5 text-[11px] font-semibold", active ? "bg-white/20 text-white" : "bg-white/[0.06] text-muted")}>
          {count}
        </span>
      )}
    </button>
  );
}

function SelectBox({ label, className }: { label: string; className?: string }) {
  return (
    <button className={cn("flex items-center justify-between gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[13px] text-ink", className)}>
      <span className="truncate">{label}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
    </button>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={cn("relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition", on ? "bg-brand" : "bg-white/15")}>
      <span className={cn("inline-block h-4 w-4 rounded-full bg-white shadow transition", on ? "translate-x-[18px]" : "translate-x-0.5")} />
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[12px] font-medium text-muted">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Check({ on, label }: { on: boolean; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink">
      <span className={cn("flex h-[18px] w-[18px] items-center justify-center rounded-[6px] border", on ? "border-brand bg-brand text-white" : "border-line bg-surface-2")}>
        {on && (
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

/* ───────────────── top bar (desktop / tablet) ───────────────── */
function ProductsTopBar({ tablet, onMenu }: { tablet?: boolean; onMenu?: () => void }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {tablet && (
          <button onClick={onMenu} className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-muted" aria-label="Menu">
            <Menu className="h-[18px] w-[18px]" />
          </button>
        )}
        <div>
          <h1 className="font-display text-[24px] font-bold leading-tight text-ink xl:text-[26px]">Products</h1>
          <p className="mt-1 text-[13px] text-muted">Manage your store products and inventory.</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2.5">
        <button className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13px] font-medium text-ink transition hover:border-white/15">
          <Download className="h-4 w-4" /> Export
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13px] font-medium text-ink transition hover:border-white/15">
          <Upload className="h-4 w-4" /> Import
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-brand-grad px-4 py-2.5 text-[13px] font-semibold text-white shadow-glow transition active:scale-[0.99]">
          <Plus className="h-4 w-4" /> Add Product
        </button>
        <button className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted" aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">3</span>
        </button>
        {tablet ? (
          <Avatar />
        ) : (
          <button className="flex items-center gap-2.5 rounded-xl border border-line bg-surface py-1.5 pl-2 pr-3">
            <Avatar size={32} />
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-ink">{SELLER.fullName}</span>
              <span className="block text-[11px] text-muted">{SELLER.role}</span>
            </span>
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>
        )}
      </div>
    </header>
  );
}

/* ───────────────── list: desktop table ───────────────── */
function ProductTable({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
      <table className="w-full border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-surface">
          <tr className="text-[11px] uppercase tracking-wide text-muted">
            <th className="w-9 px-3 py-3"><span className="block h-[18px] w-[18px] rounded-[6px] border border-line" /></th>
            <th className="px-2 py-3 font-medium">Product</th>
            <th className="px-2 py-3 font-medium">SKU</th>
            <th className="px-2 py-3 font-medium">Stock</th>
            <th className="px-2 py-3 font-medium">Price</th>
            <th className="px-2 py-3 font-medium">Status</th>
            <th className="px-2 py-3 font-medium">Date Added</th>
            <th className="px-2 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCTS.map((p) => {
            const sel = p.id === selectedId;
            return (
              <tr
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={cn(
                  "cursor-pointer border-t border-line align-middle transition",
                  sel ? "bg-brand-50/40" : "hover:bg-white/[0.02]"
                )}
              >
                <td className="px-3 py-3">
                  <span className={cn("block h-[18px] w-[18px] rounded-[6px] border", sel ? "border-brand bg-brand" : "border-line")} />
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-2.5">
                    <img src={p.img} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover" />
                    <span className="leading-tight">
                      <span className="block text-[13px] font-medium text-ink">{p.name}</span>
                      <span className="block text-[11px] text-muted">{p.category}</span>
                    </span>
                  </div>
                </td>
                <td className="px-2 py-3 text-[12px] text-muted">{p.sku}</td>
                <td className="px-2 py-3">
                  <span className="block text-[13px] text-ink">{p.stock}</span>
                  <span className={cn("block text-[11px]", stockColor[p.stockState])}>{STOCK_LABEL[p.stockState]}</span>
                </td>
                <td className="px-2 py-3 text-[13px] font-medium text-ink">{p.price}</td>
                <td className="px-2 py-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", statusBadge(p.status))}>{p.status}</span>
                </td>
                <td className="px-2 py-3 text-[12px] text-muted">{p.dateAdded}</td>
                <td className="px-2 py-3 text-right">
                  <button className="text-muted hover:text-ink"><MoreVertical className="ml-auto h-4 w-4" /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableFooter() {
  return (
    <div className="flex items-center justify-between border-t border-line px-4 py-3">
      <span className="text-[12px] text-muted">Showing 1 to 8 of 128 products</span>
      <div className="flex items-center gap-1">
        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-muted"><ChevronLeft className="h-4 w-4" /></button>
        {["1", "2", "3", "…", "16"].map((n, i) => (
          <button key={i} className={cn("h-7 min-w-7 rounded-lg px-2 text-[12px] font-medium", n === "1" ? "bg-brand-grad text-white" : "text-muted hover:text-ink")}>{n}</button>
        ))}
        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-muted"><ChevronLeft className="h-4 w-4 rotate-180" /></button>
      </div>
    </div>
  );
}

/* ───────────────── list: tablet cards ───────────────── */
function ProductCard({ p, selected, onSelect }: { p: Product; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition",
        selected ? "border-brand-500/60 bg-brand-50/40" : "border-line bg-surface-2 hover:border-white/15"
      )}
    >
      <img src={p.img} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[13px] font-medium text-ink">{p.name}</span>
        <span className="block text-[11px] text-muted">{p.stock} in stock</span>
        <span className="block text-[12px] font-semibold text-ink">{p.price}</span>
      </div>
      <span className={cn("self-start rounded-full px-2 py-0.5 text-[10px] font-semibold", statusBadge(p.status))}>{p.status}</span>
    </button>
  );
}

/* ───────────────── editor sections ───────────────── */
function ImageGallery({ p }: { p: Product }) {
  return (
    <div className="flex gap-3">
      <div className="aspect-square flex-1 overflow-hidden rounded-xl bg-surface-2">
        <img src={p.img} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex w-[58px] shrink-0 flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-lg border border-line bg-surface-2">
            <img src={p.img} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
        <button className="flex aspect-square flex-col items-center justify-center gap-0.5 rounded-lg border border-dashed border-line text-muted">
          <Plus className="h-4 w-4" />
          <span className="text-[8px]">Add</span>
        </button>
      </div>
    </div>
  );
}

function ProductInfo({ p }: { p: Product }) {
  return (
    <div className="space-y-3.5">
      <h3 className="text-[14px] font-semibold text-ink">Product Information</h3>
      <Field label="Product Name">
        <input className={inputCls} defaultValue={p.name} />
      </Field>
      <Field label="Slug">
        <div className="relative">
          <input className={cn(inputCls, "pr-9")} defaultValue={p.slug} />
          <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category"><SelectBox label={p.category} /></Field>
        <Field label="Brand"><input className={inputCls} defaultValue={p.brand} /></Field>
      </div>
      <Field label="Tags">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-2.5 py-2">
          {p.tags.map((t) => (
            <span key={t} className="flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[11px] text-brand-400">
              {t} <X className="h-3 w-3" />
            </span>
          ))}
          <ChevronDown className="ml-auto h-4 w-4 text-muted" />
        </div>
      </Field>
      <Field label="Short Description">
        <div className="relative">
          <textarea rows={2} className={cn(inputCls, "resize-none")} defaultValue={p.shortDesc} />
          <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-muted">{p.shortCount}</span>
        </div>
      </Field>
      <Field label="Description">
        <div className="overflow-hidden rounded-xl border border-line bg-surface-2">
          <div className="flex items-center gap-1 border-b border-line px-2 py-1.5 text-muted">
            {[Bold, Italic, Underline, List, ListOrdered, LinkIcon, ImageIcon].map((Icon, i) => (
              <button key={i} className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/[0.05] hover:text-ink"><Icon className="h-3.5 w-3.5" /></button>
            ))}
          </div>
          <div className="relative">
            <textarea rows={4} className="w-full resize-none bg-transparent px-3 py-2.5 text-[13px] text-ink focus:outline-none" defaultValue={p.desc} />
            <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-muted">{p.descCount}</span>
          </div>
        </div>
      </Field>
    </div>
  );
}

function PricingCard({ p }: { p: Product }) {
  return (
    <div className={cn(card, "p-4")}>
      <h3 className="text-[14px] font-semibold text-ink">Pricing</h3>
      <div className="mt-3 space-y-3">
        <Field label="Price (NGN)"><input className={inputCls} defaultValue={p.price.replace("₦", "")} /></Field>
        <Field label="Compare at Price (NGN)"><input className={inputCls} defaultValue={p.compareAt.replace("₦", "")} /></Field>
        <Check on={p.onSale} label="On Sale" />
        <Field label="Cost Price (NGN)"><input className={inputCls} defaultValue={p.costPrice.replace("₦", "")} /></Field>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-muted">Profit</span>
          <span className="text-[13px] font-semibold text-success">{p.profit} ({p.profitPct})</span>
        </div>
      </div>
    </div>
  );
}

function InventoryCard({ p }: { p: Product }) {
  return (
    <div className={cn(card, "p-4")}>
      <h3 className="text-[14px] font-semibold text-ink">Inventory</h3>
      <div className="mt-3 space-y-3">
        <Field label="SKU"><input className={inputCls} defaultValue={p.sku} /></Field>
        <Field label="Stock Quantity"><input className={inputCls} defaultValue={String(p.stock)} /></Field>
        <Field label="Low Stock Alert"><input className={inputCls} defaultValue={String(p.lowStockAlert)} /></Field>
        <Check on={p.trackInventory} label="Track Inventory" />
      </div>
    </div>
  );
}

function VariantsCard({ p }: { p: Product }) {
  return (
    <div className={cn(card, "p-4")}>
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-ink">Variants ({p.variants.length})</h3>
        <button className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-medium text-ink hover:border-white/15">Manage</button>
      </div>
      <div className="mt-3 space-y-2">
        {p.variants.map((v) => (
          <div key={v.sku} className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-3 py-2.5">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-brand" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[13px] font-medium text-ink">{v.name}</span>
              <span className="block text-[11px] text-muted">SKU: {v.sku}</span>
            </span>
            <span className="text-[12px] font-medium text-ink">{v.price}</span>
            <span className="w-7 text-right text-[12px] text-muted">{v.stock}</span>
            <button className="text-muted hover:text-ink"><MoreVertical className="h-4 w-4" /></button>
          </div>
        ))}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-2.5 text-[13px] font-medium text-muted hover:text-ink">
          <Plus className="h-4 w-4" /> Add Variant
        </button>
      </div>
    </div>
  );
}

function MediaCard() {
  return (
    <div className={cn(card, "p-4")}>
      <h3 className="text-[14px] font-semibold text-ink">Media &amp; Files</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button className="flex h-[88px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line text-muted">
          <Upload className="h-5 w-5" />
          <span className="text-center text-[11px]">Drag &amp; drop files here<br />or click to upload</span>
        </button>
        <div className="space-y-2">
          {EDITOR_MEDIA.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-3 py-2.5">
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", m.type === "PDF" ? "bg-danger/15 text-danger" : "bg-brand-50 text-brand-400")}>
                {m.type === "PDF" ? <FileText className="h-4 w-4" /> : <Film className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[12px] font-medium text-ink">{m.name}</span>
                <span className="block text-[11px] text-muted">{m.size} · {m.type}</span>
              </span>
              <button className="text-muted hover:text-ink"><Download className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoriesCard() {
  return (
    <div className={cn(card, "p-4")}>
      <h3 className="text-[14px] font-semibold text-ink">Categories</h3>
      <div className="mt-3 space-y-2.5">
        {EDITOR_CATEGORIES.map((c) => (
          <Check key={c.name} on={c.checked} label={c.name} />
        ))}
        <button className="flex items-center gap-1.5 pt-1 text-[12px] font-medium text-brand-400">
          <Plus className="h-3.5 w-3.5" /> Add New Category
        </button>
      </div>
    </div>
  );
}

function SeoPanel({ p }: { p: Product }) {
  return (
    <div className="space-y-3.5">
      <h3 className="text-[14px] font-semibold text-ink">Search Engine Listing</h3>
      <Field label="Meta Title"><input className={inputCls} defaultValue={`${p.name} — ${p.brand}`} /></Field>
      <Field label="Meta Description"><textarea rows={3} className={cn(inputCls, "resize-none")} defaultValue={p.shortDesc} /></Field>
      <Field label="URL Handle">
        <div className="relative">
          <input className={cn(inputCls, "pr-9")} defaultValue={p.slug} />
          <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </Field>
    </div>
  );
}

function EditorHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
      <button className="flex items-center gap-2 text-[13px] font-medium text-ink">
        <ChevronLeft className="h-4 w-4" /> {label}
      </button>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-semibold text-success">
          Active <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-lg bg-brand-grad px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-glow">Save Changes</button>
      </div>
    </div>
  );
}

const EDITOR_TABS = ["General", "Inventory", "Variants", "Media", "SEO"] as const;
type EditorTab = (typeof EDITOR_TABS)[number];

/* ───────────────── DESKTOP ───────────────── */
function DesktopLayout({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  const [tab, setTab] = useState<EditorTab>("General");
  const p = PRODUCTS.find((x) => x.id === selectedId)!;
  return (
    <div className="hidden h-[100dvh] overflow-hidden xl:flex">
      <Sidebar activeKey="products" />
      <main className="flex h-[100dvh] min-w-0 flex-1 flex-col gap-4 overflow-hidden p-6">
        <ProductsTopBar />
        <div className="grid min-h-0 flex-1 grid-cols-[1.32fr_1fr] gap-5">
          {/* list */}
          <section className="flex min-h-0 flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input placeholder="Search products..." className={cn(inputCls, "pl-9")} />
              </div>
              <SelectBox label="All Categories" className="w-[150px]" />
              <SelectBox label="All Status" className="w-[130px]" />
              <button className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-[13px] font-medium text-ink"><Filter className="h-4 w-4" /> Filter</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DESKTOP_TABS.map((t, i) => <Pill key={t.label} active={i === 0} count={t.count}>{t.label}</Pill>)}
            </div>
            <div className={cn(card, "flex min-h-0 flex-1 flex-col")}>
              <ProductTable selectedId={selectedId} onSelect={onSelect} />
              <TableFooter />
            </div>
          </section>
          {/* editor */}
          <section className={cn(card, "flex min-h-0 flex-col")}>
            <EditorHeader label="Edit Product" />
            <div className="flex gap-5 border-b border-line px-4">
              {EDITOR_TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn("border-b-2 py-2.5 text-[13px] font-medium transition", tab === t ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink")}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar p-4">
              {tab === "General" && (
                <div className="grid grid-cols-[1.35fr_1fr] gap-4">
                  <div className="space-y-4">
                    <ImageGallery p={p} />
                    <ProductInfo p={p} />
                  </div>
                  <div className="space-y-4">
                    <PricingCard p={p} />
                    <InventoryCard p={p} />
                    <VariantsCard p={p} />
                  </div>
                </div>
              )}
              {tab === "Inventory" && <div className="max-w-md space-y-4"><InventoryCard p={p} /></div>}
              {tab === "Variants" && <div className="max-w-lg space-y-4"><VariantsCard p={p} /></div>}
              {tab === "Media" && <div className="space-y-4"><MediaCard /><CategoriesCard /></div>}
              {tab === "SEO" && <div className="max-w-lg"><SeoPanel p={p} /></div>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ───────────────── TABLET ───────────────── */
function TabletLayout({ selectedId, onSelect, onMenu }: { selectedId: string; onSelect: (id: string) => void; onMenu: () => void }) {
  const p = PRODUCTS.find((x) => x.id === selectedId)!;
  return (
    <div className="hidden h-[100dvh] overflow-hidden lg:flex xl:hidden">
      <Sidebar activeKey="products" />
      <main className="flex h-[100dvh] min-w-0 flex-1 flex-col gap-4 overflow-hidden p-5">
        <ProductsTopBar tablet onMenu={onMenu} />
        <div className="grid min-h-0 flex-1 grid-cols-[290px_1fr] gap-4">
          {/* list */}
          <section className="flex min-h-0 flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input placeholder="Search products..." className={cn(inputCls, "pl-9")} />
              </div>
              <button className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line bg-surface-2 text-muted"><Filter className="h-4 w-4" /></button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TABLET_TABS.map((t, i) => <Pill key={t.label} active={i === 0} count={t.count}>{t.label}</Pill>)}
            </div>
            <div className={cn(card, "flex min-h-0 flex-1 flex-col p-2.5")}>
              <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto no-scrollbar">
                {PRODUCTS.map((x) => <ProductCard key={x.id} p={x} selected={x.id === selectedId} onSelect={() => onSelect(x.id)} />)}
              </div>
              <div className="mt-2 border-t border-line pt-2 text-center text-[11px] text-muted">Showing 1 to 8 of 128</div>
            </div>
          </section>
          {/* editor (expanded, scrolls within panel) */}
          <section className={cn(card, "flex min-h-0 flex-col")}>
            <EditorHeader label="Back" />
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto no-scrollbar p-4">
              <div className="grid grid-cols-[1fr_1.1fr] gap-4">
                <ImageGallery p={p} />
                <ProductInfo p={p} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <PricingCard p={p} />
                <InventoryCard p={p} />
                <VariantsCard p={p} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MediaCard />
                <CategoriesCard />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ───────────────── MOBILE ───────────────── */
function MobileStatCard({ s }: { s: (typeof MOBILE_STATS)[number] }) {
  const dot: Record<string, string> = { brand: "bg-brand-400", success: "bg-success", warning: "bg-warning", danger: "bg-danger" };
  return (
    <div className={cn(card, "p-3.5")}>
      <div className="flex items-center gap-1.5 text-[12px] text-muted">
        <span className={cn("h-2 w-2 rounded-full", dot[s.tone])} /> {s.label}
      </div>
      <div className="mt-2 font-display text-[22px] font-bold leading-none text-ink">{s.value}</div>
      <div className={cn("mt-1.5 text-[11px]", s.delta ? "text-success" : "text-muted")}>{s.delta ? "▲ " : ""}{s.note}</div>
    </div>
  );
}

function MobileRow({ p, onOpen }: { p: (typeof MOBILE_PRODUCTS)[number]; onOpen: () => void }) {
  const stockTone = p.status === "Out of Stock" ? "text-danger" : p.status === "Low Stock" ? "text-warning" : "text-success";
  return (
    <div className={cn(card, "flex items-center gap-2.5 p-3")} onClick={onOpen}>
      <span className="h-[18px] w-[18px] shrink-0 rounded-[6px] border border-line" />
      <img src={p.img} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[13px] font-semibold text-ink">{p.name}</span>
        <span className="block text-[11px] text-muted">SKU: {p.sku}</span>
        <span className="block text-[13px] font-semibold text-ink">{p.price}</span>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 leading-tight">
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", statusBadge(p.status))}>{p.status}</span>
        <span className={cn("text-[11px]", stockTone)}>{p.stockLabel}</span>
        <span className="text-[11px] text-muted">{p.variants} variants</span>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-2">
        <Toggle on={p.visible} />
        <div className="flex gap-1.5 text-muted">
          <Pencil className="h-4 w-4" />
          <Copy className="h-4 w-4" />
          <MoreVertical className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function MobileSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const s = MOBILE_SHEET;
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", `Variants ${s.variants}`, "Inventory", "Pricing"];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-x-0 bottom-[68px] z-30 mx-auto max-w-[720px] rounded-t-3xl border-t border-white/10 bg-surface px-4 pb-4 pt-3 shadow-card lg:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/15" />
          <div className="flex items-center gap-3">
            <img src={s.img} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold text-ink">{s.name}</span>
            </div>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", statusBadge(s.status))}>{s.status}</span>
            <button onClick={onClose} className="text-muted"><X className="h-5 w-5" /></button>
          </div>
          <div className="mt-3 flex gap-4 border-b border-line">
            {tabs.map((t) => {
              const key = t.split(" ")[0];
              return (
                <button key={t} onClick={() => setTab(key)} className={cn("border-b-2 pb-2 text-[13px] font-medium", tab === key ? "border-brand text-ink" : "border-transparent text-muted")}>{t}</button>
              );
            })}
          </div>
          <div className="mt-3 max-h-[42vh] overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[11px] text-muted">SKU</span>
                <div className="mt-0.5 flex items-center gap-1 text-[13px] font-medium text-ink">{s.sku} <Copy className="h-3 w-3 text-muted" /></div>
              </div>
              <div>
                <span className="text-[11px] text-muted">Price</span>
                <div className="mt-0.5 flex items-center gap-1 text-[13px] font-medium text-ink">{s.price} <Pencil className="h-3 w-3 text-muted" /></div>
              </div>
              <div>
                <span className="text-[11px] text-muted">Stock</span>
                <div className="mt-0.5 flex items-center gap-1 text-[13px] font-medium text-ink">{s.stock} <Pencil className="h-3 w-3 text-muted" /></div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted">Description</span>
                <Pencil className="h-3.5 w-3.5 text-muted" />
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink/90">{s.desc}</p>
            </div>
            <div className={cn(card, "mt-3 flex items-center gap-2 bg-surface-2 p-3")}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-grad text-white"><Sparkles className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1 leading-tight">
                <span className="block text-[12px] font-semibold text-ink">AI Assistant <span className="ml-1 rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] text-brand-400">Beta</span></span>
                <span className="block text-[11px] text-muted">Need help improving this product?</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {AI_PRODUCT_CHIPS.map((c) => <span key={c} className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] text-brand-400">{c}</span>)}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileLayout({ onMenu, onOpenSheet, sheetOpen, onCloseSheet }: { onMenu: () => void; onOpenSheet: () => void; sheetOpen: boolean; onCloseSheet: () => void }) {
  return (
    <div className="lg:hidden">
      <MobileTopBar onMenu={onMenu} tagline={false} showSearch />
      <main className="mx-auto max-w-[720px] space-y-4 px-4 pb-[200px] pt-[76px]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-[24px] font-bold text-ink">Products</h1>
            <p className="mt-1 text-[13px] text-muted">Manage your products, inventory and variants.</p>
          </div>
          <button className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-grad px-3.5 py-2.5 text-[12px] font-semibold text-white shadow-glow">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MOBILE_STATS.map((s) => <MobileStatCard key={s.label} s={s} />)}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MOBILE_TABS_P.map((t, i) => <Pill key={t.label} active={i === 0} count={t.count}>{t.label}</Pill>)}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input placeholder="Search products..." className={cn(inputCls, "pl-9")} />
          </div>
          <button className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[13px] text-ink"><Filter className="h-4 w-4" /> Filter</button>
          <button className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[13px] text-ink"><ArrowUpDown className="h-4 w-4" /> Sort</button>
        </div>
        <div className="space-y-3">
          {MOBILE_PRODUCTS.map((p) => <MobileRow key={p.id} p={p} onOpen={onOpenSheet} />)}
        </div>
      </main>
      <MobileSheet open={sheetOpen} onClose={onCloseSheet} />
      <MobileBottomNav activeKey="products" />
    </div>
  );
}

/* ───────────────── root ───────────────── */
export function ProductsManager() {
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const [drawer, setDrawer] = useState(false);
  const [sheet, setSheet] = useState(true);
  return (
    <div className="min-h-[100dvh] bg-canvas text-ink">
      <MobileLayout
        onMenu={() => setDrawer(true)}
        onOpenSheet={() => setSheet(true)}
        sheetOpen={sheet}
        onCloseSheet={() => setSheet(false)}
      />
      <TabletLayout selectedId={selectedId} onSelect={setSelectedId} onMenu={() => setDrawer(true)} />
      <DesktopLayout selectedId={selectedId} onSelect={setSelectedId} />
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} activeKey="products" />
    </div>
  );
}
