// Static mock content for the Product Management screen.
// Values mirror the mockups per-screen (desktop/tablet share the rich set; mobile uses its own).
// Will be reconciled to one source when wired to real data.

export type PStatus = "Active" | "Draft" | "Out of Stock" | "Archived";
export type StockState = "in" | "low" | "out";
export type Variant = { name: string; sku: string; price: string; stock: number };

export type Product = {
  id: string;
  name: string;
  category: string;
  sku: string;
  stock: number;
  stockState: StockState;
  price: string;
  compareAt: string;
  costPrice: string;
  profit: string;
  profitPct: string;
  onSale: boolean;
  status: PStatus;
  dateAdded: string;
  slug: string;
  brand: string;
  tags: string[];
  shortDesc: string;
  shortCount: string;
  desc: string;
  descCount: string;
  lowStockAlert: number;
  trackInventory: boolean;
  variants: Variant[];
  img: string;
};

const baseEditor = {
  brand: "Luxe Wears",
  lowStockAlert: 10,
  trackInventory: true,
  shortDesc: "Premium quality piece with a comfortable fit and durable build.",
  shortCount: "62/160",
  desc: "Crafted with high-quality materials for everyday comfort and long-lasting wear. Designed to look great and built to last.",
  descCount: "126/1000",
};

export const PRODUCTS: Product[] = [
  {
    id: "p1", name: "Canvas Sneakers White", category: "Footwear", sku: "SNK-WHT-001",
    stock: 124, stockState: "in", price: "₦2,976,000", compareAt: "₦3,600,000",
    costPrice: "₦1,650,000", profit: "₦1,326,000", profitPct: "44.6%", onSale: true,
    status: "Active", dateAdded: "May 14, 2024", slug: "canvas-sneakers-white",
    brand: "Luxe Wears", tags: ["Sneakers", "Canvas", "Casual"],
    shortDesc: "Premium canvas sneakers with comfortable fit and durable sole.", shortCount: "68/160",
    desc: "Crafted with high-quality canvas material for breathability and everyday comfort. The durable sole provides grip and long-lasting wear.",
    descCount: "134/1000", lowStockAlert: 10, trackInventory: true,
    variants: [
      { name: "White / 40", sku: "SNK-WHT-001-40", price: "₦2,976,000", stock: 62 },
      { name: "White / 41", sku: "SNK-WHT-001-41", price: "₦2,976,000", stock: 62 },
    ],
    img: "/products/sneakers-white.webp",
  },
  {
    id: "p2", name: "T-Shirt Oversized Black", category: "Apparel", sku: "TSH-BLK-002",
    stock: 98, stockState: "in", price: "₦1,813,000", compareAt: "₦2,200,000",
    costPrice: "₦980,000", profit: "₦833,000", profitPct: "45.9%", onSale: true,
    status: "Active", dateAdded: "May 13, 2024", slug: "t-shirt-oversized-black",
    ...baseEditor, tags: ["Apparel", "Oversized", "Cotton"],
    variants: [
      { name: "Black / M", sku: "TSH-BLK-002-M", price: "₦1,813,000", stock: 49 },
      { name: "Black / L", sku: "TSH-BLK-002-L", price: "₦1,813,000", stock: 49 },
    ],
    img: "/products/tshirt-black.webp",
  },
  {
    id: "p3", name: "Hoodie Premium Grey", category: "Apparel", sku: "HOD-GRY-003",
    stock: 74, stockState: "in", price: "₦1,554,000", compareAt: "₦1,900,000",
    costPrice: "₦840,000", profit: "₦714,000", profitPct: "45.9%", onSale: false,
    status: "Active", dateAdded: "May 12, 2024", slug: "hoodie-premium-grey",
    ...baseEditor, tags: ["Apparel", "Hoodie", "Fleece"],
    variants: [{ name: "Grey / L", sku: "HOD-GRY-003-L", price: "₦1,554,000", stock: 74 }],
    img: "/products/hoodie-grey.webp",
  },
  {
    id: "p4", name: "Cargo Pants Olive", category: "Bottoms", sku: "CRG-OLV-004",
    stock: 63, stockState: "in", price: "₦1,386,000", compareAt: "₦1,700,000",
    costPrice: "₦760,000", profit: "₦626,000", profitPct: "45.2%", onSale: false,
    status: "Active", dateAdded: "May 11, 2024", slug: "cargo-pants-olive",
    ...baseEditor, tags: ["Bottoms", "Cargo", "Utility"],
    variants: [{ name: "Olive / 32", sku: "CRG-OLV-004-32", price: "₦1,386,000", stock: 63 }],
    img: "/products/cargo-olive.webp",
  },
  {
    id: "p5", name: "Cap Signature Black", category: "Accessories", sku: "CAP-BLK-005",
    stock: 52, stockState: "in", price: "₦390,000", compareAt: "₦480,000",
    costPrice: "₦210,000", profit: "₦180,000", profitPct: "46.2%", onSale: false,
    status: "Active", dateAdded: "May 10, 2024", slug: "cap-signature-black",
    ...baseEditor, tags: ["Accessories", "Cap", "Logo"],
    variants: [{ name: "Black / OS", sku: "CAP-BLK-005-OS", price: "₦390,000", stock: 52 }],
    img: "/products/cap-black.webp",
  },
  {
    id: "p6", name: "Sneakers Runner Grey", category: "Footwear", sku: "SNK-GRY-006",
    stock: 41, stockState: "low", price: "₦2,760,000", compareAt: "₦3,300,000",
    costPrice: "₦1,520,000", profit: "₦1,240,000", profitPct: "44.9%", onSale: true,
    status: "Active", dateAdded: "May 9, 2024", slug: "sneakers-runner-grey",
    ...baseEditor, tags: ["Sneakers", "Runner", "Sport"],
    variants: [{ name: "Grey / 42", sku: "SNK-GRY-006-42", price: "₦2,760,000", stock: 41 }],
    img: "/products/sneakers-white.webp",
  },
  {
    id: "p7", name: "Jacket Denim Blue", category: "Apparel", sku: "JKT-BLU-007",
    stock: 34, stockState: "low", price: "₦3,450,000", compareAt: "₦4,100,000",
    costPrice: "₦1,890,000", profit: "₦1,560,000", profitPct: "45.2%", onSale: false,
    status: "Draft", dateAdded: "May 8, 2024", slug: "jacket-denim-blue",
    ...baseEditor, tags: ["Apparel", "Denim", "Jacket"],
    variants: [{ name: "Blue / M", sku: "JKT-BLU-007-M", price: "₦3,450,000", stock: 34 }],
    img: "/products/jacket-black.webp",
  },
  {
    id: "p8", name: "Shorts Essentials Black", category: "Bottoms", sku: "SRT-BLK-008",
    stock: 29, stockState: "low", price: "₦980,000", compareAt: "₦1,200,000",
    costPrice: "₦530,000", profit: "₦450,000", profitPct: "45.9%", onSale: false,
    status: "Draft", dateAdded: "May 7, 2024", slug: "shorts-essentials-black",
    ...baseEditor, tags: ["Bottoms", "Shorts", "Essentials"],
    variants: [{ name: "Black / 32", sku: "SRT-BLK-008-32", price: "₦980,000", stock: 29 }],
    img: "/products/cargo-olive.webp",
  },
];

export const DESKTOP_TABS = [
  { label: "All", count: 128 },
  { label: "Active", count: 120 },
  { label: "Draft", count: 6 },
  { label: "Out of Stock", count: 2 },
  { label: "Archived", count: 0 },
];

export const TABLET_TABS = [
  { label: "All", count: 128 },
  { label: "Active", count: 120 },
  { label: "Draft", count: 8 },
];

export const EDITOR_CATEGORIES = [
  { name: "Footwear", checked: true },
  { name: "Sneakers", checked: true },
  { name: "Men", checked: true },
  { name: "Women", checked: false },
  { name: "Accessories", checked: false },
];

export const EDITOR_MEDIA = [
  { name: "sneakers-white-guide.pdf", size: "1.2 MB", type: "PDF" as const },
  { name: "sneakers-white-video.mp4", size: "8.4 MB", type: "MP4" as const },
];

export const STOCK_LABEL: Record<StockState, string> = { in: "In stock", low: "Low stock", out: "Out of stock" };

/* ───────────────── mobile (separate value set, per its mockup) ───────────────── */
export type MobileStatus = "Active" | "Low Stock" | "Out of Stock";
export type MobileProduct = {
  id: string; name: string; sku: string; price: string; status: MobileStatus;
  stockLabel: string; variants: number; visible: boolean; img: string;
};

export const MOBILE_PRODUCTS: MobileProduct[] = [
  { id: "m1", name: "Canvas Sneakers White", sku: "CSW-001", price: "₦24,000", status: "Active", stockLabel: "124 in stock", variants: 3, visible: true, img: "/products/sneakers-white.webp" },
  { id: "m2", name: "T-Shirt Oversized Black", sku: "TSB-002", price: "₦18,500", status: "Low Stock", stockLabel: "28 in stock", variants: 4, visible: true, img: "/products/tshirt-black.webp" },
  { id: "m3", name: "Hoodie Premium Grey", sku: "HPG-003", price: "₦22,000", status: "Active", stockLabel: "74 in stock", variants: 3, visible: true, img: "/products/hoodie-grey.webp" },
  { id: "m4", name: "Cargo Pants Olive", sku: "CPO-004", price: "₦20,000", status: "Out of Stock", stockLabel: "0 in stock", variants: 2, visible: true, img: "/products/cargo-olive.webp" },
  { id: "m5", name: "Cap Signature Black", sku: "CSB-005", price: "₦8,500", status: "Active", stockLabel: "52 in stock", variants: 2, visible: true, img: "/products/cap-black.webp" },
];

export const MOBILE_STATS = [
  { label: "Total Products", value: "124", note: "8.4% vs last 7 days", tone: "brand" as const, delta: true },
  { label: "Active", value: "96", note: "77.4% of total", tone: "success" as const },
  { label: "Hidden", value: "8", note: "6.5% of total", tone: "warning" as const },
  { label: "Out of Stock", value: "20", note: "16.1% of total", tone: "danger" as const },
];

export const MOBILE_TABS_P = [
  { label: "All Products", count: 124 },
  { label: "Active", count: 96 },
  { label: "Hidden", count: 8 },
  { label: "Out of Stock", count: 20 },
];

export const MOBILE_SHEET = {
  name: "Canvas Sneakers White", status: "Active", img: "/products/sneakers-white.webp",
  sku: "CSW-001", price: "₦24,000", stock: "124 units", variants: 3,
  desc: "Premium canvas sneakers with cushioned insole and non-slip sole for everyday comfort and style.",
};

export const AI_PRODUCT_CHIPS = ["Improve description", "Generate tags", "SEO optimize"];
