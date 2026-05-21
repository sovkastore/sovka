import { cn } from "@/lib/utils";

type MarkProps = { size?: number; className?: string; variant?: "tile" | "plain" };

export function SovkaMark({ size = 40, className, variant = "tile" }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="Sovka">
      <defs>
        <linearGradient id="sovka-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6E3BFF" />
          <stop offset="1" stopColor="#4A1FBF" />
        </linearGradient>
      </defs>
      {variant === "tile" && <rect x="2" y="2" width="96" height="96" rx="26" fill="url(#sovka-g)" />}
      <path d="M37 43 C37 33 40 29 43.5 29 C47 29 50 33 50 43" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 43 C50 33 53 29 56.5 29 C60 29 63 33 63 43" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 42 H70 L68.3 73.5 C68.2 75.2 66.8 76.5 65 76.5 H35 C33.2 76.5 31.8 75.2 31.7 73.5 L30 42 Z" fill="#ffffff" />
      <path d="M34 50 H66" stroke="#6E3BFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SovkaLogo({
  size = 34,
  tone = "dark",
  variant = "tile",
  className,
}: {
  size?: number;
  tone?: "dark" | "light";
  variant?: "tile" | "plain";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <SovkaMark size={size} variant={variant} />
      <span className={cn("text-xl font-extrabold tracking-tight", tone === "light" ? "text-white" : "text-ink")}>
        Sovka
      </span>
    </span>
  );
}
