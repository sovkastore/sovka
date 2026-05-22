"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type LucideIcon,
  Home, ShoppingBag, Tag, Users, BarChart3, Megaphone, Ticket, Star,
  LayoutGrid, Settings, Wallet, Percent, ChevronDown, Calendar, Bell,
  Sparkles, Send, CheckCircle2, ArrowRight, ArrowUp, Plus, Store, Crown, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SovcartLogo, SovcartMark } from "@/components/brand/logo";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import {
  STORE, SELLER, DATE_RANGE, COMPARE, STATS, RECENT_ORDERS, TOP_PRODUCTS,
  TOP_PRODUCTS_MAX, AI_CHIPS, SUGGESTIONS, UPGRADE_FEATURES, NAV,
  type StatKey, type NavKey,
} from "@/lib/dashboard-mock";

/* ───────────────────────── icon maps ───────────────────────── */
const navIcons: Record<NavKey, LucideIcon> = {
  home: Home, orders: ShoppingBag, products: Tag, customers: Users,
  analytics: BarChart3, marketing: Megaphone, discounts: Ticket, reviews: Star,
  integrations: LayoutGrid, settings: Settings,
};
const statIcons: Record<StatKey, LucideIcon> = {
  revenue: Wallet, orders: ShoppingBag, customers: Users, conversion: Percent,
};

const card = "rounded-2xl border border-white/[0.06] bg-surface";

/* ───────────────────────── small primitives ───────────────────────── */
function Delta({ value }: { value: string }) {
  return (
    <div className="leading-tight">
      <span className="text-[12px] font-semibold text-success">▲ {value}</span>
      <div className="text-[11px] text-muted">{COMPARE}</div>
    </div>
  );
}

function StatCard({ stat, i }: { stat: (typeof STATS)[number]; i: number }) {
  const Icon = statIcons[stat.key];
  return (
    <div className={cn(card, "sov-in p-4 xl:p-[18px]")} style={{ animationDelay: `${i * 50}ms` }}>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-400">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="text-[13px] leading-tight text-muted">{stat.label}</span>
      </div>
      <div className="mt-3 font-display text-[26px] font-bold leading-none text-ink">{stat.value}</div>
      <div className="mt-2.5">
        <Delta value={stat.delta} />
      </div>
    </div>
  );
}

function StoreSwitcher({ full }: { full?: boolean }) {
  return (
    <button
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2 text-left transition hover:border-white/15",
        full ? "w-full" : "max-w-[230px]"
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-400">
        <Store className="h-[17px] w-[17px]" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[13px] font-semibold text-ink">{STORE.name}</span>
        <span className="block truncate text-[11px] text-muted">{STORE.domain}</span>
      </span>
      <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted" />
    </button>
  );
}

function DateRangePill({ full }: { full?: boolean }) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 text-[13px] font-medium text-ink transition hover:border-white/15",
        full ? "w-full justify-between" : ""
      )}
    >
      <span>{DATE_RANGE}</span>
      <Calendar className="h-4 w-4 text-muted" />
    </button>
  );
}

function BellButton() {
  return (
    <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted transition hover:text-ink">
      <Bell className="h-[18px] w-[18px]" />
      <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
        3
      </span>
    </button>
  );
}

function Avatar({ size = 40 }: { size?: number }) {
  return (
    <img
      src={SELLER.avatar}
      alt={SELLER.fullName}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full object-cover ring-2 ring-white/10"
    />
  );
}

function StatusBadge({ status }: { status: "Paid" | "Pending" }) {
  const paid = status === "Paid";
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        paid ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
      )}
    >
      {status}
    </span>
  );
}

function SectionHead({ title, action = "View all" }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-display text-[15px] font-semibold text-ink">{title}</h3>
      <button className="text-[12px] font-medium text-brand-400 hover:text-brand">{action}</button>
    </div>
  );
}

/* ───────────────────────── cards ───────────────────────── */
function RevenueCard({ className }: { className?: string }) {
  return (
    <div className={cn(card, "sov-in flex flex-col p-4 xl:p-5", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[15px] font-semibold text-ink">Revenue Overview</h3>
        <button className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-medium text-muted">
          This Week <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-3 h-[220px] min-h-0 md:h-auto md:flex-1">
        <RevenueChart />
      </div>
    </div>
  );
}

function RecentOrders({ className }: { className?: string }) {
  return (
    <div className={cn(card, "sov-in flex flex-col p-4 xl:p-5", className)}>
      <SectionHead title="Recent Orders" />
      <div className="mt-3 flex flex-1 flex-col gap-3.5">
        {RECENT_ORDERS.map((o) => (
          <div key={o.id} className="flex items-start gap-3">
            <img src={o.img} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[13px] font-semibold text-ink">{o.id}</div>
              <div className="truncate text-[12px] text-muted">{o.title}</div>
              <div className="text-[12px] font-medium text-ink">{o.amount}</div>
            </div>
            <StatusBadge status={o.status} />
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-2.5 text-[13px] font-medium text-ink transition hover:border-white/15">
        View all orders <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function TopProducts({ className }: { className?: string }) {
  return (
    <div className={cn(card, "sov-in flex flex-col p-4 xl:p-5", className)}>
      <SectionHead title="Top Products" />
      <div className="mt-3 flex flex-1 flex-col justify-between gap-3">
        {TOP_PRODUCTS.map((p) => {
          const pct = Math.round((p.sold / TOP_PRODUCTS_MAX) * 100);
          return (
            <div key={p.rank} className="flex items-center gap-3">
              <span className="w-3 shrink-0 text-center text-[12px] font-medium text-muted">{p.rank}</span>
              <img src={p.img} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium text-ink">{p.title}</div>
                <div className="mt-0.5 text-[11px] text-brand-400">{p.sold} sold</div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
                  <div className="h-full rounded-full bg-brand-grad" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="shrink-0 whitespace-nowrap text-[12px] font-semibold text-ink">{p.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AIAssistant({ className }: { className?: string }) {
  return (
    <div className={cn(card, "sov-in flex flex-col p-4 xl:p-5", className)}>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-grad text-white shadow-glow">
          <Sparkles className="h-[18px] w-[18px]" />
        </span>
        <h3 className="font-display text-[15px] font-semibold text-ink">AI Assistant</h3>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-400">Beta</span>
      </div>
      <p className="mt-3 text-[13px] text-muted">I can help you grow your store. Ask me anything!</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {AI_CHIPS.map((c) => (
          <button
            key={c}
            className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-medium text-brand-400 transition hover:border-white/15"
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-surface-2 p-1.5 pl-3.5">
        <input
          placeholder="Ask anything..."
          className="min-w-0 flex-1 bg-transparent text-[13px] text-ink placeholder:text-muted focus:outline-none"
        />
        <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-grad text-white">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Suggestions({ footer, className }: { footer?: boolean; className?: string }) {
  return (
    <div className={cn(card, "sov-in flex flex-col p-4 xl:p-5", className)}>
      <h3 className="font-display text-[15px] font-semibold text-ink">Suggestions for you</h3>
      <div className="mt-3 flex flex-1 flex-col gap-3">
        {SUGGESTIONS.map((s) => (
          <div key={s} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-400" />
            <span className="text-[13px] text-muted">{s}</span>
          </div>
        ))}
      </div>
      {footer && (
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-2.5 text-[13px] font-medium text-ink transition hover:border-white/15">
          See all insights <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function UpgradeCard({
  variant,
  className,
}: {
  variant: "full" | "compact" | "mini";
  className?: string;
}) {
  return (
    <div className={cn(card, "sov-in flex flex-col p-4 xl:p-5", className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-[15px] font-semibold text-ink">Upgrade your plan</h3>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">
            Unlock premium features and grow your business faster.
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-grad text-white shadow-glow">
          <ArrowUp className="h-[18px] w-[18px]" />
        </span>
      </div>

      {variant === "full" && (
        <div className="mt-4 flex flex-1 flex-col gap-2">
          {UPGRADE_FEATURES.map((f) => (
            <div key={f} className="flex items-center gap-2 text-[12.5px] text-ink/90">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-400" />
              {f}
            </div>
          ))}
        </div>
      )}

      {variant !== "mini" && (
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-grad py-2.5 text-[13px] font-semibold text-white shadow-glow transition active:scale-[0.99]">
          Upgrade Now <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/* ───────────────────────── sidebar (tablet + desktop) ───────────────────────── */
function NavList() {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const Icon = navIcons[item.key];
        return (
          <button
            key={item.key}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition",
              item.active
                ? "bg-brand-grad text-white shadow-[0_8px_22px_rgba(10,132,255,0.32)]"
                : "text-muted hover:bg-white/[0.04] hover:text-ink"
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span>{item.label}</span>
            {item.badge != null && (
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  item.active ? "bg-white/20 text-white" : "bg-brand-50 text-brand-400"
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function SidebarPromo() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-surface p-4">
      <div className="flex items-center gap-2 text-ink">
        <Crown className="h-[18px] w-[18px] text-warning" />
        <span className="text-[13px] font-semibold">Upgrade your plan</span>
      </div>
      <p className="mt-1.5 text-[11.5px] leading-snug text-muted">
        Unlock premium features and grow your business faster.
      </p>
      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-grad py-2 text-[12px] font-semibold text-white shadow-glow transition active:scale-[0.99]">
        Upgrade Now <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function SidebarBody() {
  return (
    <>
      <div className="px-2 py-1">
        <SovcartLogo size={30} tagline />
      </div>
      <div className="mt-5 flex-1 overflow-y-auto no-scrollbar">
        <NavList />
      </div>
      <div className="mt-4 shrink-0 space-y-4">
        <SidebarPromo />
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-surface p-2.5">
          <Avatar size={36} />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-semibold text-ink">{SELLER.fullName}</span>
            <span className="block text-[11px] text-muted">{SELLER.role}</span>
          </span>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted" />
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <aside className="hidden h-[100dvh] w-[236px] shrink-0 flex-col border-r border-line bg-surface-2/50 p-4 md:flex xl:w-[252px]">
      <SidebarBody />
    </aside>
  );
}

/* ───────────────────────── desktop / tablet header ───────────────────────── */
function MainHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <button
          onClick={onMenu}
          className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-muted transition hover:text-ink"
          aria-label="Toggle menu"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
        <h1 className="font-display text-[24px] font-bold leading-tight text-ink xl:text-[28px]">
          Good morning, {SELLER.firstName} <span className="align-middle">👋</span>
        </h1>
        <p className="mt-1 text-[13px] text-muted xl:text-sm">
          Here&apos;s what&apos;s happening with {STORE.name} today.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <StoreSwitcher />
        <DateRangePill />
        <BellButton />
        <Avatar />
      </div>
    </header>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {STATS.map((s, i) => (
        <StatCard key={s.key} stat={s} i={i} />
      ))}
    </div>
  );
}

/* ───────────────────────── mobile bars ───────────────────────── */
function MobileTopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-canvas/90 px-4 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onMenu}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted"
          aria-label="Open menu"
        >
          <Menu className="h-[22px] w-[22px]" />
        </button>
        <SovcartLogo size={26} tagline />
      </div>
      <div className="flex items-center gap-3">
        <button className="relative text-muted" aria-label="Notifications">
          <Bell className="h-[22px] w-[22px]" />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <Avatar size={34} />
      </div>
    </header>
  );
}

const MOBILE_TABS: { label: string; key: NavKey }[] = [
  { label: "Overview", key: "home" },
  { label: "Orders", key: "orders" },
  { label: "Products", key: "products" },
  { label: "Customers", key: "customers" },
];

function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 h-[68px] border-t border-line bg-canvas/95 backdrop-blur-md md:hidden">
      <div className="mx-auto grid h-full max-w-md grid-cols-5 items-center px-2">
        {/* Overview */}
        <Tab item={MOBILE_TABS[0]} active />
        {/* Orders */}
        <Tab item={MOBILE_TABS[1]} badge={24} />
        {/* center FAB */}
        <div className="flex items-center justify-center">
          <button className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-brand-grad text-white shadow-glow ring-4 ring-canvas">
            <Plus className="h-6 w-6" />
          </button>
        </div>
        {/* Products */}
        <Tab item={MOBILE_TABS[2]} />
        {/* Customers */}
        <Tab item={MOBILE_TABS[3]} />
      </div>
    </nav>
  );
}

function Tab({
  item,
  active,
  badge,
}: {
  item: { label: string; key: NavKey };
  active?: boolean;
  badge?: number;
}) {
  const Icon = navIcons[item.key];
  return (
    <button className={cn("flex flex-col items-center gap-1", active ? "text-brand-400" : "text-muted")}>
      <span className="relative">
        <Icon className="h-[22px] w-[22px]" />
        {badge != null && (
          <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[10px] font-medium">{item.label}</span>
    </button>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-line bg-surface-2 p-4 md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarBody />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── layouts ───────────────────────── */
function MobileLayout({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="md:hidden">
      <MobileTopBar onMenu={onMenu} />
      <main className="space-y-4 px-4 pb-[88px] pt-[76px]">
        <StoreSwitcher full />
        <DateRangePill full />
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((s, i) => (
            <StatCard key={s.key} stat={s} i={i} />
          ))}
        </div>
        <RevenueCard />
        <RecentOrders />
        <TopProducts />
        <AIAssistant />
        <Suggestions />
        <UpgradeCard variant="mini" />
      </main>
      <MobileBottomNav />
    </div>
  );
}

function TabletLayout({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="hidden h-[100dvh] overflow-hidden md:flex xl:hidden">
      <Sidebar />
      <main className="flex h-[100dvh] min-w-0 flex-1 flex-col gap-4 overflow-hidden p-5">
        <MainHeader onMenu={onMenu} />
        <StatsRow />
        <div className="grid min-h-0 flex-1 grid-cols-[1.7fr_1fr] gap-4">
          <div className="flex min-h-0 flex-col gap-4">
            <RevenueCard className="min-h-0 flex-1" />
            <AIAssistant />
            <div className="grid grid-cols-2 gap-4">
              <Suggestions footer />
              <UpgradeCard variant="compact" />
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-4">
            <RecentOrders />
            <TopProducts className="min-h-0 flex-1" />
          </div>
        </div>
      </main>
    </div>
  );
}

function DesktopLayout({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="hidden h-[100dvh] overflow-hidden xl:flex">
      <Sidebar />
      <main className="flex h-[100dvh] min-w-0 flex-1 flex-col gap-5 overflow-hidden p-6">
        <MainHeader onMenu={onMenu} />
        <StatsRow />
        <div className="grid min-h-0 flex-1 grid-cols-[1.7fr_1fr] gap-5">
          <div className="flex min-h-0 flex-col gap-5">
            <RevenueCard className="min-h-0 flex-1" />
            <div className="grid grid-cols-2 gap-5">
              <AIAssistant />
              <Suggestions footer />
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-5">
            <RecentOrders className="min-h-0 flex-1" />
            <div className="grid grid-cols-2 gap-5">
              <TopProducts />
              <UpgradeCard variant="full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ───────────────────────── root ───────────────────────── */
export function DashboardOverview() {
  const [drawer, setDrawer] = useState(false);
  const open = () => setDrawer(true);
  return (
    <div className="min-h-[100dvh] bg-canvas text-ink">
      <MobileLayout onMenu={open} />
      <TabletLayout onMenu={open} />
      <DesktopLayout onMenu={open} />
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </div>
  );
}
