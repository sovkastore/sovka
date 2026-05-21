import * as React from "react";
import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  primary: "bg-brand-grad text-white shadow-glow hover:brightness-105",
  secondary: "bg-white/5 text-ink border border-white/10 hover:bg-white/10",
  outline: "bg-transparent text-ink border border-white/15 hover:bg-white/5",
  ghost: "bg-transparent text-ink hover:bg-white/5",
  danger: "bg-danger text-white hover:brightness-105",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-[15px] font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] ?? variants.primary,
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
