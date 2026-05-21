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
      <svg viewBox="0 0 32 32" width={size * 0.66} height={size * 0.66} fill="none">
        {/* shopping-bag handle */}
        <path
          d="M11 12V10.5a5 5 0 0 1 10 0V12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* bag body */}
        <path
          d="M8.5 12h15l-1 11.5a2 2 0 0 1-2 1.8H11.5a2 2 0 0 1-2-1.8L8.5 12Z"
          fill="white"
          fillOpacity="0.16"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="16"
          y="22"
          textAnchor="middle"
          fontFamily="Poppins, Inter, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="white"
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
