import { Suspense } from "react";
import { Car as CarIcon } from "lucide-react";
import CarFilters, { type Facets } from "@/components/cars/CarFilters";
import CarListingCard from "@/components/cars/CarListingCard";
import { getCars, getCarFacets, type CarsFilter } from "@/lib/queries/cars";

export const metadata = {
  title: "Browse Cars — SamCar Rental Lucena PH",
  description:
    "Browse our full fleet of well-maintained rental cars. Filter by category, seats, transmission, and price.",
};

type SearchParams = {
  q?: string;
  category?: string;
  seats?: string;
  transmission?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

const validCategories = ["Sedan", "SUV", "MPV", "Van"] as const;
const validTransmissions = ["Automatic", "Manual"] as const;
const validSorts = ["price-asc", "price-desc", "newest"] as const;

function parseFilters(sp: SearchParams): CarsFilter {
  const filter: CarsFilter = {};

  if (sp.q && sp.q.trim()) filter.q = sp.q.trim();

  if (sp.category && (validCategories as readonly string[]).includes(sp.category)) {
    filter.category = sp.category as CarsFilter["category"];
  }

  if (
    sp.transmission &&
    (validTransmissions as readonly string[]).includes(sp.transmission)
  ) {
    filter.transmission = sp.transmission as CarsFilter["transmission"];
  }

  if (sp.seats) {
    const n = parseInt(sp.seats, 10);
    if (!Number.isNaN(n) && n > 0) filter.seats = n;
  }

  if (sp.minPrice) {
    const n = parseFloat(sp.minPrice);
    if (!Number.isNaN(n) && n >= 0) filter.minPrice = n;
  }

  if (sp.maxPrice) {
    const n = parseFloat(sp.maxPrice);
    if (!Number.isNaN(n) && n >= 0) filter.maxPrice = n;
  }

  if (sp.sort && (validSorts as readonly string[]).includes(sp.sort)) {
    filter.sort = sp.sort as CarsFilter["sort"];
  }

  return filter;
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const filter = parseFilters(sp);

  const [cars, facets] = await Promise.all([getCars(filter), getCarFacets()]);

  return (
    <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#050505] pt-28 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
            Our Fleet
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Browse Cars
          </h1>
          <p className="mt-3 text-sm lg:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
            Premium, well-maintained rental cars for your travel needs in Lucena and nearby
            areas. Filter by category, seats, transmission, and price.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters */}
          <Suspense fallback={<FiltersSkeleton />}>
            <CarFilters facets={facets as Facets} />
          </Suspense>

          {/* Results */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-bold text-gray-900 dark:text-white">{cars.length}</span>{" "}
                {cars.length === 1 ? "car" : "cars"}
              </p>
            </div>

            {cars.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {cars.map((car) => (
                  <CarListingCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function FiltersSkeleton() {
  return (
    <aside className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-5 lg:p-6 self-start animate-pulse">
      <div className="h-5 w-20 bg-gray-200 dark:bg-white/10 rounded mb-5" />
      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="h-3 w-16 bg-gray-200 dark:bg-white/10 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 dark:bg-white/5 rounded" />
          </div>
        ))}
      </div>
    </aside>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111] border border-dashed border-gray-200 dark:border-white/10 px-6 py-16 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-red/10 mb-4">
        <CarIcon className="h-7 w-7 text-brand-red" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        No cars match your filters
      </h2>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        Try clearing some filters or broadening the price range to see more results.
      </p>
    </div>
  );
}
