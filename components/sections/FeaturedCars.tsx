import Link from "next/link";
import Image from "next/image";
import { Users, Cog, Fuel, ChevronRight, ArrowRight } from "lucide-react";
import { featuredCars } from "@/lib/data/cars";

const statusStyle: Record<string, string> = {
  Available: "bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30",
  Booked: "bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/40",
  Maintenance: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border border-yellow-500/40",
};

export default function FeaturedCars() {
  /* Show first 6 on homepage */
  const cars = featuredCars.slice(0, 6);

  return (
    <section id="cars" className="py-20 bg-[#f7f7f7] dark:bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-brand-red text-xs font-bold uppercase tracking-[0.2em]">
              Our Fleet
            </span>
            <h2 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Featured Cars
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-lg text-sm lg:text-base">
              Choose from our wide selection of well-maintained vehicles — sedans, SUVs, MPVs, and
              vans.
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-deep-red transition-colors shrink-0"
          >
            View All Cars <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <article
              key={car.id}
              className="group relative rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/[.05] shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-brand-red/30 transition-all duration-300 overflow-hidden"
            >
              {/* Image area */}
              <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#0a0a0a] overflow-hidden">
                {/* Subtle red glow under car */}
                <div
                  aria-hidden
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-3 rounded-full bg-brand-red/30 blur-2xl group-hover:bg-brand-red/50 transition-colors"
                />
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                />
                <span
                  className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md ${statusStyle[car.status]}`}
                >
                  {car.status}
                </span>
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-black/70 text-white backdrop-blur-md">
                  {car.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-[11px] text-brand-red font-bold uppercase tracking-widest mb-0.5">
                  {car.brand} · {car.year}
                </p>
                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                  {car.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
                  {car.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 dark:text-gray-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-brand-red" />
                    {car.seats} seats
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Cog className="h-3.5 w-3.5 text-brand-red" />
                    {car.transmission}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Fuel className="h-3.5 w-3.5 text-brand-red" />
                    {car.fuelType}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between pt-4 border-t border-gray-100 dark:border-white/[.05]">
                  <div>
                    <span className="text-2xl font-black text-brand-red tracking-tight">
                      ₱{car.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">/ day</span>
                  </div>
                  <Link
                    href={`/cars/${car.id}`}
                    className="shine-btn inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white text-xs font-bold transition-all"
                  >
                    <span className="relative z-[2]">View</span>
                    <ChevronRight className="relative z-[2] h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/cars"
            className="shine-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/25"
          >
            <span className="relative z-[2]">View All Cars</span>
            <ChevronRight className="relative z-[2] h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
