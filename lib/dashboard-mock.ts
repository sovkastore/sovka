// Static mock content for the seller Overview dashboard.
// Mirrors the provided mockups exactly (Luxe Wears / Daniel). Real-data wiring is a later phase.

export const STORE = { name: "Luxe Wears", domain: "luxe-wears.sovcart.com" };
export const SELLER = {
  firstName: "Daniel",
  fullName: "Daniel Okafor",
  role: "Admin",
  avatar: "/people/seller-daniel.webp",
};
export const DATE_RANGE = "May 12 – May 18, 2024";
export const COMPARE = "vs May 5 – May 11";

export type StatKey = "revenue" | "orders" | "customers" | "conversion";
export const STATS: { key: StatKey; label: string; value: string; delta: string }[] = [
  { key: "revenue", label: "Total Revenue", value: "₦1,245,000", delta: "18.2%" },
  { key: "orders", label: "Orders", value: "243", delta: "12.5%" },
  { key: "customers", label: "Customers", value: "156", delta: "8.4%" },
  { key: "conversion", label: "Conversion Rate", value: "3.6%", delta: "0.6%" },
];

export const CHART = {
  max: 1_500_000,
  yTicks: ["N1.5M", "N1.2M", "N900K", "N600K", "N300K", "N0"],
  xLabels: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"],
  points: [300_000, 520_000, 700_000, 600_000, 700_000, 950_000, 1_245_000],
  peakLabel: "May 18, 2024",
  peakValue: "₦1,245,000",
};

export type OrderStatus = "Paid" | "Pending";
export const RECENT_ORDERS: {
  id: string; title: string; amount: string; status: OrderStatus; img: string;
}[] = [
  { id: "#SOV-2456", title: "T-Shirt Oversized Black", amount: "₦1,813,000", status: "Paid", img: "/products/tshirt-black.webp" },
  { id: "#SOV-2455", title: "Canvas Sneakers White", amount: "₦2,976,000", status: "Paid", img: "/products/sneakers-white.webp" },
  { id: "#SOV-2454", title: "Hoodie Premium Grey", amount: "₦1,554,000", status: "Pending", img: "/products/hoodie-grey.webp" },
];

export const TOP_PRODUCTS: {
  rank: number; title: string; sold: number; amount: string; img: string;
}[] = [
  { rank: 1, title: "Canvas Sneakers White", sold: 124, amount: "₦2,976,000", img: "/products/sneakers-white.webp" },
  { rank: 2, title: "T-Shirt Oversized Black", sold: 98, amount: "₦1,813,000", img: "/products/tshirt-black.webp" },
  { rank: 3, title: "Hoodie Premium Grey", sold: 74, amount: "₦1,554,000", img: "/products/hoodie-grey.webp" },
  { rank: 4, title: "Cargo Pants Olive", sold: 63, amount: "₦1,386,000", img: "/products/cargo-olive.webp" },
  { rank: 5, title: "Cap Signature Black", sold: 52, amount: "₦390,000", img: "/products/cap-black.webp" },
];
export const TOP_PRODUCTS_MAX = 124;

export const AI_CHIPS = ["Generate product description", "Create marketing caption", "Store optimization tips"];

export const SUGGESTIONS = [
  "Add more product images to increase sales",
  "Your store conversion can improve by 12%",
  "Enable abandoned cart recovery",
];

export const UPGRADE_FEATURES = [
  "Advanced analytics",
  "Marketing automation",
  "Abandoned cart recovery",
  "Priority support",
  "And much more",
];

export type NavKey =
  | "home" | "orders" | "products" | "customers" | "analytics"
  | "marketing" | "discounts" | "reviews" | "integrations" | "settings";
export const NAV: { label: string; key: NavKey; active?: boolean; badge?: number }[] = [
  { label: "Overview", key: "home", active: true },
  { label: "Orders", key: "orders", badge: 24 },
  { label: "Products", key: "products" },
  { label: "Customers", key: "customers" },
  { label: "Analytics", key: "analytics" },
  { label: "Marketing", key: "marketing" },
  { label: "Discounts", key: "discounts" },
  { label: "Reviews", key: "reviews" },
  { label: "Integrations", key: "integrations" },
  { label: "Settings", key: "settings" },
];
