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
