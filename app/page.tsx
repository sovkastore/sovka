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
  Shirt,
  Footprints,
  Percent,
  Search,
  ShoppingCart,
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
  const cats = [
    { i: Grid3x3, l: "All Products" },
    { i: Shirt, l: "T-Shirts" },
    { i: Footprints, l: "Shoes" },
    { i: Tag, l: "Accessories" },
    { i: ShoppingBag, l: "New In" },
    { i: Percent, l: "Deals" },
  ];
  const featured = [
    { n: "Oversized T-Shirt", p: "\u20a618,500", img: "/products/tshirt-black.webp" },
    { n: "Canvas Sneakers", p: "\u20a624,000", img: "/products/sneakers-white.webp" },
  ];
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-2 shadow-card">
      {/* browser bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 text-[11px] text-muted">
          <span className="h-2 w-2 rounded-full border border-success" />
          luxewears.sovcart.com
        </div>
      </div>
      {/* store header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">LW</span>
          <span className="font-display text-xs font-semibold tracking-[0.18em] text-ink">LUXE WEARS</span>
        </div>
        <div className="hidden items-center gap-3 text-[10px] text-muted md:flex">
          <span>Shop</span><span>Categories</span><span>New In</span><span>Deals</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Search className="h-3.5 w-3.5" />
          <ShoppingCart className="h-3.5 w-3.5" />
        </div>
      </div>
      {/* body: hero + categories (left) | featured (right) */}
      <div className="flex flex-col gap-2.5 px-3 pb-3 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="relative h-44 overflow-hidden rounded-xl bg-gradient-to-r from-[#0E1B33] to-[#16345C]">
            <img src="/products/hero.webp" alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1B33] via-[#0E1B33]/85 to-transparent" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <p className="text-[9px] font-medium text-muted">New Collection</p>
              <p className="font-display text-lg font-bold text-ink">Summer Drop</p>
              <span className="mt-1.5 inline-flex rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-semibold text-white">Shop Now</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {cats.map(({ i: Icon, l }) => (
              <div key={l} className="flex flex-1 flex-col items-center gap-1 text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5"><Icon className="h-3.5 w-3.5 text-muted" /></span>
                <span className="text-[8px] leading-tight text-muted">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 sm:w-[42%]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-ink">Featured Products</span>
            <span className="text-[9px] text-brand">View all</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {featured.map((x) => (
              <div key={x.n} className="overflow-hidden rounded-lg bg-white/5">
                <div className="aspect-[5/4] w-full overflow-hidden">
                  <img src={x.img} alt={x.n} className="h-full w-full object-cover" />
                </div>
                <div className="p-1.5">
                  <p className="truncate text-[9px] text-ink">{x.n}</p>
                  <p className="text-[10px] font-bold text-ink">{x.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhonePreview() {
  const cats = [
    { i: Grid3x3, l: "All Products" },
    { i: Tag, l: "Categories" },
    { i: ShoppingBag, l: "New In" },
    { i: Percent, l: "Deals" },
  ];
  const featured = [
    { n: "Oversized T-Shirt", p: "\u20a618,500", img: "/products/tshirt-black.webp" },
    { n: "Canvas Sneakers", p: "\u20a624,000", img: "/products/sneakers-white.webp" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-surface-2 p-2.5 shadow-card">
      <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-white/15" />
      <div className="overflow-hidden rounded-[1.4rem] bg-surface">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">LW</span>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-ink">Luxe Wears</p>
              <p className="text-[8px] text-muted">luxewears.sovcart.com</p>
            </div>
          </div>
          <Menu className="h-4 w-4 text-muted" />
        </div>
        <div className="relative mx-3 h-32 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0E1B33] to-[#16345C]">
          <img src="/products/hero.webp" alt="" className="absolute right-0 top-0 h-full w-3/5 object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1B33] via-[#0E1B33]/80 to-transparent" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <p className="text-[9px] font-medium text-muted">New Collection</p>
            <p className="font-display text-base font-bold text-ink">Summer Drop</p>
            <span className="mt-1.5 inline-flex rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-semibold text-white">Shop Now</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5">
          {cats.map(({ i: Icon, l }) => (
            <div key={l} className="flex flex-1 flex-col items-center gap-1 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5"><Icon className="h-4 w-4 text-muted" /></span>
              <span className="text-[8px] leading-tight text-muted">{l}</span>
            </div>
          ))}
        </div>
        <div className="px-3 pb-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-ink">Featured Products</span>
            <span className="text-[9px] text-brand">View all</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {featured.map((x) => (
              <div key={x.n}>
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-white/5">
                  <img src={x.img} alt={x.n} className="h-full w-full object-cover" />
                </div>
                <p className="mt-1.5 truncate text-[9px] text-muted">{x.n}</p>
                <p className="text-[11px] font-bold text-ink">{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pb-24 lg:pb-0">
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-[420px] -left-40 h-[360px] w-[360px] rounded-full bg-brand/10 blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-content items-center justify-between px-5 py-4 lg:px-8">
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

      <section className="relative z-10 mx-auto grid max-w-content items-center gap-6 px-5 pt-3 md:grid-cols-[44fr_56fr] md:gap-7 md:px-8 md:pt-4 lg:grid-cols-[43fr_57fr] lg:gap-10 lg:pt-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-ink">
            <Sparkles className="h-4 w-4 text-brand" /> Built for African Sellers
          </span>
          <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl md:text-[2.4rem] lg:text-[3.25rem]">
            Your Store.<br />Your Brand.<br /><span className="text-brand">Your Freedom.</span>
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
            Create a beautiful online store in minutes, get paid securely, and grow your business with Sovcart.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link href="/signup" className="inline-flex h-14 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-brand-grad px-7 text-base font-semibold text-white shadow-glow transition active:scale-[0.98]">
              Create Your Store <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
            <button className="flex shrink-0 items-center gap-3 whitespace-nowrap text-sm font-medium text-ink">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15">
                <Play className="h-4 w-4 fill-ink" />
              </span>
              Watch Demo
            </button>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex shrink-0 -space-x-3">
              {["/people/seller-daniel.webp", "/people/avatar-1.webp", "/people/avatar-2.webp", "/people/avatar-3.webp"].map((src) => (
                <img key={src} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-canvas object-cover" />
              ))}
            </div>
            <p className="min-w-0 text-sm leading-snug text-muted">Join 2,000+ sellers growing with Sovcart</p>
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:block">
            <StorePreview />
          </div>
          <div className="lg:hidden [perspective:1500px]">
            <div className="[transform:rotateY(-14deg)_rotateX(2deg)] drop-shadow-2xl">
              <PhonePreview />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-6 max-w-content px-5 lg:mt-10 lg:px-8">
        <div className="grid grid-cols-4 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          {PILLS.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center gap-1.5 bg-surface px-2 py-4 text-center sm:px-4 lg:py-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand lg:h-12 lg:w-12">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-1 text-[13px] font-semibold leading-tight text-ink sm:text-base">{title}</p>
              <p className="text-[11px] leading-tight text-muted sm:text-sm">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-6 max-w-content px-5 pb-8 lg:mt-12 lg:px-8 lg:pb-12">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Everything you need to sell</h2>
          <p className="mt-2 text-muted">Powerful features designed for modern sellers</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-surface p-3.5 transition hover:border-brand/40 sm:rounded-3xl sm:p-4 lg:flex-col lg:gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand sm:h-12 sm:w-12">
                <Icon className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-tight text-ink sm:text-base">{title}</p>
                  <ChevronRight className="h-4 w-4 text-muted lg:hidden" />
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted sm:text-sm">{desc}</p>
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
