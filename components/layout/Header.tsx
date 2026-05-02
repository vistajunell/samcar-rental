"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "About", href: "/#about" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Availability", href: "/availability" },
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
          ? "bg-white/95 dark:bg-black/90 shadow-lg shadow-black/5 dark:shadow-black/40 backdrop-blur-xl"
          : "bg-white/70 dark:bg-black/40 backdrop-blur-md"
      } border-b border-black/[.06] dark:border-white/[.06]`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center gap-6">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative h-12 w-[120px] sm:h-14 sm:w-[140px] transition-transform group-hover:scale-[1.03]">
              <Image
                src="/images/logo/samcar-logo.webp"
                alt="SamCar Rental Lucena PH"
                fill
                priority
                sizes="140px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* ── Desktop nav — fills available space ── */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-brand-red dark:text-gray-200 dark:hover:text-brand-red rounded-md transition-colors group"
              >
                {link.label}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-0 h-[2px] bg-brand-red group-hover:w-5 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red transition-colors"
            >
              Login
            </Link>
            <Link
              href="/book"
              className="shine-btn inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-red hover:bg-deep-red text-white text-sm font-bold transition-colors shadow-lg shadow-brand-red/25"
            >
              <span className="relative z-[2]">Book Now</span>
              <ChevronRight className="relative z-[2] h-3.5 w-3.5" />
            </Link>
          </div>

          {/* ── Mobile theme toggle + hamburger ── */}
          <div className="lg:hidden ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-black/[.06] dark:border-white/[.06] bg-white dark:bg-black"
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-black/[.06] dark:border-white/[.06] flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-center text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 rounded-lg hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="shine-btn relative px-4 py-3 text-sm font-bold text-center bg-brand-red hover:bg-deep-red text-white rounded-lg transition-colors"
                >
                  <span className="relative z-[2]">Book Now</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
