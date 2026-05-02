"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Users, Zap, Fuel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { featuredCars } from "@/lib/data/cars";

const carEmojis: Record<string, string> = {
  "1": "🚗",
  "2": "🚙",
  "3": "🚐",
  "4": "🛻",
  "5": "🚌",
  "6": "🚗",
};

const statusStyle: Record<string, string> = {
  Available: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Booked: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Maintenance: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export default function CarShowcaseCard() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const car = featuredCars[index];
  const total = featuredCars.length;

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go((index - 1 + total) % total);
  const next = () => go((index + 1) % total);

  const variants = {
    enter: (d: number) => ({ x: d * 50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: -d * 50, opacity: 0 }),
  };

  return (
    /* Outer wrapper — provides space above card for the overflow image */
    <div className="relative w-full max-w-[290px] mx-auto pt-12">
      {/* ── Floating car visual — overflows above the card ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[230px] h-[90px] z-10 pointer-events-none">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={car.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="w-full h-full rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${car.cardColor}f0, ${car.cardColor}88)`,
              boxShadow: `0 8px 32px ${car.cardColor}55`,
            }}
          >
            <span className="text-4xl leading-none">{carEmojis[car.id]}</span>
            <span className="text-white/60 text-[10px] font-semibold mt-1 tracking-wide">
              {car.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Card body ── */}
      <div className="rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/10 shadow-2xl pt-14 pb-5 px-5">
        {/* Status + counter */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[car.status]}`}>
            {car.status}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {index + 1} / {total}
          </span>
        </div>

        {/* Name + price */}
        <div className="text-center">
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">{car.tagline}</p>
          <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">
            {car.name}
          </h3>
          <div className="mt-1.5">
            <span className="text-2xl font-black text-brand-red">
              ₱{car.pricePerDay.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 ml-1">/ day</span>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { Icon: Users, value: `${car.seats}`, label: "Seats" },
            { Icon: Zap, value: car.transmission === "Automatic" ? "Auto" : "Manual", label: "Trans." },
            { Icon: Fuel, value: car.fuelType, label: "Fuel" },
          ].map(({ Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-white/5"
            >
              <Icon className="h-3.5 w-3.5 text-brand-red" />
              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">
                {value}
              </span>
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            onClick={prev}
            aria-label="Previous car"
            className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-brand-red hover:text-brand-red text-gray-500 dark:text-gray-400 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {featuredCars.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to car ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === index
                    ? "w-5 h-2 bg-brand-red"
                    : "w-2 h-2 bg-gray-200 dark:bg-white/20 hover:bg-brand-red/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next car"
            className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-brand-red hover:text-brand-red text-gray-500 dark:text-gray-400 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* View details CTA */}
        <Link
          href={`/cars/${car.id}`}
          className="mt-3 block w-full text-center py-2.5 rounded-xl border border-brand-red/30 text-brand-red hover:bg-brand-red hover:text-white text-sm font-semibold transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
