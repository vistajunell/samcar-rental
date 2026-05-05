import { differenceInCalendarDays } from "date-fns";

/* Constants and pure helpers used by booking server actions and forms.
   Lives outside `"use server"` files because Next.js only allows async
   function exports from server-action modules. */

export const PENDING_BOOKING_TTL_MINUTES = 30;

export function countRentalDays(start: Date, end: Date): number {
  return Math.max(1, differenceInCalendarDays(end, start) + 1);
}

export function computeTotal(pricePerDay: number, days: number): number {
  return Math.round(pricePerDay * days * 100) / 100;
}

export type BookingState =
  | {
      ok: false;
      message?: string;
      errors?: Record<string, string[]>;
      requiresLogin?: boolean;
    }
  | undefined;
