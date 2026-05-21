import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-ink placeholder:text-muted outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
