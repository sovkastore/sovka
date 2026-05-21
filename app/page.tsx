import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Play,
  Store,
  CreditCard,
  Link2,
  Package,
  Users,
  Settings,
  BarChart3,
  ShoppingBag,
  Home as HomeIcon,
  Tag,
  PlayCircle,
  User,
  Menu,
  ChevronRight,
  Grid3x3,
} from "lucide-react";
import { SovcartLogo } from "@/components/brand/logo";

const NAV = ["Features", "Pricing", "Demo", "Resources"];

const PILLS = [
  { icon: Store, title: "Your Own Store", sub: "100% branded to you" },
  { icon: CreditCard, title: "Get Paid Securely", sub: "Powered by Paystack" },
  { icon: Link2, title: "Share Anywhere", sub: "One link. Unlimited sales" },
  { icon: Sparkles, title: "AI Assistant", sub: "Smart tools to grow faster" },
];

const FEATURES = [
  { icon: Package, title: "Product Management", desc: "Add products, variants, track inventory and more." },
  { icon: Users, title: "Orders & Customers", desc: "Manage orders, track delivery and build customer relationships." },
  { icon: Settings, title: "Store Customization", desc: "Customize your store look and feel to match your brand." },
  { icon: BarChart3, title: "Analytics & Insights", desc: "Understand your business with real-time analytics and reports." },
];

function StorePreview() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-surface-2 shadow-card">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="mx-auto flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1 text-xs text-muted">
          <span className="h-2.5 w-2.5 rounded-full border border-success" />
          luxewears.sovcart.com
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">LW</span>
          <span className="font-display text-sm font-semibold tracking-[0.2em] text-ink">LUXE WEARS</span>
        </div>
        <div className="hidden items-center gap-4 text-xs text-muted sm:flex">
          <span>Shop</span><span>Categories</span><span>New In</span><span>Deals</span>
        </div>
        <ShoppingBag className="h-4 w-4 text-muted" />
      </div>
      <div className="mx-4 mb-3 flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#0E1B33] to-[#16345C] p-4">
        <div>
          <p className="text-[10px] font-medium text-muted">New Collection</p>
          <p className="font-display text-lg font-bold text-ink">Summer Drop</p>
          <span className="mt-2 inline-flex rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold text-white">Shop Now</span>
        </div>
        <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-[#3A4A66] to-[#1B2A45]" />
      </div>
      <div className="grid grid-cols-4 gap-1 px-4">
        {[
          { i: Grid3x3, l: "All Products" },
          { i: Tag, l: "Categories" },
          { i: ShoppingBag, l: "New In" },
          { i: Sparkles, l: "Deals" },
        ].map(({ i: Icon, l }) => (
          <div key={l} className="flex flex-col items-center gap-1 py-1 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5"><Icon className="h-4 w-4 text-muted" /></span>
            <span className="text-[9px] text-muted">{l}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 pb-1 pt-3">
        <span className="text-xs font-semibold text-ink">Featured Products</span>
        <span className="text-[10px] text-brand">View all</span>
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        {[
          { n: "Oversized T-Shirt", p: "\u20a618,500", g: "from-[#2A3550] to-[#171F33]" },
          { n: "Canvas Sneakers", p: "\u20a624,000", g: "from-[#37445E] to-[#1A2335]" },
        ].map((x) => (
          <div key={x.n} className="overflow-hidden rounded-xl bg-white/5">
            <div className={`aspect-square w-full bg-gradient-to-br ${x.g}`} />
            <div className="p-2">
              <p className="truncate text-[10px] text-ink">{x.n}</p>
              <p className="text-[11px] font-bold text-ink">{x.p}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pb-24 lg:pb-0">
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-[420px] -left-40 h-[360px] w-[360px] rounded-full bg-brand/10 blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-content items-center justify-between px-5 py-5 lg:px-8">
        <SovcartLogo size={36} />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted lg:flex">
          {NAV.map((n) => (
            <Link key={n} href="#" className="transition hover:text-ink">{n}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm font-semibold text-ink lg:block">Log in</Link>
          <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-grad px-5 text-sm font-semibold text-white shadow-glow">
            Get Started <ArrowRight className="hidden h-4 w-4 lg:block" />
          </Link>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-content items-center gap-12 px-5 pt-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-ink">
            <Sparkles className="h-4 w-4 text-brand" /> Built for African Sellers
          </span>
          <h1 className="mt-6 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Your Store.<br />Your Brand.<br /><span className="text-brand">Your Freedom.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
            Create a beautiful online store in minutes, get paid securely, and grow your business with Sovcart.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <Link href="/signup" className="inline-flex h-14 items-center gap-2 rounded-full bg-brand-grad px-7 text-base font-semibold text-white shadow-glow transition active:scale-[0.98]">
              Create Your Store <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="flex items-center gap-3 text-sm font-medium text-ink">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15">
                <Play className="h-4 w-4 fill-ink" />
              </span>
              Watch Demo
            </button>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              {["from-[#3B82F6] to-[#1D4ED8]", "from-[#8B5CF6] to-[#6D28D9]", "from-[#06B6D4] to-[#0891B2]", "from-[#F59E0B] to-[#D97706]"].map((g, i) => (
                <span key={i} className={`h-9 w-9 rounded-full border-2 border-canvas bg-gradient-to-br ${g}`} />
              ))}
            </div>
            <p className="text-sm text-muted">Join 2,000+ sellers growing with Sovcart</p>
          </div>
        </div>
        <div className="relative">
          <StorePreview />
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-16 max-w-content px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-4">
          {PILLS.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center gap-2 bg-surface px-4 py-7 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-1 font-semibold text-ink">{title}</p>
              <p className="text-sm text-muted">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-20 max-w-content px-5 pb-20 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Everything you need to sell</h2>
          <p className="mt-2 text-muted">Powerful features designed for modern sellers</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-surface p-5 transition hover:border-brand/40 lg:flex-col lg:gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Icon className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{title}</p>
                  <ChevronRight className="h-4 w-4 text-muted lg:hidden" />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-canvas/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2.5">
          {[
            { i: HomeIcon, l: "Home", active: true, href: "/" },
            { i: Grid3x3, l: "Features", href: "#" },
            { i: Tag, l: "Pricing", href: "#" },
            { i: PlayCircle, l: "Demo", href: "#" },
            { i: User, l: "Login", href: "/login" },
          ].map(({ i: Icon, l, active, href }) => (
            <Link key={l} href={href} className={`flex flex-col items-center gap-1 text-[11px] ${active ? "text-brand" : "text-muted"}`}>
              <Icon className="h-5 w-5" />
              {l}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
