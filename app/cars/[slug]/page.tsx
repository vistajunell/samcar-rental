import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Users,
  Cog,
  Fuel,
  Calendar,
  Shield,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { getCarBySlug, getRelatedCars } from "@/lib/queries/cars";
import CarListingCard from "@/components/cars/CarListingCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Car not found — SamCar Rental" };
  return {
    title: `${car.brand} ${car.name} ${car.year} — SamCar Rental Lucena PH`,
    description:
      car.description ??
      `Rent the ${car.brand} ${car.name} (${car.year}) in Lucena. ${car.seats} seats · ${car.transmission} · ${car.fuelType}.`,
  };
}

const includedFeatures = [
  "Comprehensive insurance",
  "Free roadside assistance",
  "Sanitized & detailed",
  "Free 200km / day",
  "24/7 customer support",
  "Full tank pickup",
];

const statusBadgeStyle: Record<string, string> = {
  Available:
    "bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30",
  Maintenance:
    "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border border-yellow-500/40",
  Retired:
    "bg-gray-500/15 text-gray-700 dark:text-gray-300 border border-gray-500/40",
};

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();

  const related = await getRelatedCars(car.category, car.slug, 3);

  return (
    <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#050505] pt-28 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/cars"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-brand-red mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all cars
        </Link>

        {/* Hero card */}
        <section className="rounded-2xl overflow-hidden bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
            {/* Image stage */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#1a1a1a] dark:to-[#050505] min-h-[320px] lg:min-h-[460px] overflow-hidden">
              <div
                aria-hidden
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-brand-red/40 blur-3xl rounded-full"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.15)_100%)]"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-black/70 text-white backdrop-blur-md">
                  {car.category}
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md ${statusBadgeStyle[car.status]}`}
                >
                  {car.status}
                </span>
              </div>
              <Image
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-contain p-8 drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
              />
            </div>

            {/* Info column */}
            <div className="p-6 lg:p-8 flex flex-col">
              <p className="text-xs font-bold text-brand-red uppercase tracking-[0.25em]">
                {car.brand} · {car.year}
              </p>
              <h1 className="mt-1 text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                {car.name}
              </h1>
              {car.tagline && (
                <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
                  {car.tagline}
                </p>
              )}

              {/* Spec quick row */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                <SpecTile Icon={Users} label="Seats" value={String(car.seats)} />
                <SpecTile
                  Icon={Cog}
                  label="Transmission"
                  value={car.transmission}
                />
                <SpecTile Icon={Fuel} label="Fuel" value={car.fuelType} />
              </div>

              {/* Price */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-brand-red tracking-tight">
                    ₱{car.pricePerDay.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400">/ day</span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Final price shown — no hidden fees.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/book?car=${car.slug}`}
                  className="shine-btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/30"
                >
                  <Calendar className="relative z-[2] h-4 w-4" />
                  <span className="relative z-[2]">Reserve This Car</span>
                </Link>
                <Link
                  href="/availability"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:border-brand-red hover:text-brand-red font-bold text-sm transition-all"
                >
                  Check Dates
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4 text-brand-red shrink-0" />
                <span>
                  Booking is held for 30 minutes. Confirmed only after payment is
                  successful.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Description + Features */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
          <div className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-6 lg:p-8">
            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight">
              About this {car.category.toLowerCase()}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {car.description ??
                `The ${car.brand} ${car.name} is a ${car.year} ${car.category.toLowerCase()} with ${car.seats} seats and ${car.transmission.toLowerCase()} transmission. Reliable, well-maintained, and ready for your trip in Lucena and nearby provinces.`}
            </p>

            {/* Specs table */}
            <h3 className="mt-8 text-base font-black text-gray-900 dark:text-white mb-3">
              Specifications
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <SpecRow label="Brand" value={car.brand} />
              <SpecRow label="Model" value={car.name} />
              <SpecRow label="Year" value={String(car.year)} />
              <SpecRow label="Category" value={car.category} />
              <SpecRow label="Seats" value={`${car.seats} passengers`} />
              <SpecRow label="Transmission" value={car.transmission} />
              <SpecRow label="Fuel type" value={car.fuelType} />
              <SpecRow label="Status" value={car.status} />
            </dl>
          </div>

          {/* Features */}
          <div className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-6 lg:p-8 self-start">
            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              What&apos;s included
            </h2>
            <ul className="space-y-2.5">
              {includedFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand-red mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Availability calendar placeholder */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
              <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
                Availability calendar
              </h3>
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Real-time availability and conflict prevention is wired up in Phase 4.
                For now, all dates are tentatively open — final availability is confirmed
                at checkout.
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
                  More like this
                </p>
                <h2 className="mt-1 text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  Other {car.category.toLowerCase()}s
                </h2>
              </div>
              <Link
                href={`/cars?category=${encodeURIComponent(car.category)}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-deep-red"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((c) => (
                <CarListingCard key={c.id} car={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function SpecTile({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 text-center">
      <Icon className="h-4 w-4 text-brand-red mx-auto mb-1.5" />
      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">
        {label}
      </p>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5 border-b border-gray-100 dark:border-white/[.05]">
      <dt className="text-xs uppercase tracking-wider font-bold text-gray-400">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-gray-900 dark:text-white text-right">
        {value}
      </dd>
    </div>
  );
}
