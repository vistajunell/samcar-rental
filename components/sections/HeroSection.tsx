import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import AvailabilitySearch from "@/components/ui/AvailabilitySearch";
import CarShowcaseCard from "@/components/ui/CarShowcaseCard";

const stats = [
  { value: "50+", label: "Cars Available" },
  { value: "500+", label: "Happy Clients" },
  { value: "5★", label: "Rated Service" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-[#050505] overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-brand-red/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Tagline badge */}
        <div className="flex justify-center lg:justify-start mb-7">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-red/25 bg-brand-red/[0.07] text-brand-red text-xs font-semibold">
            <Star className="h-3 w-3 fill-brand-red" />
            Trusted Car Rental in Lucena, Philippines
          </span>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 items-start">

          {/* ── LEFT: Intro + Buttons ── */}
          <div className="flex flex-col text-center lg:text-left lg:py-10">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-[3.25rem] font-black leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              Rent Your{" "}
              <span className="text-brand-red">Ideal Car</span>
              <br className="hidden sm:block" /> with SamCar Rental
            </h1>
            <p className="mt-5 text-base lg:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0">
              Browse clean, well-maintained, and ready-to-drive rental cars for your travel needs in
              Lucena and nearby areas.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/cars"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/20"
              >
                Browse Cars
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 dark:border-white/15 text-gray-800 dark:text-white hover:border-brand-red hover:text-brand-red dark:hover:border-brand-red dark:hover:text-brand-red font-bold text-sm transition-all"
              >
                Book Now
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-8 justify-center lg:justify-start">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CENTER: Availability Search ── */}
          <div className="flex items-start justify-center lg:pt-6">
            <div className="w-full max-w-xs">
              <AvailabilitySearch />
            </div>
          </div>

          {/* ── RIGHT: Car Showcase Carousel ── */}
          <div className="flex items-start justify-center lg:pt-2">
            <CarShowcaseCard />
          </div>
        </div>
      </div>
    </section>
  );
}
