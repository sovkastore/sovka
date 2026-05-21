"use client";

import { motion } from "framer-motion";
import { Store, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SovcartMark } from "@/components/brand/logo";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_20%_0%,#7B4DFF_0%,#4A1FBF_55%,#2A0F6E_100%)]" />
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-32 -left-20 -z-10 h-96 w-96 rounded-full bg-white/5 blur-2xl" />

      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1.5 pl-1.5 pr-4 text-xs font-semibold uppercase tracking-widest backdrop-blur"
        >
          <SovcartMark size={22} /> Sovcart
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight"
        >
          Your store,
          <br />
          ready to share.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-sm text-base text-white/80"
        >
          Beautiful online stores for sellers in Ghana &amp; Nigeria. Upload your
          products, share one link, get paid — beyond the DMs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex w-full flex-col items-center gap-3"
        >
          <Link
            href="/signup"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-ink shadow-soft transition active:scale-[0.98]"
          >
            <Store className="h-5 w-5 text-brand" /> Create your store
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link href="/login" className="text-sm font-medium text-white/70">
            I already have an account
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
