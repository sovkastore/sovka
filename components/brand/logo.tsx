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
      <svg viewBox="0 0 32 32" width={size * 0.68} height={size * 0.68} fill="none">
        {/* bag handle */}
        <path
          d="M11 13V11a5 5 0 0 1 10 0v2"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* bag body */}
        <path
          d="M8.8 13h14.4l-1 11.4a2.2 2.2 0 0 1-2.2 2H12a2.2 2.2 0 0 1-2.2-2L8.8 13Z"
          fill="white"
          fillOpacity="0.18"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* S */}
        <text
          x="16"
          y="23"
          textAnchor="middle"
          fontFamily="Poppins, Inter, sans-serif"
          fontSize="12"
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
