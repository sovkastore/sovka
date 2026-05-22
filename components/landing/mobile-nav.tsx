"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export function MobileNav({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock body scroll + close on Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-[60] flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink transition active:scale-95"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[55] lg:hidden">
            {/* dimmed backdrop below the header; tap to close */}
            <div
              onClick={close}
              className="pointer-events-auto absolute inset-x-0 bottom-0 top-[56px] bg-black/50 backdrop-blur-sm"
            />
            {/* dropdown panel */}
            <div className="pointer-events-auto absolute inset-x-4 top-[62px] rounded-2xl border border-white/10 bg-surface p-2 shadow-card">
              <nav className="flex flex-col">
                {items.map((n) => (
                  <Link
                    key={n}
                    href="#"
                    onClick={close}
                    className="rounded-xl px-4 py-3 text-[15px] font-medium text-ink transition hover:bg-white/5"
                  >
                    {n}
                  </Link>
                ))}
                <div className="my-1.5 h-px bg-white/10" />
                <Link
                  href="/login"
                  onClick={close}
                  className="rounded-xl px-4 py-3 text-[15px] font-medium text-ink transition hover:bg-white/5"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={close}
                  className="mt-1.5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-grad px-4 py-3 text-[15px] font-semibold text-white shadow-glow"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
