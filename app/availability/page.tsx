import Link from "next/link";
import Image from "next/image";
import { format, differenceInCalendarDays } from "date-fns";
import {
  CalendarSearch,
  Calendar as CalendarIcon,
  Users,
  Cog,
  Fuel,
  ChevronRight,
  CarFront,
  AlertCircle,
} from "lucide-react";
import AvailabilityHeroForm from "@/components/availability/AvailabilityHeroForm";
import { getAvailableCarsInRange } from "@/lib/queries/availability";
import { type CarsFilter, type CarUIView } from "@/lib/queries/cars";

export const metadata = {
  title: "Check availability — SamCar Rental Lucena PH",
};

type SearchParams = {
  pickup?: string;
  return?: string;
  seats?: string;
  transmission?: string;
  category?: string;
};

const isoDateRe = /^\d{4}-\d{2}-\d{2}$/;
const validCategories = ["Sedan", "SUV", "MPV", "Van"] as const;
const validTransmissions = ["Automatic", "Manual"] as const;

function parseSafe(s?: string) {
  if (!s || !isoDateRe.test(s)) return null;
  const d = new Date(`${s}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default async function AvailabilityPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const start = parseSafe(sp.pickup);
  const end = parseSafe(sp.return);
  const hasDates = !!(start && end);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let cars: CarUIView[] | null = null;
  let errorMessage: string | null = null;

  if (hasDates) {
    if (start < today) {
      errorMessage = "Pick-up date must be today or later.";
    } else if (end < start) {
      errorMessage = "Return date must be on or after pick-up date.";
    } else {
      const filter: CarsFilter = {};
      if (sp.seats) {
        const n = parseInt(sp.seats, 10);
        if (!Number.isNaN(n) && n > 0) filter.seats = n;
      }
      if (
        sp.transmission &&
        (validTransmissions as readonly string[]).includes(sp.transmission)
      ) {
        filter.transmission = sp.transmission as CarsFilter["transmission"];
      }
      if (
        sp.category &&
        (validCategories as readonly string[]).includes(sp.category)
      ) {
        filter.category = sp.category as CarsFilter["category"];
      }
      cars = await getAvailableCarsInRange(start, end, filter);
    }
  }

  const days =
    hasDates && start && end
      ? Math.max(1, differenceInCalendarDays(end, start) + 1)
      : 0;

  return (
    <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#050505] pt-28 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
            Availability
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Find a car for your dates
          </h1>
          <p className="mt-3 text-sm lg:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
            We check live booking conflicts plus a 1-day grace buffer after every
            rental. Only cars truly free for your dates appear below.
          </p>
        </header>

        {/* Search */}
        <AvailabilityHeroForm
          initialPickup={sp.pickup}
          initialReturn={sp.return}
          initialSeats={sp.seats}
          initialTransmission={sp.transmission}
        />

        {/* Results */}
        <section className="mt-8">
          {!hasDates && <PromptForDates />}

          {hasDates && errorMessage && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            </div>
          )}

          {hasDates && !errorMessage && cars && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-base font-black text-gray-900 dark:text-white tracking-tight">
                    {cars.length} {cars.length === 1 ? "car" : "cars"} available
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 inline-flex items-center gap-1.5">
                    <CalendarIcon className="h-3 w-3 text-brand-red" />
                    {format(start!, "MMM d")} →{" "}
                    {format(end!, "MMM d, yyyy")} · {days} day
                    {days === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              {cars.length === 0 ? (
                <NoCarsFound />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {cars.map((car) => (
                    <AvailableCarCard
                      key={car.id}
                      car={car}
                      pickup={sp.pickup!}
                      returnDate={sp.return!}
                      days={days}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function PromptForDates() {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111] border border-dashed border-gray-200 dark:border-white/10 px-6 py-14 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-red/10 mb-4">
        <CalendarSearch className="h-7 w-7 text-brand-red" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Pick your travel dates
      </h2>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Enter pick-up and return dates above to see exactly which cars are
        available for your trip.
      </p>
      <Link
        href="/cars"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-deep-red"
      >
        Or browse the full fleet <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function NoCarsFound() {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111] border border-dashed border-gray-200 dark:border-white/10 px-6 py-14 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-red/10 mb-4">
        <CarFront className="h-7 w-7 text-brand-red" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        No cars available
      </h2>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Every car matching those filters is already booked for those dates. Try
        widening the date window or relaxing the filters.
      </p>
    </div>
  );
}

function AvailableCarCard({
  car,
  pickup,
  returnDate,
  days,
}: {
  car: CarUIView;
  pickup: string;
  returnDate: string;
  days: number;
}) {
  const total = car.pricePerDay * days;
  return (
    <article className="group rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/[.05] shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-brand-red/30 transition-all duration-300 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#0a0a0a] overflow-hidden">
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
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-black/70 text-white backdrop-blur-md">
          {car.category}
        </span>
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-green-500/90 text-white backdrop-blur-md">
          Available
        </span>
      </div>

      <div className="p-5">
        <p className="text-[11px] text-brand-red font-bold uppercase tracking-widest">
          {car.brand} · {car.year}
        </p>
        <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
          {car.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-brand-red" />
            {car.seats}
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

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/[.05] flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              {days} day{days === 1 ? "" : "s"}
            </p>
            <p className="text-2xl font-black text-brand-red tracking-tight">
              ₱{total.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              ₱{car.pricePerDay.toLocaleString()} / day
            </p>
          </div>
          <Link
            href={`/book?car=${car.slug}&pickup=${pickup}&return=${returnDate}`}
            className="shine-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-red hover:bg-deep-red text-white text-xs font-bold transition-all shadow-md shadow-brand-red/25"
          >
            <span className="relative z-[2]">Reserve</span>
            <ChevronRight className="relative z-[2] h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
