import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
const variants = {
  primary: "bg-brand text-white shadow-soft hover:bg-brand-700",
  secondary: "bg-white text-ink border border-black/5 hover:bg-canvas",
  ghost: "text-ink hover:bg-black/5",
};
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants };
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
