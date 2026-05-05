import "server-only";
import { cache } from "react";
import { addDays } from "date-fns";
import prisma from "@/lib/prisma";
import { getCars, type CarsFilter, type CarUIView } from "@/lib/queries/cars";

/**
 * Days of "grace" automatically blocked AFTER a confirmed booking ends —
 * gives the team a buffer for cleaning, refuelling, and quick maintenance.
 *
 * If a car is rented May 2 → May 5, then May 6 is grace and the next bookable
 * day is May 7.
 */
export const GRACE_DAYS = 1;

export type BlockedRange = {
  start: Date;
  end: Date;
  reason: "CONFIRMED" | "PENDING" | "MAINTENANCE";
};

/**
 * Returns every date range during which the given car is unbookable:
 *   - CONFIRMED bookings (extended by GRACE_DAYS)
 *   - non-expired PENDING bookings (extended by GRACE_DAYS — best-effort hold)
 *   - admin-set BlockedDate entries
 *
 * Endpoints are inclusive.
 */
export const getCarBlockedRanges = cache(
  async (carId: string): Promise<BlockedRange[]> => {
    const now = new Date();

    const [bookings, blocks] = await Promise.all([
      prisma.booking.findMany({
        where: {
          carId,
          OR: [
            { status: "CONFIRMED" },
            { status: "PENDING", expiresAt: { gt: now } },
          ],
        },
        select: { startDate: true, endDate: true, status: true },
      }),
      prisma.blockedDate.findMany({
        where: { carId },
        select: { startDate: true, endDate: true },
      }),
    ]);

    const ranges: BlockedRange[] = [
      ...bookings.map((b) => ({
        start: b.startDate,
        end: addDays(b.endDate, GRACE_DAYS),
        reason: b.status as "CONFIRMED" | "PENDING",
      })),
      ...blocks.map((b) => ({
        start: b.startDate,
        end: b.endDate,
        reason: "MAINTENANCE" as const,
      })),
    ];

    return ranges.sort((a, b) => a.start.getTime() - b.start.getTime());
  },
);

/**
 * Two date ranges overlap iff start1 ≤ end2 AND start2 ≤ end1.
 */
function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart.getTime() <= bEnd.getTime() && bStart.getTime() <= aEnd.getTime();
}

/**
 * Authoritative server-side availability check.
 * NEVER trust the frontend calendar — always re-check here before creating a booking.
 */
export async function isCarAvailable(
  carId: string,
  startDate: Date,
  endDate: Date,
): Promise<boolean> {
  const ranges = await getCarBlockedRanges(carId);
  return !ranges.some((r) => rangesOverlap(startDate, endDate, r.start, r.end));
}

/**
 * Returns all cars matching `filter` that are available across [startDate, endDate].
 * Used by /availability page to show a date-aware listing.
 */
export async function getAvailableCarsInRange(
  startDate: Date,
  endDate: Date,
  filter: CarsFilter = {},
): Promise<CarUIView[]> {
  const cars = await getCars(filter);
  const checks = await Promise.all(
    cars.map(async (car) => ({
      car,
      available: await isCarAvailable(car.id, startDate, endDate),
    })),
  );
  return checks.filter((c) => c.available).map((c) => c.car);
}
