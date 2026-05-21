import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-[15px] text-ink placeholder:text-muted outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
