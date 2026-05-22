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
        {/* white handle arch sitting above the bag */}
        <path
          d="M11 12.5V9a5 5 0 0 1 10 0v3.5"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* blue bag body, no container behind it */}
        <rect x="6.5" y="12" width="19" height="16" rx="5" fill="url(#sovBagGrad)" />
        {/* bold white S */}
        <text
          x="16"
          y="24.6"
          textAnchor="middle"
          fontFamily="Poppins, Inter, sans-serif"
          fontSize="15"
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
