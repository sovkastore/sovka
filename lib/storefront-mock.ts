// Buyer-facing storefront mock for Luxe Wears.
// All values match the three provided mockup screenshots.

export const STORE = { name: "Luxe Wears", slug: "luxe-wears" };
export const ANNOUNCEMENT = "Free shipping on orders over ₦50,000";

export const NAV_LINKS = [
  { label: "Home", active: true },
  { label: "Shop" },
  { label: "Categories", dropdown: true },
  { label: "New Arrivals" },
  { label: "Collections" },
  { label: "About Us" },
];

export const SLIDES = [
  { tag: "NEW ARRIVALS", heading: "Elevate Your Everyday Style", sub: "Premium pieces. Timeless confidence.", cta: "Shop Now", img: "/products/hero.webp" },
  { tag: "TRENDING", heading: "Premium Comfort Redefined", sub: "Everyday essentials, elevated.", cta: "Explore", img: "/products/hoodie-grey.webp" },
  { tag: "ESSENTIALS", heading: "Style That Works For You", sub: "Built for life. Designed to impress.", cta: "Shop Essentials", img: "/products/jacket-black.webp" },
  { tag: "NEW COLLECTION", heading: "Step Into Excellence", sub: "The new standard in footwear.", cta: "Shop Sneakers", img: "/products/sneakers-white.webp" },
];

export const CATEGORIES = [
  { label: "T-Shirts", img: "/products/tshirt-black.webp" },
  { label: "Hoodies", img: "/products/hoodie-grey.webp" },
  { label: "Sneakers", img: "/products/sneakers-white.webp" },
  { label: "Pants", img: "/products/cargo-olive.webp" },
  { label: "Accessories", img: "/products/cap-black.webp" },
  { label: "Jackets", img: "/products/jacket-black.webp" },
  { label: "Bags", img: "/products/cap-black.webp" },
];

export type SfProduct = {
  id: string; name: string; price: string;
  rating: number; reviews: number; img: string;
};

export const FEATURED: SfProduct[] = [
  { id: "f1", name: "Canvas Sneakers White", price: "₦24,000", rating: 4.7, reviews: 124, img: "/products/sneakers-white.webp" },
  { id: "f2", name: "T-Shirt Oversized Black", price: "₦18,500", rating: 4.6, reviews: 98, img: "/products/tshirt-black.webp" },
  { id: "f3", name: "Hoodie Premium Grey", price: "₦22,000", rating: 4.8, reviews: 74, img: "/products/hoodie-grey.webp" },
  { id: "f4", name: "Cargo Pants Olive", price: "₦26,500", rating: 4.7, reviews: 63, img: "/products/cargo-olive.webp" },
  { id: "f5", name: "Classic Cap Black", price: "₦7,500", rating: 4.5, reviews: 41, img: "/products/cap-black.webp" },
  { id: "f6", name: "Lightweight Jacket", price: "₦35,000", rating: 4.6, reviews: 52, img: "/products/jacket-black.webp" },
];

export const NEW_ARRIVALS: SfProduct[] = [
  { id: "n1", name: "Denim Jacket Black", price: "₦42,000", rating: 4.5, reviews: 28, img: "/products/jacket-black.webp" },
  { id: "n2", name: "Cropped Hoodie Black", price: "₦19,500", rating: 4.7, reviews: 19, img: "/products/hoodie-grey.webp" },
  { id: "n3", name: "Essential White Tee", price: "₦12,000", rating: 4.8, reviews: 47, img: "/products/tshirt-black.webp" },
  { id: "n4", name: "Canvas Sneakers White", price: "₦24,000", rating: 4.7, reviews: 124, img: "/products/sneakers-white.webp" },
  { id: "n5", name: "Cargo Pants Olive", price: "₦26,500", rating: 4.7, reviews: 63, img: "/products/cargo-olive.webp" },
  { id: "n6", name: "Cap Signature Black", price: "₦8,500", rating: 4.5, reviews: 34, img: "/products/cap-black.webp" },
  { id: "n7", name: "Leather Crossbody", price: "₦31,000", rating: 4.4, reviews: 22, img: "/products/jacket-black.webp" },
];

export const TRUST = [
  { icon: "truck", title: "Free Shipping", sub: "On orders over ₦50,000" },
  { icon: "refresh", title: "Easy Returns", sub: "30-day return policy" },
  { icon: "shield", title: "Secure Payments", sub: "100% protected checkout" },
  { icon: "headphones", title: "Get Support", sub: "We're here to help" },
];

/* ─── product detail ─── */
export type ProductDetailData = {
  id: string; name: string; tag: string; inStock: boolean;
  rating: number; reviews: number; price: string; priceRaw: number;
  description: string; productDetailItems: string[];
  breadcrumb: string[];
  images: { id: string; url: string; alt: string }[];
  sizes: { value: string; available: boolean }[];
  defaultSize: string;
  colors: { name: string; hex: string; hex2?: string }[];
  defaultColor: string;
  whatsappPhone: string; instagramHandle: string;
  deliveryNote: string; deliveryEst: string;
};

export const PRODUCT_DETAIL: ProductDetailData = {
  id: "canvas-sneakers-white",
  name: "Canvas Sneakers White",
  tag: "New Arrival",
  inStock: true,
  rating: 4.7,
  reviews: 124,
  price: "₦24,000",
  priceRaw: 24000,
  description: "Clean, classic and effortlessly versatile. Premium canvas with a cushioned insole for all-day comfort and timeless style.",
  productDetailItems: [
    "Premium canvas upper",
    "Breathable lining",
    "Cushioned insole for all-day comfort",
    "Rubber outsole for durability and grip",
  ],
  breadcrumb: ["Home", "Sneakers", "Canvas Sneakers White"],
  images: [
    { id: "i1", url: "/products/sneakers-white.webp", alt: "Canvas Sneakers White — Front" },
    { id: "i2", url: "/products/sneakers-white.webp", alt: "Canvas Sneakers White — Side" },
    { id: "i3", url: "/products/sneakers-white.webp", alt: "Canvas Sneakers White — Back" },
    { id: "i4", url: "/products/sneakers-white.webp", alt: "Canvas Sneakers White — Detail" },
    { id: "i5", url: "/products/sneakers-white.webp", alt: "Canvas Sneakers White — Top" },
  ],
  sizes: [
    { value: "40", available: true },
    { value: "41", available: true },
    { value: "42", available: true },
    { value: "43", available: true },
    { value: "44", available: true },
  ],
  defaultSize: "42",
  colors: [
    { name: "White", hex: "#EAEAEA" },
    { name: "Black", hex: "#1A1A1A" },
    { name: "Brown/White", hex: "#8B5E3C", hex2: "#EAEAEA" },
  ],
  defaultColor: "White",
  whatsappPhone: "2348000000000",
  instagramHandle: "luxewears",
  deliveryNote: "Free delivery on orders over ₦50,000",
  deliveryEst: "2–4 business days",
};

export const SIMILAR_PRODUCTS: SfProduct[] = FEATURED.filter((p) => p.id !== "f1");

