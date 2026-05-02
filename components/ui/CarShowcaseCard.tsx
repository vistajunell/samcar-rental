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
    enter: (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: -d * 80, opacity: 0 }),
  };

  return (
    <div className="relative w-full h-[520px]">
      {/* ── Top: counter + status ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-2">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${statusStyle[car.status]}`}
        >
          {car.status}
        </span>
        <span className="text-[11px] font-semibold text-gray-300 tabular-nums tracking-wider">
          {String(index + 1).padStart(2, "0")}
          <span className="text-gray-500 mx-0.5">/</span>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Brand + name (above car) ── */}
      <div className="absolute top-10 left-0 right-0 z-20 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${car.id}-name`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[11px] text-brand-red font-bold uppercase tracking-[0.25em]">
              {car.brand} · {car.year}
            </p>
            <h3 className="mt-1.5 text-3xl xl:text-4xl font-black text-white leading-tight tracking-tight">
              {car.name}
            </h3>
            <p className="mt-1 text-xs text-gray-400 italic">{car.tagline}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Car image stage with podium glow ── */}
      <div className="absolute top-32 left-0 right-0 bottom-44 flex items-center justify-center px-2">
        {/* Red ring spotlight behind car */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-brand-red/[0.12] blur-3xl animate-pulse-glow"
        />
        {/* Podium ellipse glow */}
        <div
          aria-hidden
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[72%] h-3 rounded-full bg-brand-red/40 blur-2xl"
        />

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={car.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Side arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous car"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-red text-white border border-white/20 hover:border-brand-red backdrop-blur-md flex items-center justify-center transition-all hover:scale-110"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next car"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-red text-white border border-white/20 hover:border-brand-red backdrop-blur-md flex items-center justify-center transition-all hover:scale-110"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* ── Bottom: specs + price + dots ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Specs row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${car.id}-specs`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-center gap-5 mb-3 text-white">
              <div className="flex items-center gap-1.5 text-xs">
                <Users className="h-3.5 w-3.5 text-brand-red" />
                <span className="font-semibold">{car.seats}</span>
                <span className="text-gray-400">seats</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-1.5 text-xs">
                <Cog className="h-3.5 w-3.5 text-brand-red" />
                <span className="font-semibold">
                  {car.transmission === "Automatic" ? "Auto" : "Manual"}
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-1.5 text-xs">
                <Fuel className="h-3.5 w-3.5 text-brand-red" />
                <span className="font-semibold">{car.fuelType}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-1 mb-5">
              <span className="text-4xl font-black text-white tracking-tight">
                ₱{car.pricePerDay.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 font-medium">/ day</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-1.5">
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
    </div>
  );
}
