import { cn } from "@/lib/utils";

export function SovcartMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
    >
      <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
        <defs>
          <linearGradient id="sovBagGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#38BDF8" />
            <stop offset="1" stopColor="#0A84FF" />
          </linearGradient>
        </defs>
        {/* shopping-bag body: trapezoid flaring wider at the bottom, rounded base */}
        <path
          d="M10.5 11 L21.5 11 L23 24 Q23.4 27.3 20.1 27.3 L11.9 27.3 Q8.6 27.3 9 24 Z"
          fill="url(#sovBagGrad)"
        />
        {/* two short handle arcs at the rim */}
        <path
          d="M12 11.2C12 8.4 15 8.4 15 11.2 M17 11.2C17 8.4 20 8.4 20 11.2"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* bold white S */}
        <text
          x="16"
          y="24.2"
          textAnchor="middle"
          fontFamily="Poppins, Inter, sans-serif"
          fontSize="13.5"
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
