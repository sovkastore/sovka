import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function currencySymbol(code: string) {
  if (code === "NGN") return "₦";
  if (code === "GHS") return "₵";
  return code + " ";
}

export function formatPrice(amount: number, code: string) {
  return `${currencySymbol(code)}${(amount || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
