import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[88px] w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-brand/15",
          className
        )}
        {...props}
      />
    );
  }
);
