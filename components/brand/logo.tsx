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
      <svg viewBox="0 0 32 32" width={size * 0.72} height={size * 0.72} fill="none">
        {/* handle arch above the bag */}
        <path
          d="M11.4 13.4v-2.8a4.6 4.6 0 0 1 9.2 0v2.8"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* rounded bucket bag body (solid white) */}
        <rect x="8.8" y="12.4" width="14.4" height="13.4" rx="3.8" fill="white" />
        {/* bold blue S */}
        <text
          x="16"
          y="23.2"
          textAnchor="middle"
          fontFamily="Poppins, Inter, sans-serif"
          fontSize="12.5"
          fontWeight="800"
          fill="#0A84FF"
        >
          S
        </text>
      </svg>
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
