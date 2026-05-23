"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, Search, ShoppingCart, Heart, Star, Truck,
  Zap, Info, ChevronDown, Menu, X, ArrowRight, User, LayoutGrid, Home,
  Minus, Plus, ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  STORE, ANNOUNCEMENT, NAV_LINKS, TRUST,
  PRODUCT_DETAIL, SIMILAR_PRODUCTS,
  type SfProduct,
} from "@/lib/storefront-mock";

/* ─── brand icons (lucide has no brand icons) ─── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.05-1.32A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.57c-.21.58-1.21 1.11-1.66 1.17-.43.06-.97.08-1.56-.1-.36-.11-.82-.26-1.42-.51-2.49-1.07-4.12-3.57-4.24-3.73-.12-.16-.98-1.3-.98-2.48 0-1.18.62-1.76.84-2 .22-.24.48-.3.64-.3h.46c.15 0 .35-.06.55.42l.77 1.86c.06.12.1.27.02.43-.08.16-.12.26-.24.4l-.36.43c-.12.12-.24.25-.1.49.14.24.62.99 1.32 1.61.91.81 1.67 1.06 1.91 1.17.24.11.38.09.52-.05.14-.14.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.15 1.16z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ─── shared small pieces ─── */
function LWMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex select-none items-center gap-2.5", className)}>
      <span className="font-display text-[1.35rem] font-bold italic leading-none tracking-tight text-ink">LW</span>
      <span className="hidden font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink sm:block">
        Luxe Wears
      </span>
    </div>
  );
}

function AnnouncementBar() {
  return (
    <div className="flex shrink-0 items-center justify-center gap-2 border-b border-line bg-surface-2/60 py-2 text-[11.5px] font-medium text-muted">
      <Truck className="h-3.5 w-3.5 text-brand-400" />
      {ANNOUNCEMENT}
    </div>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-[18px] font-bold text-ink">{title}</h2>
      <button className="flex items-center gap-1 text-[13px] font-medium text-brand-400">
        View all <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ─── storefront nav header (tablet + desktop) ─── */
function StorefrontHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-line bg-canvas px-4 lg:h-16 lg:px-6">
      <div className="flex flex-1 items-center gap-3 lg:hidden">
        <button onClick={onMenu} className="text-muted"><Menu className="h-6 w-6" /></button>
        <LWMark />
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-muted"><Search className="h-5 w-5" /></button>
        <button className="relative text-ink">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">2</span>
        </button>
      </div>
      <div className="hidden flex-1 items-center gap-6 lg:flex">
        <LWMark className="mr-2" />
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((n) => (
            <button key={n.label} className={cn("flex items-center gap-0.5 px-3 py-1.5 text-[13.5px] font-medium transition-colors", n.active ? "text-brand-400" : "text-muted hover:text-ink")}>
              {n.label}{n.dropdown && <ChevronDown className="ml-0.5 h-3.5 w-3.5" />}
            </button>
          ))}
        </nav>
      </div>
      <div className="hidden items-center gap-3 lg:flex">
        <div className="hidden xl:flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 w-[200px]">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input placeholder="Search for products..." className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-muted focus:outline-none" />
          <kbd className="rounded border border-line px-1 text-[10px] text-muted">⌘K</kbd>
        </div>
        <button className="hidden lg:flex xl:hidden h-9 w-9 items-center justify-center rounded-xl border border-line text-muted"><Search className="h-4 w-4" /></button>
        <button className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl border border-line text-muted"><User className="h-4 w-4" /></button>
        <button className="relative flex h-9 items-center gap-2 rounded-xl border border-line px-3 text-ink">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-[13px] font-medium">Cart</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">2</span>
        </button>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center gap-1.5 py-3 text-[12px] text-muted">
      {PRODUCT_DETAIL.breadcrumb.map((crumb, i) => (
        <span key={crumb} className="flex items-center gap-1.5">
          {i > 0 && <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-muted/50" />}
          <button className={cn(i === PRODUCT_DETAIL.breadcrumb.length - 1 ? "text-ink font-medium" : "hover:text-ink transition-colors")}>
            {crumb}
          </button>
        </span>
      ))}
    </div>
  );
}

/* ─── mobile-only back-arrow header ─── */
function ProductDetailHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-line bg-canvas px-4">
      <button onClick={() => window.history.back()} className="mr-3 text-muted" aria-label="Go back">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="flex flex-1 items-center justify-center">
        <LWMark />
      </div>
      <div className="flex items-center gap-4 ml-3">
        <button className="text-muted"><Search className="h-5 w-5" /></button>
        <button className="relative text-ink">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">2</span>
        </button>
      </div>
    </header>
  );
}

/* ─── product gallery ─── */
function ProductGallery({ activeId, onThumb }: { activeId: string; onThumb: (id: string) => void }) {
  const p = PRODUCT_DETAIL;
  const active = p.images.find((i) => i.id === activeId) ?? p.images[0];
  const idx = p.images.findIndex((i) => i.id === activeId);
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-2">
        <img key={activeId} src={active.url} alt={active.alt} className="sov-in h-full w-full object-cover object-center" />
        <span className="absolute left-3 top-3 rounded-full border border-brand-400/50 bg-brand-50/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-400">
          {p.tag}
        </span>
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white">
          <Heart className="h-4 w-4" />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white">
          {idx + 1}/{p.images.length}
        </span>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {p.images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => onThumb(img.id)}
            className={cn("h-16 w-16 flex-none overflow-hidden rounded-xl border-2 transition-colors", img.id === activeId ? "border-brand-400" : "border-transparent opacity-60 hover:opacity-100")}
          >
            <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── product info block ─── */
function ProductInfoBlock() {
  const p = PRODUCT_DETAIL;
  return (
    <div className="space-y-1.5">
      <div className="flex items-start justify-between gap-2">
        <h1 className="font-display text-[20px] font-bold leading-tight text-ink lg:text-[22px]">{p.name}</h1>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> In Stock
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(p.rating) ? "fill-warning text-warning" : "fill-transparent text-muted")} />
          ))}
        </div>
        <span className="text-[12px] text-muted">{p.rating} ({p.reviews} reviews)</span>
      </div>
      <p className="font-display text-[24px] font-bold text-ink lg:text-[26px]">{p.price}</p>
      <p className="text-[13px] leading-relaxed text-muted">{p.description}</p>
    </div>
  );
}

/* ─── size selector ─── */
function SizeSelector({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">Size</span>
        <button className="text-[12px] font-medium text-brand-400">Size guide</button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {PRODUCT_DETAIL.sizes.map((s) => (
          <button
            key={s.value}
            onClick={() => onSelect(s.value)}
            disabled={!s.available}
            className={cn(
              "h-9 min-w-[44px] rounded-xl border px-3 text-[13px] font-medium transition-colors",
              selected === s.value
                ? "border-brand-400 bg-brand-50/40 text-brand-400"
                : s.available
                ? "border-line text-muted hover:border-white/20 hover:text-ink"
                : "border-line text-white/20 line-through cursor-not-allowed"
            )}
          >
            {s.value}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── color swatches ─── */
function ColorSwatches({ selected, onSelect }: { selected: string; onSelect: (n: string) => void }) {
  return (
    <div>
      <span className="text-[13px] font-semibold text-ink">Color</span>
      <div className="mt-2.5 flex gap-3">
        {PRODUCT_DETAIL.colors.map((c) => (
          <button
            key={c.name}
            onClick={() => onSelect(c.name)}
            title={c.name}
            className={cn("h-8 w-8 rounded-full border-2 transition-colors", selected === c.name ? "border-brand-400 scale-110" : "border-transparent")}
            style={{
              background: c.hex2
                ? `linear-gradient(135deg, ${c.hex} 50%, ${c.hex2} 50%)`
                : c.hex,
              boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── qty stepper ─── */
function QtyStepper({ qty, onMinus, onPlus }: { qty: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div>
      <span className="text-[13px] font-semibold text-ink">Quantity</span>
      <div className="mt-2.5 flex h-10 w-fit items-center rounded-xl border border-line bg-surface-2">
        <button onClick={onMinus} className="flex h-full w-10 items-center justify-center text-muted transition-colors hover:text-ink" disabled={qty <= 1}>
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-[32px] text-center text-[14px] font-semibold text-ink">{qty}</span>
        <button onClick={onPlus} className="flex h-full w-10 items-center justify-center text-muted transition-colors hover:text-ink">
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── delivery card ─── */
function DeliveryCard() {
  const p = PRODUCT_DETAIL;
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-3">
      <div className="flex items-start gap-2.5">
        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
        <div className="leading-snug">
          <p className="text-[12px] font-medium text-ink">{p.deliveryNote}</p>
          <p className="mt-0.5 text-[11px] text-muted">
            Estimated delivery:{" "}
            <span className="font-semibold text-brand-400">{p.deliveryEst}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── add to cart + buy now ─── */
function AddToCartBar({ qty }: { qty: number }) {
  return (
    <div className="grid grid-cols-[1.8fr_1fr] gap-3">
      <button className="flex items-center justify-center gap-2 rounded-xl bg-brand-grad py-3 text-[14px] font-semibold text-white">
        <ShoppingBag className="h-4 w-4" /> Add to Cart
      </button>
      <button className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-white/20">
        <Zap className="h-4 w-4 text-warning" /> Buy Now
      </button>
    </div>
  );
}

/* ─── social checkout ─── */
function SocialCheckout() {
  const p = PRODUCT_DETAIL;
  const waMsg = encodeURIComponent(`Hi, I'd like to order: ${p.name} — ${p.price}`);
  const waUrl = `https://wa.me/${p.whatsappPhone}?text=${waMsg}`;
  const igUrl = `https://instagram.com/${p.instagramHandle}`;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-line" />
        <span className="text-[12px] text-muted">or</span>
        <div className="flex-1 border-t border-line" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-white/20">
          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          <span className="hidden sm:inline">Order via </span>WhatsApp
        </a>
        <a href={igUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-white/20">
          <InstagramIcon className="h-5 w-5 text-[#E1306C]" />
          <span className="hidden sm:inline">DM on </span>Instagram
        </a>
      </div>
    </div>
  );
}

/* ─── product details accordion ─── */
function ProductAccordion() {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-line bg-surface-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3.5"
      >
        <Info className="h-4 w-4 shrink-0 text-brand-400" />
        <span className="flex-1 text-left text-[14px] font-semibold text-ink">Product Details</span>
        <ChevronDown className={cn("h-4 w-4 text-muted transition-transform duration-300", open ? "rotate-180" : "")} />
      </button>
      <div
        style={{
          maxHeight: open ? "240px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        <ul className="space-y-2 px-4 pb-4 pt-1">
          {PRODUCT_DETAIL.productDetailItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── product card (for similar products) ─── */
function ProductCard({ p }: { p: SfProduct }) {
  return (
    <button className="group flex flex-col text-left w-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-2">
        <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white" onClick={(e) => e.stopPropagation()}>
          <Heart className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-2.5 space-y-1 px-0.5">
        <p className="line-clamp-1 text-[13px] font-medium leading-snug text-ink">{p.name}</p>
        <p className="text-[14px] font-semibold text-ink">{p.price}</p>
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn("h-3 w-3", i < Math.round(p.rating) ? "fill-warning text-warning" : "fill-transparent text-muted")} />
            ))}
          </div>
          <span className="text-[11px] text-muted">{p.rating} ({p.reviews})</span>
        </div>
      </div>
    </button>
  );
}

function YouMayAlsoLike() {
  return (
    <div>
      <SectionHead title="You may also like" />
      <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-5 lg:overflow-visible">
        {SIMILAR_PRODUCTS.map((p) => (
          <div key={p.id} className="w-[160px] flex-none lg:w-auto">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── trust bar ─── */
function TrustBar() {
  const icons: Record<string, React.ReactNode> = {
    truck: <Truck className="h-5 w-5 text-brand-400" />,
    refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-brand-400"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>,
    shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-brand-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    headphones: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-brand-400"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  };
  return (
    <div className="mt-4 border-t border-line py-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
              {icons[t.icon]}
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">{t.title}</p>
              <p className="text-[11px] text-muted">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── mobile bottom nav ─── */
function StorefrontBottomNav() {
  return (
    <nav className="h-[64px] shrink-0 border-t border-line bg-canvas lg:hidden">
      <div className="grid h-full grid-cols-5 items-center">
        {[
          { icon: Home, label: "Home" },
          { icon: LayoutGrid, label: "Categories" },
          { icon: Search, label: "Search" },
          { icon: ShoppingCart, label: "Cart", badge: 2 },
          { icon: User, label: "Account" },
        ].map(({ icon: Icon, label, badge }: { icon: React.ElementType; label: string; badge?: number }) => (
          <button key={label} className="flex flex-col items-center gap-1 text-muted">
            <span className="relative">
              <Icon className="h-[22px] w-[22px]" />
              {badge != null && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">{badge}</span>
              )}
            </span>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ─── mobile drawer ─── */
function StorefrontDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/60 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-surface p-5 lg:hidden"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="flex items-center justify-between">
              <LWMark />
              <button onClick={onClose} className="text-muted"><X className="h-5 w-5" /></button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((n) => (
                <button key={n.label} className={cn("flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium", n.active ? "bg-brand-50/40 text-brand-400" : "text-ink hover:bg-white/[0.04]")}>
                  {n.label}{n.dropdown && <ChevronDown className="h-4 w-4 text-muted" />}
                </button>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── layouts ─── */
function MobileLayout({ activeId, onThumb, size, onSize, color, onColor, qty, onMinus, onPlus }: {
  activeId: string; onThumb: (id: string) => void;
  size: string; onSize: (v: string) => void;
  color: string; onColor: (n: string) => void;
  qty: number; onMinus: () => void; onPlus: () => void;
}) {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden lg:hidden">
      <ProductDetailHeader />
      <main className="flex-1 overflow-y-auto overscroll-contain will-change-transform">
        <div className="space-y-5 px-4 py-4 pb-8">
          <ProductGallery activeId={activeId} onThumb={onThumb} />
          <ProductInfoBlock />
          <div className="grid grid-cols-2 gap-4">
            <SizeSelector selected={size} onSelect={onSize} />
            <ColorSwatches selected={color} onSelect={onColor} />
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <QtyStepper qty={qty} onMinus={onMinus} onPlus={onPlus} />
            <DeliveryCard />
          </div>
          <AddToCartBar qty={qty} />
          <SocialCheckout />
          <ProductAccordion />
          <YouMayAlsoLike />
        </div>
      </main>
      <StorefrontBottomNav />
    </div>
  );
}

function DesktopLayout({ activeId, onThumb, onMenu, size, onSize, color, onColor, qty, onMinus, onPlus }: {
  activeId: string; onThumb: (id: string) => void; onMenu: () => void;
  size: string; onSize: (v: string) => void;
  color: string; onColor: (n: string) => void;
  qty: number; onMinus: () => void; onPlus: () => void;
}) {
  return (
    <div className="hidden h-[100dvh] flex-col overflow-hidden lg:flex">
      <AnnouncementBar />
      <StorefrontHeader onMenu={onMenu} />
      <main className="flex-1 overflow-y-auto overscroll-contain will-change-transform">
        <div className="mx-auto max-w-[1280px] px-8 xl:px-10">
          <Breadcrumb />
          {/* two-pane */}
          <div className="grid grid-cols-[1.05fr_1fr] gap-10 xl:gap-14 pb-6">
            {/* left: gallery + accordion */}
            <div className="space-y-5">
              <ProductGallery activeId={activeId} onThumb={onThumb} />
              <ProductAccordion />
            </div>
            {/* right: info + all actions */}
            <div className="space-y-5">
              <ProductInfoBlock />
              <SizeSelector selected={size} onSelect={onSize} />
              <ColorSwatches selected={color} onSelect={onColor} />
              <div className="grid grid-cols-2 gap-4 items-start">
                <QtyStepper qty={qty} onMinus={onMinus} onPlus={onPlus} />
                <DeliveryCard />
              </div>
              <AddToCartBar qty={qty} />
              <SocialCheckout />
            </div>
          </div>
          {/* similar products */}
          <div className="border-t border-line py-8">
            <YouMayAlsoLike />
          </div>
          <TrustBar />
        </div>
      </main>
    </div>
  );
}

/* ─── root ─── */
export function ProductDetailPage({ slug, productId }: { slug: string; productId: string }) {
  const [activeId, setActiveId] = useState(PRODUCT_DETAIL.images[0].id);
  const [size, setSize] = useState(PRODUCT_DETAIL.defaultSize);
  const [color, setColor] = useState(PRODUCT_DETAIL.defaultColor);
  const [qty, setQty] = useState(1);
  const [drawer, setDrawer] = useState(false);

  return (
    <div className="bg-canvas text-ink">
      <MobileLayout
        activeId={activeId} onThumb={setActiveId}
        size={size} onSize={setSize}
        color={color} onColor={setColor}
        qty={qty} onMinus={() => setQty((q) => Math.max(1, q - 1))} onPlus={() => setQty((q) => q + 1)}
      />
      <DesktopLayout
        activeId={activeId} onThumb={setActiveId} onMenu={() => setDrawer(true)}
        size={size} onSize={setSize}
        color={color} onColor={setColor}
        qty={qty} onMinus={() => setQty((q) => Math.max(1, q - 1))} onPlus={() => setQty((q) => q + 1)}
      />
      <StorefrontDrawer open={drawer} onClose={() => setDrawer(false)} />
    </div>
  );
}
