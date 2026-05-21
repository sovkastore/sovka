import Link from "next/link";
import { SovkaLogo } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(120%_120%_at_50%_0%,#6E3BFF_0%,#4A1FBF_60%,#F4F4F8_100%)]" />
      <Link href="/" className="mb-8">
        <SovkaLogo tone="light" size={36} />
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
