"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  type LucideIcon,
  Home, ShoppingBag, Tag, Users, BarChart3, Megaphone, Ticket, Star,
  LayoutGrid, Settings, ChevronDown, Bell, ArrowRight, Plus, Crown, Menu, X, Search,
} from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SovcartLogo } from "@/components/brand/logo";
import { NAV, SELLER, type NavKey } from "@/lib/dashboard-mock";

export const card = "rounded-2xl border border-white/[0.06] bg-surface overflow-hidden";

export const navIcons: Record<NavKey, LucideIcon> = {
  home: Home, orders: ShoppingBag, products: Tag, customers: Users,
  analytics: BarChart3, marketing: Megaphone, discounts: Ticket, reviews: Star,
  integrations: LayoutGrid, settings: Settings,
};

// Only these nav items have real pages today; the rest are visual placeholders.
const ROUTES: Partial<Record<NavKey, string>> = {
  home: "/dashboard",
  products: "/dashboard/products",
};

export function Avatar({ size = 40 }: { size?: number }) {
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

function NavList({ activeKey, onNavigate }: { activeKey: NavKey; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const Icon = navIcons[item.key];
        const active = item.key === activeKey;
        const href = ROUTES[item.key];
        const cls = cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition",
          active
            ? "bg-brand-grad text-white shadow-[0_8px_22px_rgba(10,132,255,0.32)]"
            : "text-muted hover:bg-white/[0.04] hover:text-ink"
        );
        const inner = (
          <>
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span>{item.label}</span>
            {item.badge != null && (
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  active ? "bg-white/20 text-white" : "bg-brand-50 text-brand-400"
                )}
              >
                {item.badge}
              </span>
            )}
          </>
        );
        return href ? (
          <Link key={item.key} href={href} className={cls} onClick={onNavigate}>
            {inner}
          </Link>
        ) : (
          <button key={item.key} className={cls}>
            {inner}
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

function SidebarBody({ activeKey, onNavigate }: { activeKey: NavKey; onNavigate?: () => void }) {
  return (
    <>
      <div className="px-2 py-1">
        <SovcartLogo size={30} tagline />
      </div>
      <div className="mt-5 flex-1 overflow-y-auto no-scrollbar">
        <NavList activeKey={activeKey} onNavigate={onNavigate} />
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

export function Sidebar({ activeKey }: { activeKey: NavKey }) {
  return (
    <aside className="hidden h-[100dvh] w-[236px] shrink-0 flex-col border-r border-line bg-surface-2/50 p-4 lg:flex xl:w-[252px]">
      <SidebarBody activeKey={activeKey} />
    </aside>
  );
}

export function MobileTopBar({
  onMenu,
  tagline = true,
  showSearch = false,
}: {
  onMenu: () => void;
  tagline?: boolean;
  showSearch?: boolean;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-canvas px-4">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onMenu}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted"
          aria-label="Open menu"
        >
          <Menu className="h-[22px] w-[22px]" />
        </button>
        <SovcartLogo size={26} tagline={tagline} />
      </div>
      <div className="flex items-center gap-3">
        {showSearch && (
          <button className="text-muted" aria-label="Search">
            <Search className="h-[21px] w-[21px]" />
          </button>
        )}
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

function Tab({ item, active, badge }: { item: { label: string; key: NavKey }; active?: boolean; badge?: number }) {
  const Icon = navIcons[item.key];
  const href = ROUTES[item.key];
  const cls = cn("flex flex-col items-center gap-1", active ? "text-brand-400" : "text-muted");
  const inner = (
    <>
      <span className="relative">
        <Icon className="h-[22px] w-[22px]" />
        {badge != null && (
          <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[10px] font-medium">{item.label}</span>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <button className={cls}>{inner}</button>
  );
}

export function MobileBottomNav({ activeKey }: { activeKey: NavKey }) {
  return (
    <nav className="h-[68px] shrink-0 border-t border-line bg-canvas">
      <div className="mx-auto grid h-full max-w-md grid-cols-5 items-center px-2">
        <Tab item={MOBILE_TABS[0]} active={activeKey === "home"} />
        <Tab item={MOBILE_TABS[1]} badge={24} active={activeKey === "orders"} />
        <div className="flex items-center justify-center">
          <button className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-brand-grad text-white shadow-glow ring-4 ring-canvas">
            <Plus className="h-6 w-6" />
          </button>
        </div>
        <Tab item={MOBILE_TABS[2]} active={activeKey === "products"} />
        <Tab item={MOBILE_TABS[3]} active={activeKey === "customers"} />
      </div>
    </nav>
  );
}

export function MobileShell({
  activeKey,
  onMenu,
  showSearch = false,
  tagline = true,
  children,
}: {
  activeKey: NavKey;
  onMenu: () => void;
  showSearch?: boolean;
  tagline?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden lg:hidden">
      <MobileTopBar onMenu={onMenu} showSearch={showSearch} tagline={tagline} />
      <main className="flex-1 overflow-y-auto overscroll-contain will-change-transform">{children}</main>
      <MobileBottomNav activeKey={activeKey} />
    </div>
  );
}

export function MobileDrawer({ open, onClose, activeKey }: { open: boolean; onClose: () => void; activeKey: NavKey }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-line bg-surface-2 p-4 lg:hidden"
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
            <SidebarBody activeKey={activeKey} onNavigate={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
