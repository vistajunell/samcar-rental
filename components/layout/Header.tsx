"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Car, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Cars", href: "/cars" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Rates", href: "/#rates" },
  { label: "Availability", href: "/availability" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-black/95 shadow-md backdrop-blur-md"
          : "bg-white/80 dark:bg-black/60 backdrop-blur-sm"
      } border-b border-black/[.06] dark:border-white/[.06]`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red">
              <Car className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
                SamCar
              </span>
              <span className="text-[9px] font-semibold text-brand-red tracking-[0.15em] uppercase">
                Rental Lucena
              </span>
            </div>
          </Link>

          {/* ── Desktop nav — fills remaining space ── */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-red dark:text-gray-300 dark:hover:text-brand-red rounded-md hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red transition-colors"
            >
              Login
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-red hover:bg-deep-red text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Book Now
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-auto p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-black/[.06] dark:border-white/[.06] bg-white dark:bg-black"
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-black/[.06] dark:border-white/[.06] flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 rounded-lg hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-center bg-brand-red hover:bg-deep-red text-white rounded-lg transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
