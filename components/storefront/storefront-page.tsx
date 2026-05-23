"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, Search, ShoppingCart, Heart, Star, Home, LayoutGrid,
  User, ChevronDown, ArrowRight, Truck, RefreshCw, ShieldCheck,
  Headphones, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  STORE, ANNOUNCEMENT, NAV_LINKS, SLIDES, CATEGORIES,
  FEATURED, NEW_ARRIVALS, TRUST, type SfProduct,
} from "@/lib/storefront-mock";

/* ─── LW logo mark ─── */
function LWMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <span className="font-display text-[1.4rem] italic font-bold leading-none tracking-tight text-ink">LW</span>
      <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink hidden sm:block">Luxe Wears</span>
    </div>
  );
}

/* ─── announcement bar ─── */
function AnnouncementBar() {
  return (
    <div className="flex shrink-0 items-center justify-center gap-2 border-b border-line bg-surface-2/60 py-2 text-center text-[11.5px] font-medium text-muted">
      <Truck className="h-3.5 w-3.5 text-brand-400" />
      {ANNOUNCEMENT}
    </div>
  );
}

/* ─── storefront header ─── */
function StorefrontHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-line bg-canvas px-4 lg:h-16 lg:px-6">
      {/* Mobile */}
      <div className="flex flex-1 items-center gap-3 lg:hidden">
        <button onClick={onMenu} className="text-muted" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </button>
        <LWMark />
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-muted" aria-label="Search"><Search className="h-5 w-5" /></button>
        <button className="relative text-ink" aria-label="Cart">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">2</span>
        </button>
      </div>

      {/* Tablet + Desktop */}
      <div className="hidden flex-1 items-center gap-6 lg:flex">
        <LWMark className="mr-2" />
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((n) => (
            <button
              key={n.label}
              className={cn(
                "flex items-center gap-0.5 px-3 py-1.5 text-[13.5px] font-medium transition-colors",
                n.active ? "text-brand-400 border-b-2 border-brand-400 pb-[5px]" : "text-muted hover:text-ink"
              )}
            >
              {n.label}
              {n.dropdown && <ChevronDown className="h-3.5 w-3.5 ml-0.5" />}
            </button>
          ))}
        </nav>
      </div>
      <div className="hidden items-center gap-3 lg:flex">
        {/* Search bar — desktop xl+ only */}
        <div className="hidden xl:flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 w-[220px]">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input placeholder="Search for products..." className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-muted focus:outline-none" />
          <kbd className="rounded border border-line px-1 text-[10px] text-muted">⌘K</kbd>
        </div>
        {/* Search icon — tablet lg–xl */}
        <button className="hidden lg:flex xl:hidden h-9 w-9 items-center justify-center rounded-xl border border-line text-muted">
          <Search className="h-4 w-4" />
        </button>
        <button className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl border border-line text-muted" aria-label="Account">
          <User className="h-4 w-4" />
        </button>
        <button className="relative flex h-9 items-center gap-2 rounded-xl border border-line px-3 text-ink" aria-label="Cart">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-[13px] font-medium">Cart</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">2</span>
        </button>
      </div>
    </header>
  );
}

/* ─── hero carousel ─── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);
  const s = SLIDES[current];

  return (
    <div className="relative h-[340px] overflow-hidden bg-canvas lg:h-[460px] xl:h-[500px]">
      {/* model image */}
      <img
        key={`img-${current}`}
        src={s.img}
        alt=""
        className="absolute right-0 top-0 h-full w-[62%] object-cover object-top opacity-100 transition-opacity duration-500"
      />
      {/* gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, #0B1220 32%, rgba(11,18,32,0.75) 52%, rgba(11,18,32,0.2) 72%, transparent)" }}
      />

      {/* text content — key causes re-mount + sov-in fade on slide change */}
      <div key={`txt-${current}`} className="sov-in absolute inset-0 flex flex-col justify-center px-5 lg:px-10 xl:px-16">
        <span className="mb-3 inline-flex w-fit rounded-md border border-brand-400/40 bg-brand-50/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-400">
          {s.tag}
        </span>
        <h1 className="font-display max-w-[52%] text-[1.6rem] font-bold leading-tight text-ink lg:text-[2.4rem] xl:text-[2.8rem]">
          {s.heading}
        </h1>
        <p className="mt-2.5 max-w-[45%] text-[13px] leading-relaxed text-muted lg:text-[15px]">{s.sub}</p>
        <button className="mt-5 flex w-fit items-center gap-2 rounded-xl bg-brand-grad px-5 py-2.5 text-[13px] font-semibold text-white lg:px-6 lg:py-3 lg:text-[14px]">
          {s.cta} <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* prev / next arrows — desktop only */}
      <button onClick={prev} className="absolute left-3 top-1/2 hidden -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas/60 text-muted backdrop-blur-none hover:text-ink lg:flex">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 hidden -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas/60 text-muted backdrop-blur-none hover:text-ink lg:flex">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn("h-2 rounded-full transition-[width,background-color] duration-300", i === current ? "w-5 bg-brand-400" : "w-2 bg-white/30")}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── section header ─── */
function SectionHead({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-0">
      <h2 className="font-display text-[18px] font-bold text-ink lg:text-[20px]">{title}</h2>
      <button className="flex items-center gap-1 text-[13px] font-medium text-brand-400 hover:text-brand">
        View all <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ─── category section ─── */
function CategoryTile({ c }: { c: (typeof CATEGORIES)[number] }) {
  return (
    <button className="group flex flex-none flex-col gap-2 lg:flex-auto">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-2">
        <img src={c.img} alt={c.label} className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/60 to-transparent" />
      </div>
      <span className="text-center text-[12.5px] font-medium text-ink">{c.label}</span>
    </button>
  );
}

function CategorySection() {
  return (
    <div className="py-6">
      <SectionHead title="Shop by Category" />
      <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar px-4 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
        {CATEGORIES.map((c) => (
          <div key={c.label} className="w-[110px] flex-none lg:w-auto">
            <CategoryTile c={c} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── product card ─── */
function ProductCard({ p, showNew }: { p: SfProduct; showNew?: boolean }) {
  const stars = Math.round(p.rating);
  return (
    <button className="group flex flex-col text-left w-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-2">
        <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {showNew && (
          <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">New</span>
        )}
        <button
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white"
          onClick={(e) => e.stopPropagation()}
          aria-label="Add to wishlist"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-2.5 space-y-1 px-0.5">
        <p className="text-[13px] font-medium leading-snug text-ink line-clamp-1">{p.name}</p>
        <p className="text-[14px] font-semibold text-ink">{p.price}</p>
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-3 w-3", i < stars ? "fill-warning text-warning" : "fill-transparent text-muted")}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted">{p.rating} ({p.reviews})</span>
        </div>
      </div>
    </button>
  );
}

/* ─── product section ─── */
function ProductSection({ title, products, showNew }: { title: string; products: SfProduct[]; showNew?: boolean }) {
  return (
    <div className="py-6">
      <SectionHead title={title} />
      <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar px-4 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:gap-4">
        {products.map((p) => (
          <div key={p.id} className="w-[160px] flex-none lg:w-auto">
            <ProductCard p={p} showNew={showNew} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── trust bar ─── */
function TrustIcon({ icon }: { icon: string }) {
  if (icon === "truck") return <Truck className="h-6 w-6 text-brand-400" />;
  if (icon === "refresh") return <RefreshCw className="h-6 w-6 text-brand-400" />;
  if (icon === "shield") return <ShieldCheck className="h-6 w-6 text-brand-400" />;
  return <Headphones className="h-6 w-6 text-brand-400" />;
}

function TrustBar() {
  return (
    <div className="mt-2 border-t border-line py-5">
      <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-0">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
              <TrustIcon icon={t.icon} />
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
          { icon: Home, label: "Home", active: true },
          { icon: LayoutGrid, label: "Categories" },
          { icon: Search, label: "Search" },
          { icon: ShoppingCart, label: "Cart", badge: 2 },
          { icon: User, label: "Account" },
        ].map(({ icon: Icon, label, active, badge }) => (
          <button key={label} className={cn("flex flex-col items-center gap-1", active ? "text-brand-400" : "text-muted")}>
            <span className="relative">
              <Icon className="h-[22px] w-[22px]" />
              {badge != null && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
                  {badge}
                </span>
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
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="flex items-center justify-between">
              <LWMark />
              <button onClick={onClose} className="text-muted"><X className="h-5 w-5" /></button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((n) => (
                <button key={n.label} className={cn("flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium", n.active ? "text-brand-400 bg-brand-50/40" : "text-ink hover:bg-white/[0.04]")}>
                  {n.label}
                  {n.dropdown && <ChevronDown className="h-4 w-4 text-muted" />}
                </button>
              ))}
            </nav>
            <div className="mt-auto space-y-3">
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium text-muted hover:text-ink">
                <Search className="h-5 w-5" /> Search
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium text-muted hover:text-ink">
                <User className="h-5 w-5" /> Account
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium text-muted hover:text-ink">
                <ShoppingCart className="h-5 w-5" /> Cart (2)
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── root ─── */
export function StorefrontPage({ slug }: { slug: string }) {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-canvas text-ink">
      <AnnouncementBar />
      <StorefrontHeader onMenu={() => setDrawer(true)} />
      <main className="flex-1 overflow-y-auto overscroll-contain will-change-transform">
        <div className="mx-auto max-w-[1280px] px-0 lg:px-8 xl:px-10">
          <HeroCarousel />
          <div className="pb-8 pt-2">
            <CategorySection />
            <ProductSection title="Featured Products" products={FEATURED} />
            <ProductSection title="New Arrivals" products={NEW_ARRIVALS} showNew />
            <TrustBar />
          </div>
        </div>
      </main>
      <StorefrontBottomNav />
      <StorefrontDrawer open={drawer} onClose={() => setDrawer(false)} />
    </div>
  );
}
