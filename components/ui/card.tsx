import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-3xl bg-white p-5 shadow-card", className)} {...props} />;
}
