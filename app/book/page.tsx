import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowLeft, Users, Cog, Fuel } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import { getCarBySlug } from "@/lib/queries/cars";
import { getCarBlockedRanges } from "@/lib/queries/availability";
import { getCurrentUser } from "@/lib/dal";

export const metadata = {
  title: "Reserve a car — SamCar Rental Lucena PH",
};

type SearchParams = {
  car?: string;
  pickup?: string;
  return?: string;
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  if (!sp.car) redirect("/cars");

  const car = await getCarBySlug(sp.car);
  if (!car) redirect("/cars");

  const [blocked, user] = await Promise.all([
    getCarBlockedRanges(car.id),
    getCurrentUser(),
  ]);

  /* Serialize Date → ISO so it crosses the RSC boundary cleanly */
  const blockedRanges = blocked.map((r) => ({
    start: r.start.toISOString(),
    end: r.end.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#050505] pt-28 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/cars/${car.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-brand-red mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {car.brand} {car.name}
        </Link>

        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
            Reserve · Step 1 of 2
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Reserve the {car.brand} {car.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
            Pick your dates — we&apos;ll hold the booking for 30 minutes while you
            complete payment.
          </p>
        </header>

        {/* Car summary strip */}
        <div className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-5 mb-6 flex items-center gap-5">
          <div className="relative w-32 h-20 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#0a0a0a]">
            <Image
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              fill
              sizes="128px"
              className="object-contain p-2"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-brand-red font-bold uppercase tracking-widest">
              {car.brand} · {car.year}
            </p>
            <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white truncate">
              {car.name}
            </h2>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3 text-brand-red" /> {car.seats}
              </span>
              <span className="inline-flex items-center gap-1">
                <Cog className="h-3 w-3 text-brand-red" /> {car.transmission}
              </span>
              <span className="inline-flex items-center gap-1">
                <Fuel className="h-3 w-3 text-brand-red" /> {car.fuelType}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-black text-brand-red tracking-tight">
              ₱{car.pricePerDay.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 ml-1">/ day</span>
          </div>
        </div>

        <BookingForm
          car={car}
          blockedRanges={blockedRanges}
          initialPickup={sp.pickup}
          initialReturn={sp.return}
          isAuthenticated={!!user}
          prefillName={user?.name}
          prefillPhone={user?.phone ?? undefined}
        />
      </div>
    </main>
  );
}
