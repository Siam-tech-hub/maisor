"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement marquee */}
      <div className="bg-bottle-900 text-white overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-2 text-xs uppercase tracking-[0.25em]">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0">
              {[
                "Free delivery over ৳3000",
                "Cash on delivery available",
                "New collection — Emerald Season",
                "Easy size exchange",
              ].map((t, i) => (
                <span key={i} className="mx-8 flex items-center gap-8">
                  {t}
                  <span className="text-bottle-400">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden -ml-1 p-2 text-ink"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold uppercase tracking-[0.3em] text-ink lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            Maisor
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm uppercase tracking-[0.18em] transition-colors hover:text-bottle-700 ${
                  pathname === item.href ? "text-bottle-700" : "text-ink/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-ink/80 hover:text-bottle-700 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-bottle-700 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-black/5 bg-cream px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-sm uppercase tracking-[0.18em] ${
                  pathname === item.href ? "text-bottle-700" : "text-ink/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
