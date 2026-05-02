"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users, Cog, Fuel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { featuredCars } from "@/lib/data/cars";

const statusStyle: Record<string, string> = {
  Available: "bg-green-500/15 text-green-300 border-green-500/40",
  Booked: "bg-red-500/20 text-red-300 border-red-500/40",
  Maintenance: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
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
    enter: (d: number) => ({ x: d * 100, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: -d * 100, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="relative w-full">
      {/* ── Top bar: status + counter ── */}
      <div className="flex items-center justify-between mb-2 px-2 sm:px-4">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${statusStyle[car.status]}`}
        >
          {car.status}
        </span>
        <span className="text-[11px] font-semibold text-gray-400 tabular-nums tracking-[0.2em]">
          {String(index + 1).padStart(2, "0")}
          <span className="text-gray-600 mx-1">/</span>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Stage: huge car with side arrows ── */}
      <div className="relative h-[280px] sm:h-[340px] lg:h-[400px] flex items-center justify-center px-12 sm:px-16">
        {/* Soft red podium glow under car */}
        <div
          aria-hidden
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%] sm:w-[55%] h-6 rounded-full bg-brand-red/50 blur-2xl"
        />
        {/* Subtle radial behind car */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-brand-red/[0.06] blur-3xl"
        />

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={car.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full max-w-[680px]"
          >
            <Image
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 680px, (min-width: 640px) 500px, 100vw"
              className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating arrows */}
        <button
          onClick={prev}
          aria-label="Previous car"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.08] hover:bg-brand-red text-white border border-white/15 hover:border-brand-red backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next car"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.08] hover:bg-brand-red text-white border border-white/15 hover:border-brand-red backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* ── Info block (animated with car) ── */}
      <div className="mt-4 lg:mt-6 text-center min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${car.id}-info`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[11px] text-brand-red font-bold uppercase tracking-[0.3em]">
              {car.brand} · {car.year}
            </p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
              {car.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500 italic">{car.tagline}</p>

            {/* Specs row */}
            <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6 text-white">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Users className="h-4 w-4 text-brand-red" />
                <span className="font-semibold">{car.seats}</span>
                <span className="text-gray-500 hidden sm:inline">seats</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Cog className="h-4 w-4 text-brand-red" />
                <span className="font-semibold">
                  {car.transmission === "Automatic" ? "Auto" : "Manual"}
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Fuel className="h-4 w-4 text-brand-red" />
                <span className="font-semibold">{car.fuelType}</span>
              </div>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/30" />
              <div className="hidden sm:flex items-baseline gap-1">
                <span className="text-lg font-black text-white">
                  ₱{car.pricePerDay.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">/day</span>
              </div>
            </div>

            {/* Mobile-only price */}
            <div className="mt-2 sm:hidden flex items-baseline justify-center gap-1">
              <span className="text-xl font-black text-white">
                ₱{car.pricePerDay.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">/day</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot pagination ── */}
      <div className="mt-5 flex justify-center gap-1.5 flex-wrap px-4">
        {featuredCars.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to car ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "w-7 h-1.5 bg-brand-red"
                : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
