import Link from "next/link";
import { SovcartLogo } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <Link href="/" className="mb-8">
        <SovcartLogo size={36} />
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
