import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Hash,
  XCircle,
  AlertCircle,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/dal";
import CancelBookingButton from "@/components/booking/CancelBookingButton";

export const metadata = {
  title: "Booking — SamCar Rental",
};

const statusBadgeStyle: Record<string, string> = {
  PENDING:
    "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/40",
  CONFIRMED:
    "bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/40",
  CANCELLED: "bg-red-500/15 text-red-600 dark:text-red-300 border-red-500/40",
  COMPLETED:
    "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40",
};

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireAuth();

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      car: true,
      payments: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!booking) notFound();

  /* Owner-or-admin only. Customers can't view others' bookings. */
  if (booking.userId !== user.id && user.role !== "ADMIN") {
    redirect("/bookings");
  }

  const days = Math.max(
    1,
    Math.ceil(
      (booking.endDate.getTime() - booking.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1,
  );
  const expired =
    booking.status === "PENDING" &&
    booking.expiresAt !== null &&
    booking.expiresAt < new Date();
  const canCancel =
    (booking.status === "PENDING" || booking.status === "CONFIRMED") && !expired;

  return (
    <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#050505] pt-28 pb-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/bookings"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-brand-red mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> All bookings
        </Link>

        {/* Header */}
        <header className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
              Booking
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight font-mono">
              #{booking.id.slice(0, 10)}
            </h1>
          </div>
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${statusBadgeStyle[booking.status]}`}
          >
            {booking.status === "PENDING" && <Clock className="h-3 w-3" />}
            {booking.status === "CONFIRMED" && (
              <CheckCircle2 className="h-3 w-3" />
            )}
            {booking.status === "CANCELLED" && <XCircle className="h-3 w-3" />}
            {booking.status === "COMPLETED" && (
              <CheckCircle2 className="h-3 w-3" />
            )}
            {booking.status}
          </span>
        </header>

        {/* Status-specific banner */}
        {booking.status === "PENDING" && !expired && booking.expiresAt && (
          <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/5 p-4 mb-6 flex items-start gap-3">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
                Awaiting payment
              </p>
              <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">
                This reservation will expire{" "}
                <strong>
                  {formatDistanceToNow(booking.expiresAt, { addSuffix: true })}
                </strong>
                . Complete payment to confirm.
              </p>
            </div>
          </div>
        )}
        {expired && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700 dark:text-red-300">
                Reservation expired
              </p>
              <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">
                This hold timed out. Start a new booking to reserve the same car
                again.
              </p>
            </div>
          </div>
        )}
        {booking.status === "CONFIRMED" && (
          <div className="rounded-xl border border-green-500/40 bg-green-500/5 p-4 mb-6 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-700 dark:text-green-300">
                Booking confirmed
              </p>
              <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">
                We&apos;ll see you on{" "}
                <strong>{format(booking.startDate, "MMM d, yyyy")}</strong>.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
          {/* Left: car + dates */}
          <div className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-5 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-20 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#0a0a0a]">
                <Image
                  src={booking.car.image}
                  alt={`${booking.car.brand} ${booking.car.name}`}
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-brand-red font-bold uppercase tracking-widest">
                  {booking.car.brand} · {booking.car.year}
                </p>
                <Link
                  href={`/cars/${booking.car.slug}`}
                  className="block text-base sm:text-lg font-black text-gray-900 dark:text-white hover:text-brand-red transition-colors truncate"
                >
                  {booking.car.name}
                </Link>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {booking.car.seats} seats · {booking.car.transmission} ·{" "}
                  {booking.car.fuelType}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <DateBlock
                label="Pick-up"
                date={booking.startDate}
                Icon={Calendar}
              />
              <DateBlock
                label="Return"
                date={booking.endDate}
                Icon={Calendar}
              />
            </div>

            {booking.notes && (
              <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10">
                <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                  Notes
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {booking.notes}
                </p>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10 flex flex-wrap gap-2">
              {booking.status === "PENDING" && !expired && (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-red text-white text-sm font-bold opacity-60 cursor-not-allowed"
                  title="PayMongo integration arrives in Phase 6"
                >
                  <CreditCard className="h-4 w-4" /> Pay Now (Phase 6)
                </button>
              )}
              {canCancel && <CancelBookingButton bookingId={booking.id} />}
            </div>
          </div>

          {/* Right: pricing */}
          <aside className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-5 lg:p-6 self-start">
            <h2 className="text-base font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Pricing
            </h2>
            <dl className="space-y-3 text-sm">
              <Row label="Daily rate" value={`₱${booking.car.pricePerDay.toLocaleString()}`} />
              <Row label="Days" value={String(days)} />
              <Row
                label="Booked on"
                value={format(booking.createdAt, "MMM d, yyyy")}
              />
            </dl>
            <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/10 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                Total
              </span>
              <span className="text-3xl font-black text-brand-red tracking-tight">
                ₱{booking.totalAmount.toLocaleString()}
              </span>
            </div>

            {booking.payments.length > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Payments
                </h3>
                <ul className="space-y-1.5 text-xs">
                  {booking.payments.map((p) => (
                    <li
                      key={p.id}
                      className="flex justify-between text-gray-600 dark:text-gray-400"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Hash className="h-3 w-3" />
                        {p.id.slice(0, 8)}
                      </span>
                      <span className="font-semibold">
                        {p.status} · ₱{p.amount.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function DateBlock({
  label,
  date,
  Icon,
}: {
  label: string;
  date: Date;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3">
      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 inline-flex items-center gap-1">
        <Icon className="h-3 w-3 text-brand-red" />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-black text-gray-900 dark:text-white">
        {format(date, "MMM d, yyyy")}
      </p>
      <p className="text-[11px] text-gray-500 dark:text-gray-400">
        {format(date, "EEEE")}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-xs uppercase tracking-wider font-bold text-gray-400">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </dd>
    </div>
  );
}
