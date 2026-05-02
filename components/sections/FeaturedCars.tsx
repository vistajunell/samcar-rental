import Link from "next/link";
import { Users, Zap, Fuel, ChevronRight, ArrowRight } from "lucide-react";
import { featuredCars } from "@/lib/data/cars";

const statusStyle: Record<string, string> = {
  Available: "bg-green-500/20 text-green-300 border border-green-500/30",
  Booked: "bg-red-500/20 text-red-300 border border-red-500/30",
  Maintenance: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
};

const carEmojis: Record<string, string> = {
  "1": "🚗",
  "2": "🚙",
  "3": "🚐",
  "4": "🛻",
  "5": "🚌",
  "6": "🚗",
};

export default function FeaturedCars() {
  return (
    <section id="cars" className="py-20 bg-[#f7f7f7] dark:bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest">
              Our Fleet
            </span>
            <h2 className="mt-1.5 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              Featured Cars
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg text-sm">
              Choose from our wide selection of well-maintained vehicles — sedans, SUVs, and vans.
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-deep-red transition-colors shrink-0"
          >
            View All Cars <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="group rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/[.05] shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 transition-all duration-300 overflow-hidden"
            >
              {/* Visual area */}
              <div
                className="relative h-44 flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${car.cardColor}ee, ${car.cardColor}77)`,
                }}
              >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
                  {carEmojis[car.id]}
                </span>
                <span
                  className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[car.status]}`}
                >
                  {car.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-[11px] text-gray-400 mb-0.5">{car.tagline}</p>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{car.name}</h3>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-brand-red" />
                    {car.seats} seats
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-brand-red" />
                    {car.transmission}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Fuel className="h-3.5 w-3.5 text-brand-red" />
                    {car.fuelType}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-brand-red">
                      ₱{car.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">/day</span>
                  </div>
                  <Link
                    href={`/cars/${car.id}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white text-xs font-semibold transition-all"
                  >
                    Details <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/20"
          >
            View All Cars
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
