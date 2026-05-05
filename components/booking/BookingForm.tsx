"use client";

import { useActionState, useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { differenceInCalendarDays } from "date-fns";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Loader2,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { createPendingBookingAction } from "@/app/actions/booking";
import type { BookingState } from "@/lib/booking/pricing";
import BookingSummary from "@/components/booking/BookingSummary";
import type { CarUIView } from "@/lib/queries/cars";

export interface BookingFormProps {
  car: CarUIView;
  blockedRanges: { start: string; end: string }[]; // ISO from server
  initialPickup?: string;
  initialReturn?: string;
  isAuthenticated: boolean;
  prefillName?: string;
  prefillPhone?: string;
}

function ymd(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseYmd(s?: string): Date | undefined {
  if (!s) return undefined;
  const d = new Date(`${s}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function BookingForm({
  car,
  blockedRanges,
  initialPickup,
  initialReturn,
  isAuthenticated,
  prefillName,
  prefillPhone,
}: BookingFormProps) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(
    createPendingBookingAction,
    undefined,
  );

  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = parseYmd(initialPickup);
    const to = parseYmd(initialReturn);
    if (!from && !to) return undefined;
    return { from, to } as DateRange;
  });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const disabledMatchers = useMemo(
    () => [
      { before: today },
      ...blockedRanges.map((r) => ({
        from: new Date(r.start),
        to: new Date(r.end),
      })),
    ],
    [blockedRanges, today],
  );

  const days =
    range?.from && range?.to
      ? Math.max(1, differenceInCalendarDays(range.to, range.from) + 1)
      : 0;
  const total = days * car.pricePerDay;

  const canSubmit = isAuthenticated && !!range?.from && !!range?.to && !pending;

  return (
    <form action={formAction} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      {/* Hidden — never trust the client, but we still need to submit ids/dates */}
      <input type="hidden" name="carId" value={car.id} />
      <input
        type="hidden"
        name="startDate"
        value={range?.from ? ymd(range.from) : ""}
      />
      <input
        type="hidden"
        name="endDate"
        value={range?.to ? ymd(range.to) : ""}
      />

      <div className="space-y-6">
        {/* ── Errors / login required ── */}
        {state?.requiresLogin && (
          <div className="rounded-xl border border-brand-red/40 bg-brand-red/5 p-4 flex items-start gap-3">
            <LogIn className="h-5 w-5 text-brand-red mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-brand-red">
                Sign in required
              </p>
              <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">
                You need an account to reserve a car.{" "}
                <Link
                  href={`/login?next=/book?car=${car.slug}`}
                  className="font-bold underline"
                >
                  Sign in
                </Link>
                {" or "}
                <Link
                  href="/register"
                  className="font-bold underline"
                >
                  register
                </Link>
                .
              </p>
            </div>
          </div>
        )}

        {state && !state.requiresLogin && state.message && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-4 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-300">{state.message}</p>
          </div>
        )}

        {/* ── Calendar ── */}
        <div className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="h-4 w-4 text-brand-red" />
            <h2 className="text-base font-black text-gray-900 dark:text-white tracking-tight">
              Select your dates
            </h2>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Greyed-out dates are already booked or held. A 1-day grace period is
            automatically reserved after each rental.
          </p>

          <div className="overflow-x-auto -mx-2 px-2 booking-day-picker">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
              disabled={disabledMatchers}
              showOutsideDays
              weekStartsOn={1}
            />
          </div>
          {state?.errors?.startDate && (
            <p className="mt-2 text-xs text-red-500">
              {state.errors.startDate[0]}
            </p>
          )}
          {state?.errors?.endDate && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.endDate[0]}
            </p>
          )}
        </div>

        {/* ── Customer info ── */}
        <div className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-5 lg:p-6">
          <h2 className="text-base font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Renter information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                Full name
              </label>
              <input
                type="text"
                defaultValue={prefillName ?? ""}
                disabled
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm cursor-not-allowed opacity-80"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                defaultValue={prefillPhone ?? ""}
                disabled
                placeholder={prefillPhone ? undefined : "Update from /account"}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm cursor-not-allowed opacity-80"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="notes"
              className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5"
            >
              Notes <span className="lowercase tracking-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              maxLength={500}
              rows={3}
              placeholder="Pickup time, special requests, etc."
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
            />
            {state?.errors?.notes && (
              <p className="mt-1 text-xs text-red-500">{state.errors.notes[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Sidebar summary ── */}
      <div>
        <BookingSummary
          pricePerDay={car.pricePerDay}
          startDate={range?.from ?? null}
          endDate={range?.to ?? null}
          days={days}
          total={total}
        />

        <button
          type="submit"
          disabled={!canSubmit}
          className="shine-btn mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? (
            <>
              <Loader2 className="relative z-[2] h-4 w-4 animate-spin" />
              <span className="relative z-[2]">Reserving…</span>
            </>
          ) : (
            <span className="relative z-[2]">
              {range?.from && range?.to
                ? `Reserve for ₱${total.toLocaleString()}`
                : "Pick dates to continue"}
            </span>
          )}
        </button>

        <p className="mt-3 text-[11px] text-gray-400 text-center leading-relaxed">
          Held for 30 minutes. No charge until payment is completed.
        </p>
      </div>
    </form>
  );
}
