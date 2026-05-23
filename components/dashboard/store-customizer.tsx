"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, ShoppingBag, Tag, Users, BarChart3, Megaphone, Ticket, Boxes,
  Settings, Globe, Smartphone, Landmark, Eye, Save, Bell, ChevronDown,
  HelpCircle, ExternalLink, Paintbrush, Wand2, AlignLeft, FileText,
  Search, Upload, Sparkles, Star, Pencil, Info, Tablet, Monitor,
  ChevronRight, X, Menu, Plus, ArrowRight, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SovcartMark, SovcartLogo } from "@/components/brand/logo";
import { card, Avatar, MobileShell, MobileDrawer } from "@/components/dashboard/shell";
import { SELLER } from "@/lib/dashboard-mock";

/* ─── constants ─── */
const BRAND_COLORS = [
  { label: "Primary", hex: "#0EA5FF", bg: "#0EA5FF" },
  { label: "Secondary", hex: "#22C55E", bg: "#22C55E" },
  { label: "Accent", hex: "#38BDF8", bg: "#38BDF8" },
  { label: "Text", hex: "#F3F4F6", bg: "#F3F4F6" },
  { label: "Background", hex: "#081220", bg: "#081220" },
];
const FONT_OPTIONS = ["Poppins", "Inter", "Roboto", "Manrope", "DM Sans"];
const OTHER_SETTINGS = [
  { key: "darkMode", label: "Enable Dark Mode", info: "Switch your store to a dark background.", default: true },
  { key: "badge", label: "Show Store Badge", info: "Display a 'Powered by Sovcart' badge.", default: true },
  { key: "sticky", label: "Enable Sticky Header", info: "Keep the navigation bar fixed at the top.", default: true },
  { key: "quickView", label: "Enable Quick View", info: "Let shoppers preview products without leaving the page.", default: false },
  { key: "reviews", label: "Enable Product Reviews", info: "Allow customers to leave reviews on products.", default: true },
  { key: "social", label: "Show Social Links", info: "Display your social links in the storefront footer.", default: true },
];
const AI_ACTIONS = [
  { icon: Star, title: "Improve branding", desc: "Strengthen your brand identity and visuals" },
  { icon: Pencil, title: "Optimize store copy", desc: "Enhance your store content and taglines" },
  { icon: Search, title: "Check SEO", desc: "Improve your search ranking and visibility" },
];
const TABS = [
  { key: "branding", label: "Branding", icon: Paintbrush },
  { key: "theme", label: "Theme", icon: Wand2 },
  { key: "homePage", label: "Home Page", icon: Home },
  { key: "navigation", label: "Navigation", icon: AlignLeft },
  { key: "pages", label: "Pages", icon: FileText },
  { key: "seo", label: "SEO", icon: Search },
] as const;
const MAIN_NAV = [
  { label: "Overview", icon: Home },
  { label: "Orders", icon: ShoppingBag, badge: 24 },
  { label: "Products", icon: Tag },
  { label: "Customers", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Marketing", icon: Megaphone },
  { label: "Discounts", icon: Ticket },
  { label: "Apps", icon: Boxes },
  { label: "Settings", icon: Settings },
];
const formInput =
  "w-full rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[13px] text-ink placeholder:text-muted focus:border-brand-400/50 focus:outline-none";

/* ─── toggle (GPU-safe: transition-colors + transition-transform) ─── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={cn("relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors", on ? "bg-brand" : "bg-white/15")}
    >
      <span className={cn("inline-block h-4 w-4 rounded-full bg-white shadow transition-transform", on ? "translate-x-[18px]" : "translate-x-0.5")} />
    </button>
  );
}

/* ─── full sidebar (desktop) ─── */
function StoreCustomizerSidebar() {
  return (
    <aside className="hidden h-[100dvh] w-[220px] shrink-0 flex-col border-r border-line bg-surface-2/50 p-4 xl:flex">
      <div className="px-2 py-1">
        <SovcartLogo size={28} tagline />
      </div>
      <nav className="mt-5 flex flex-1 flex-col gap-0.5 overflow-y-auto no-scrollbar">
        {MAIN_NAV.map((item) => (
          <button key={item.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted hover:bg-white/[0.04] hover:text-ink transition-colors">
            <item.icon className="h-[17px] w-[17px] shrink-0" />
            <span>{item.label}</span>
            {item.badge != null && (
              <span className="ml-auto rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-400">{item.badge}</span>
            )}
          </button>
        ))}
        <div className="mt-3 mb-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted/50">Sales Channels</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-brand-grad px-3 py-2.5 shadow-[0_8px_22px_rgba(10,132,255,0.28)]">
          <Globe className="h-[17px] w-[17px] shrink-0 text-white" />
          <span className="flex-1 text-[13px] font-medium text-white">Online Store</span>
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
        </div>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted hover:bg-white/[0.04] hover:text-ink transition-colors">
          <Smartphone className="h-[17px] w-[17px] shrink-0" /><span>Mobile App</span>
        </button>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted hover:bg-white/[0.04] hover:text-ink transition-colors">
          <Landmark className="h-[17px] w-[17px] shrink-0" /><span>Point of Sale</span>
        </button>
      </nav>
      <div className="mt-3 space-y-3">
        <div className="rounded-xl border border-white/[0.06] bg-surface p-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-muted" />
            <span className="text-[12px] font-semibold text-ink">Need help?</span>
          </div>
          <p className="mt-0.5 text-[11px] text-muted">Visit our Help Center</p>
          <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-line py-1.5 text-[11px] font-medium text-ink transition-colors hover:border-white/20">
            Explore Help Center <ExternalLink className="h-3 w-3" />
          </button>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-surface p-2.5">
          <Avatar size={32} />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[12px] font-semibold text-ink">{SELLER.fullName}</span>
            <span className="block text-[10px] text-muted">{SELLER.role}</span>
          </span>
          <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-muted" />
        </div>
      </div>
    </aside>
  );
}

/* ─── compact icon-only sidebar (tablet) ─── */
function CompactSidebar() {
  return (
    <aside className="hidden h-[100dvh] w-[64px] shrink-0 flex-col items-center border-r border-line bg-surface-2/50 py-4 lg:flex xl:hidden">
      <SovcartMark size={28} className="mb-4" />
      <div className="flex flex-1 flex-col items-center gap-1">
        {MAIN_NAV.map((item) => (
          <button key={item.label} title={item.label} className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/[0.04] hover:text-ink">
            <item.icon className="h-[18px] w-[18px]" />
          </button>
        ))}
        <div className="my-2 h-px w-8 bg-line" />
        <button title="Online Store" className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-grad text-white">
          <Globe className="h-[18px] w-[18px]" />
        </button>
        <button title="Mobile App" className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/[0.04] hover:text-ink">
          <Smartphone className="h-[18px] w-[18px]" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-1">
        <button title="Help" className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/[0.04] hover:text-ink">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>
        <Avatar size={32} />
      </div>
    </aside>
  );
}

/* ─── top bar (desktop + tablet) ─── */
function TopBar() {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-3">
      <div className="min-w-0">
        <h1 className="font-display text-[20px] font-bold leading-tight text-ink">Store Customization</h1>
        <p className="mt-0.5 text-[12px] text-muted">Personalize your store and create a unique brand experience.</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 text-[13px] font-medium text-ink transition-colors hover:border-white/20">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-brand-400"><Globe className="h-3.5 w-3.5"/></div>
          <span className="leading-tight">
            <span className="block text-[12px] font-semibold">Luxe Wears</span>
            <span className="block text-[10px] text-muted">luxe-wears.sovcart.com</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted" />
        </button>
        <a href="/luxe-wears" target="_blank" className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-white/20">
          <Eye className="h-4 w-4" /> Preview Store
        </a>
        <button className="flex items-center gap-1.5 rounded-xl bg-brand-grad px-3.5 py-2.5 text-[13px] font-semibold text-white">
          <Save className="h-4 w-4" /> Save Changes
        </button>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">3</span>
        </button>
        <Avatar />
      </div>
    </div>
  );
}

/* ─── tabs ─── */
function StoreTabs({ active, setActive }: { active: string; setActive: (k: string) => void }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-line px-6 py-3">
      {TABS.map((t) => (
        <button
          key={t.key}
          onClick={() => setActive(t.key)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors",
            active === t.key
              ? "bg-brand-50/60 text-brand-400 border border-brand-400/30"
              : "text-muted hover:bg-white/[0.04] hover:text-ink"
          )}
        >
          <t.icon className="h-3.5 w-3.5 shrink-0" /> {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Brand Identity section ─── */
function BrandIdentitySection() {
  return (
    <div className={cn(card, "space-y-4 p-4")}>
      <h3 className="font-display text-[14px] font-semibold text-ink">Brand Identity</h3>
      {/* Logo */}
      <div>
        <label className="mb-2 block text-[12px] font-medium text-muted">Store Logo</label>
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2">
            <span className="font-display text-2xl font-bold italic text-ink">LW</span>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:border-white/20">
              <Upload className="h-3.5 w-3.5" /> Change Logo
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-danger/30 bg-danger/10 px-3 py-1.5 text-[12px] font-medium text-danger">
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      </div>
      {/* Name */}
      <div>
        <label className="mb-1.5 block text-[12px] font-medium text-muted">Store Name</label>
        <div className="relative">
          <input className={formInput} defaultValue="Luxe Wears" maxLength={40} />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted">10/40</span>
        </div>
      </div>
      {/* Tagline */}
      <div>
        <label className="mb-1.5 block text-[12px] font-medium text-muted">Tagline</label>
        <div className="relative">
          <input className={formInput} defaultValue="Elevate Your Everyday Style" maxLength={60} />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted">25/60</span>
        </div>
      </div>
      {/* Description */}
      <div>
        <label className="mb-1.5 block text-[12px] font-medium text-muted">Store Description</label>
        <div className="relative">
          <textarea
            rows={3}
            className={cn(formInput, "resize-none")}
            defaultValue="Premium apparel and accessories crafted for comfort, quality, and confidence."
          />
          <span className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-muted">71/160</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Banner section ─── */
const BANNER_IMGS = [
  "/products/hero.webp",
  "/products/jacket-black.webp",
  "/products/sneakers-white.webp",
];

function BannerSection() {
  const [selected, setSelected] = useState(0);
  return (
    <div className={cn(card, "space-y-3 p-4")}>
      <h3 className="font-display text-[14px] font-semibold text-ink">Banner / Hero Image</h3>
      <div className="flex gap-2">
        {BANNER_IMGS.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn("relative h-16 flex-1 overflow-hidden rounded-xl border-2 transition-colors", selected === i ? "border-brand-400" : "border-transparent opacity-60")}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
            {selected === i && (
              <span className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand">
                <Check className="h-2.5 w-2.5 text-white" />
              </span>
            )}
          </button>
        ))}
      </div>
      <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-2.5 text-[12px] font-medium text-muted transition-colors hover:border-white/20 hover:text-ink">
        <Upload className="h-4 w-4" /> Upload / Change Banner
        <span className="text-[10px] text-muted/60">Recommended: 1600 x 600px</span>
      </button>
    </div>
  );
}

/* ─── Brand Colors section ─── */
function BrandColorsSection() {
  return (
    <div className={cn(card, "space-y-3 p-4")}>
      <h3 className="font-display text-[14px] font-semibold text-ink">Brand Colors</h3>
      {BRAND_COLORS.map((c) => (
        <div key={c.label} className="flex items-center gap-3">
          <span className="h-5 w-5 shrink-0 rounded-full border border-white/10" style={{ background: c.bg }} />
          <span className="flex-1 text-[13px] font-medium text-ink">{c.label}</span>
          <span className="font-mono text-[11px] text-muted">{c.hex}</span>
          <button className="h-5 w-5 shrink-0 rounded-full border-2 border-line transition-colors hover:border-white/30" />
        </div>
      ))}
    </div>
  );
}

/* ─── Typography section ─── */
function TypographySection() {
  const [heading, setHeading] = useState("Poppins");
  const [body, setBody] = useState("Inter");
  const [size, setSize] = useState(16);
  return (
    <div className={cn(card, "space-y-3.5 p-4")}>
      <h3 className="font-display text-[14px] font-semibold text-ink">Typography</h3>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium text-muted">Headings Font</span>
        <button className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12px] font-medium text-ink transition-colors hover:border-white/20">
          {heading} <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium text-muted">Body Font</span>
        <button className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12px] font-medium text-ink transition-colors hover:border-white/20">
          {body} <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-[12px] font-medium text-muted">Base Font Size</span>
        <input
          type="range" min={12} max={24} step={1} value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="flex-1 cursor-pointer"
          style={{ accentColor: "#0EA5FF" }}
        />
        <span className="w-8 shrink-0 text-right text-[12px] font-medium text-ink">{size}px</span>
      </div>
    </div>
  );
}

/* ─── Other Settings section ─── */
function OtherSettingsSection() {
  const init = Object.fromEntries(OTHER_SETTINGS.map((s) => [s.key, s.default]));
  const [vals, setVals] = useState<Record<string, boolean>>(init);
  return (
    <div className={cn(card, "space-y-3 p-4")}>
      <h3 className="font-display text-[14px] font-semibold text-ink">Other Settings</h3>
      {OTHER_SETTINGS.map((s) => (
        <div key={s.key} className="flex items-center gap-3">
          <span className="flex-1 text-[12.5px] font-medium text-ink">{s.label}</span>
          <button title={s.info} className="text-muted"><Info className="h-3.5 w-3.5" /></button>
          <Toggle on={vals[s.key]} onChange={(v) => setVals({ ...vals, [s.key]: v })} />
        </div>
      ))}
    </div>
  );
}

/* ─── AI Assistant section ─── */
function AIAssistantSection() {
  return (
    <div className={cn(card, "p-4")}>
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-grad text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="font-display text-[14px] font-semibold text-ink">AI Assistant</span>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-400">Beta</span>
      </div>
      <p className="mt-1.5 text-[12px] text-muted">Get smart suggestions to improve your store.</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {AI_ACTIONS.map((a) => (
          <div key={a.title} className="rounded-xl border border-line bg-surface-2 p-2.5">
            <a.icon className="mb-1.5 h-4 w-4 text-brand-400" />
            <p className="text-[11px] font-semibold leading-snug text-ink">{a.title}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-muted">{a.desc}</p>
            <button className="mt-1.5 text-[10px] font-medium text-brand-400">View suggestions</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── mini storefront preview ─── */
function MiniStorefrontPreview() {
  return (
    <div className="w-full bg-canvas text-ink">
      {/* announcement */}
      <div className="border-b border-line bg-surface-2/60 py-1 text-center text-[4px] text-muted">
        🚚 Free shipping on orders over ₦50,000
      </div>
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-2 py-1.5">
        <div className="h-2 w-2 rounded-sm bg-surface-2" />
        <span className="font-display text-[6px] font-bold tracking-[0.18em] text-ink">LUXE WEARS</span>
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-sm bg-surface-2" />
          <div className="h-2 w-2 rounded-sm bg-surface-2" />
        </div>
      </div>
      {/* hero */}
      <div className="relative overflow-hidden bg-[#091525]" style={{ height: 90 }}>
        <img src="/products/hero.webp" className="absolute right-0 top-0 h-full w-[50%] object-cover object-top" alt="" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0B1220 35%, rgba(11,18,32,0.5) 55%, transparent)" }} />
        <div className="absolute inset-0 flex flex-col justify-center px-2">
          <span className="mb-0.5 w-fit rounded-sm border border-brand-400/50 px-1 py-0.5 text-[3.5px] font-semibold uppercase tracking-wide text-brand-400">NEW ARRIVALS</span>
          <p className="font-display text-[7px] font-bold leading-tight text-ink">Elevate Your<br />Everyday Style</p>
          <p className="mt-0.5 text-[3.5px] text-muted">Premium pieces. Timeless confidence.</p>
          <button className="mt-1 w-fit rounded-sm bg-brand px-1.5 py-0.5 text-[3.5px] font-semibold text-white">Shop Now</button>
        </div>
      </div>
      {/* categories */}
      <div className="px-2 py-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[5px] font-semibold text-ink">Categories</span>
          <span className="text-[4px] text-brand-400">View all</span>
        </div>
        <div className="flex gap-1">
          {[
            { l: "T-Shirts", img: "/products/tshirt-black.webp" },
            { l: "Hoodies", img: "/products/hoodie-grey.webp" },
            { l: "Sneakers", img: "/products/sneakers-white.webp" },
            { l: "Pants", img: "/products/cargo-olive.webp" },
            { l: "Access.", img: "/products/cap-black.webp" },
          ].map((c) => (
            <div key={c.l} className="flex flex-1 flex-col items-center">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-surface-2">
                <img src={c.img} className="h-full w-full object-cover" alt="" />
              </div>
              <span className="mt-0.5 text-[3.5px] text-ink">{c.l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* featured */}
      <div className="px-2 pb-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[5px] font-semibold text-ink">Featured Products</span>
          <span className="text-[4px] text-brand-400">View all</span>
        </div>
        <div className="flex gap-1">
          {[
            { n: "Canvas Sneakers White", p: "₦24,000", img: "/products/sneakers-white.webp" },
            { n: "T-Shirt Oversized Black", p: "₦18,500", img: "/products/tshirt-black.webp" },
            { n: "Hoodie Premium Grey", p: "₦22,000", img: "/products/hoodie-grey.webp" },
          ].map((prod) => (
            <div key={prod.n} className="flex-1">
              <div className="aspect-square overflow-hidden rounded-md bg-surface-2">
                <img src={prod.img} className="h-full w-full object-cover" alt="" />
              </div>
              <p className="mt-0.5 text-[3.5px] leading-tight text-ink">{prod.n}</p>
              <p className="text-[4px] font-semibold text-ink">{prod.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── live preview panel ─── */
type Device = "phone" | "tablet" | "desktop";

function LivePreviewPanel({ className }: { className?: string }) {
  const [device, setDevice] = useState<Device>("phone");
  const devices: { key: Device; icon: React.ElementType; label: string }[] = [
    { key: "phone", icon: Smartphone, label: "Phone" },
    { key: "tablet", icon: Tablet, label: "Tablet" },
    { key: "desktop", icon: Monitor, label: "Desktop" },
  ];
  return (
    <div className={cn(card, "flex flex-col p-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[14px] font-semibold text-ink">Live Preview</h3>
        <div className="flex items-center gap-0.5 rounded-lg border border-line p-1">
          {devices.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              title={label}
              onClick={() => setDevice(key)}
              className={cn("rounded-md p-1.5 transition-colors", device === key ? "bg-brand text-white" : "text-muted hover:text-ink")}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-1 items-start justify-center overflow-hidden">
        {device === "phone" ? (
          <div className="relative overflow-hidden rounded-[20px] border-[3px] border-white/15 bg-canvas" style={{ width: 165, height: 350 }}>
            <div style={{ width: 375, transform: "scale(0.44)", transformOrigin: "top left" }}>
              <MiniStorefrontPreview />
            </div>
          </div>
        ) : device === "tablet" ? (
          <div className="relative overflow-hidden rounded-xl border-2 border-white/15 bg-canvas" style={{ width: 256, height: 350 }}>
            <div style={{ width: 600, transform: "scale(0.427)", transformOrigin: "top left" }}>
              <MiniStorefrontPreview />
            </div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-canvas" style={{ height: 350 }}>
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-surface-2 px-3 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-danger" />
              <div className="h-1.5 w-1.5 rounded-full bg-warning" />
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="ml-2 text-[8px] text-muted">luxe-wears.sovcart.com</span>
            </div>
            <div className="overflow-hidden" style={{ height: 320 }}>
              <div style={{ width: 780, transform: "scale(0.45)", transformOrigin: "top left" }}>
                <MiniStorefrontPreview />
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-[10px] text-muted">Preview updates on save</p>
    </div>
  );
}

/* ─── placeholder for non-branding tabs ─── */
function TabPlaceholder({ tab }: { tab: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
        <Wand2 className="h-7 w-7" />
      </div>
      <div>
        <p className="font-display text-[15px] font-semibold text-ink">{tab} Settings</p>
        <p className="mt-1 text-[13px] text-muted">This section is coming soon.</p>
      </div>
    </div>
  );
}

/* ─── mobile save bar ─── */
function MobileSaveBar() {
  return (
    <div className="space-y-2 pt-2">
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-grad py-3 text-[14px] font-semibold text-white">
        <Save className="h-4 w-4" /> Save Changes
      </button>
      <a href="/luxe-wears" target="_blank" className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-3 text-[14px] font-medium text-ink transition-colors hover:border-white/20">
        <Eye className="h-4 w-4" /> Preview Store
      </a>
    </div>
  );
}

/* ─── layouts ─── */
function MobileLayout({ onMenu, activeTab, setActiveTab }: { onMenu: () => void; activeTab: string; setActiveTab: (k: string) => void }) {
  return (
    <MobileShell activeKey="settings" onMenu={onMenu}>
      <div className="space-y-4 px-4 pt-4 pb-8">
        {/* page title */}
        <div>
          <h1 className="font-display text-[22px] font-bold text-ink">Store Customization</h1>
          <p className="mt-1 text-[12px] text-muted">Personalize your store and create a unique brand experience.</p>
        </div>
        {/* store switcher */}
        <button className="flex w-full items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-3 py-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50"><Globe className="h-3.5 w-3.5 text-brand-400"/></div>
          <span className="flex-1 text-left leading-tight">
            <span className="block text-[13px] font-semibold text-ink">Luxe Wears</span>
            <span className="block text-[11px] text-muted">luxe-wears.sovcart.com</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted" />
        </button>
        {/* tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-1.5">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={cn("flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-medium transition-colors",
                activeTab === t.key ? "bg-brand-50/60 text-brand-400 border border-brand-400/30" : "text-muted hover:text-ink")}>
              <t.icon className="h-3.5 w-3.5 shrink-0" /> {t.label}
            </button>
          ))}
        </div>
        {activeTab === "branding" ? (
          <div className="grid grid-cols-2 gap-3">
            {/* left col */}
            <div className="space-y-3">
              <BrandIdentitySection />
              <BannerSection />
            </div>
            {/* right col */}
            <div className="space-y-3">
              <LivePreviewPanel />
              <BrandColorsSection />
              <TypographySection />
              <OtherSettingsSection />
            </div>
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center"><TabPlaceholder tab={TABS.find(t => t.key === activeTab)?.label ?? ''}/></div>
        )}
        {activeTab === "branding" && <AIAssistantSection />}
        {activeTab === "branding" && <MobileSaveBar />}
      </div>
    </MobileShell>
  );
}

function TabletLayout({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (k: string) => void }) {
  return (
    <div className="hidden h-[100dvh] overflow-hidden lg:flex xl:hidden">
      <CompactSidebar />
      <div className="flex h-[100dvh] min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar />
        <StoreTabs active={activeTab} setActive={setActiveTab} />
        {activeTab === "branding" ? (
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-4 overflow-hidden p-4">
            <div className="flex min-h-0 flex-col gap-4 overflow-y-auto no-scrollbar">
              <BrandIdentitySection />
              <BannerSection />
              <AIAssistantSection />
            </div>
            <div className="flex min-h-0 flex-col gap-4 overflow-y-auto no-scrollbar">
              <BrandColorsSection />
              <TypographySection />
              <OtherSettingsSection />
            </div>
            <div className="min-h-0"><LivePreviewPanel className="h-full" /></div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-4"><TabPlaceholder tab={TABS.find(t => t.key === activeTab)?.label ?? ''}/></div>
        )}
      </div>
    </div>
  );
}

function DesktopLayout({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (k: string) => void }) {
  return (
    <div className="hidden h-[100dvh] overflow-hidden xl:flex">
      <StoreCustomizerSidebar />
      <div className="flex h-[100dvh] min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar />
        <StoreTabs active={activeTab} setActive={setActiveTab} />
        {activeTab === "branding" ? (
          <div className="grid min-h-0 flex-1 grid-cols-[260px_280px_1fr] gap-5 overflow-hidden p-5">
            <div className="flex min-h-0 flex-col gap-4 overflow-y-auto no-scrollbar">
              <BrandIdentitySection />
              <BannerSection />
              <AIAssistantSection />
            </div>
            <div className="flex min-h-0 flex-col gap-4 overflow-y-auto no-scrollbar">
              <BrandColorsSection />
              <TypographySection />
              <OtherSettingsSection />
            </div>
            <div className="min-h-0"><LivePreviewPanel className="h-full" /></div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6"><TabPlaceholder tab={TABS.find(t => t.key === activeTab)?.label ?? ''}/></div>
        )}
      </div>
    </div>
  );
}

/* ─── root ─── */
export function StoreCustomizer() {
  const [activeTab, setActiveTab] = useState("branding");
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="bg-canvas text-ink">
      <MobileLayout onMenu={() => setDrawer(true)} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabletLayout activeTab={activeTab} setActiveTab={setActiveTab} />
      <DesktopLayout activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} activeKey="settings" />
    </div>
  );
}
