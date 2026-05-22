import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export function SovcartMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-[28%] bg-brand-grad shadow-glow",
        className
      )}
    >
      <ShoppingCart
        size={Math.round(size * 0.56)}
        strokeWidth={2.2}
        className="text-white"
      />
    </span>
  );
}

export function SovcartLogo({
  size = 32,
  tagline = false,
  className,
}: {
  size?: number;
  tagline?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SovcartMark size={size} />
      <span className="leading-none">
        <span className="font-display text-[1.35rem] font-bold tracking-tight text-ink">Sovcart</span>
        {tagline && <span className="mt-0.5 block text-[11px] font-medium text-muted">Build. Brand. Sell.</span>}
      </span>
    </span>
  );
}
