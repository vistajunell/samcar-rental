import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/dal";

export const metadata = {
  title: "My bookings — SamCar Rental",
};

const statusBadgeStyle: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/40",
  CONFIRMED: "bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/40",
  CANCELLED: "bg-red-500/15 text-red-600 dark:text-red-300 border-red-500/40",
  COMPLETED: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40",
};

const statusIcons = {
  PENDING: Clock,
  CONFIRMED: CheckCircle2,
  CANCELLED: XCircle,
  COMPLETED: CheckCircle2,
} as const;

export default async function BookingsPage() {
  const user = await requireAuth();

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  const active = bookings.filter(
    (b) => b.status === "PENDING" || b.status === "CONFIRMED",
  );
  const past = bookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED",
  );

  return (
    <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#050505] pt-28 pb-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
              Account
            </p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              My Bookings
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Reservations under <strong>{user.email}</strong>
            </p>
          </div>
          <Link
            href="/cars"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-red hover:bg-deep-red text-white text-sm font-bold shadow-lg shadow-brand-red/30"
          >
            <PlusCircle className="h-4 w-4" /> New booking
          </Link>
        </header>

        {bookings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-10">
            {active.length > 0 && (
              <section>
                <h2 className="text-base font-black text-gray-900 dark:text-white tracking-tight mb-4">
                  Active
                </h2>
                <div className="space-y-3">
                  {active.map((b) => (
                    <BookingRow key={b.id} booking={b} />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <h2 className="text-base font-black text-gray-900 dark:text-white tracking-tight mb-4">
                  Past
                </h2>
                <div className="space-y-3">
                  {past.map((b) => (
                    <BookingRow key={b.id} booking={b} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

type BookingWithCar = Awaited<
  ReturnType<typeof prisma.booking.findMany>
>[number] & {
  car: {
    slug: string;
    brand: string;
    name: string;
    year: number;
    image: string;
    transmission: string;
    fuelType: string;
    seats: number;
  };
};

function BookingRow({ booking }: { booking: BookingWithCar }) {
  const Icon = statusIcons[booking.status];
  return (
    <Link
      href={`/bookings/${booking.id}`}
      className="group flex items-center gap-4 rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 hover:border-brand-red/30 transition-colors p-4 lg:p-5"
    >
      <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#0a0a0a]">
        <Image
          src={booking.car.image}
          alt={`${booking.car.brand} ${booking.car.name}`}
          fill
          sizes="112px"
          className="object-contain p-1.5"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${statusBadgeStyle[booking.status]}`}
          >
            <Icon className="h-2.5 w-2.5" />
            {booking.status}
          </span>
          <span className="text-[11px] text-gray-400 font-mono">
            #{booking.id.slice(0, 10)}
          </span>
        </div>
        <p className="mt-1 text-sm sm:text-base font-black text-gray-900 dark:text-white truncate">
          {booking.car.brand} {booking.car.name}
        </p>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-brand-red" />
          {format(booking.startDate, "MMM d")} →{" "}
          {format(booking.endDate, "MMM d, yyyy")}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-base sm:text-lg font-black text-brand-red tabular-nums">
          ₱{booking.totalAmount.toLocaleString()}
        </p>
        <ChevronRight className="ml-auto h-4 w-4 text-gray-400 group-hover:text-brand-red mt-1 transition-colors" />
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111] border border-dashed border-gray-200 dark:border-white/10 px-6 py-16 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-red/10 mb-4">
        <Calendar className="h-7 w-7 text-brand-red" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        No bookings yet
      </h2>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        Browse our fleet and reserve your first car. Bookings appear here once
        they&apos;re created.
      </p>
      <Link
        href="/cars"
        className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-red hover:bg-deep-red text-white text-sm font-bold transition-colors"
      >
        <PlusCircle className="h-4 w-4" /> Browse cars
      </Link>
    </div>
  );
}
