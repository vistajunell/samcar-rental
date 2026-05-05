"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addMinutes } from "date-fns";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/dal";
import { isCarAvailable } from "@/lib/queries/availability";
import {
  PENDING_BOOKING_TTL_MINUTES,
  countRentalDays,
  computeTotal,
  type BookingState,
} from "@/lib/booking/pricing";

/* ──────────────────────────────────────────────
   Validation
   ────────────────────────────────────────────── */
const isoDate = z
  .string()
  .min(1, "Required")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD");

const CreateBookingSchema = z
  .object({
    carId: z.string().min(1, "Car is required"),
    startDate: isoDate,
    endDate: isoDate,
    notes: z
      .string()
      .max(500, "Notes must be 500 characters or fewer")
      .optional()
      .transform((v) => (v && v.trim() !== "" ? v.trim() : undefined)),
  })
  .refine((d) => d.endDate >= d.startDate, {
    message: "Return date must be on or after pick-up date",
    path: ["endDate"],
  });

function flatErrors(err: {
  issues: { path: PropertyKey[]; message: string }[];
}): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_";
    (out[key] ||= []).push(issue.message);
  }
  return out;
}

/* Treat a YYYY-MM-DD as a calendar day (UTC midnight) so timezone differences
   don't shift the booking by a day. */
function parseCalendarDay(s: string): Date {
  return new Date(`${s}T00:00:00.000Z`);
}

/* ──────────────────────────────────────────────
   CREATE PENDING BOOKING
   ────────────────────────────────────────────── */
export async function createPendingBookingAction(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      ok: false,
      requiresLogin: true,
      message: "Please sign in to make a booking.",
    };
  }

  const parsed = CreateBookingSchema.safeParse({
    carId: formData.get("carId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    notes: formData.get("notes") ?? undefined,
  });

  if (!parsed.success) {
    return { ok: false, errors: flatErrors(parsed.error) };
  }

  const { carId, startDate, endDate, notes } = parsed.data;
  const start = parseCalendarDay(startDate);
  const end = parseCalendarDay(endDate);

  /* Reject past dates */
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (start < today) {
    return {
      ok: false,
      errors: { startDate: ["Pick-up date must be today or later"] },
    };
  }

  /* Confirm car exists and is rentable */
  const car = await prisma.car.findUnique({
    where: { id: carId },
    select: { id: true, slug: true, pricePerDay: true, status: true },
  });
  if (!car) {
    return { ok: false, message: "We couldn't find that car." };
  }
  if (car.status !== "AVAILABLE") {
    return {
      ok: false,
      message: "This car isn't currently available for booking.",
    };
  }

  /* Authoritative availability check — never trust the client */
  const available = await isCarAvailable(car.id, start, end);
  if (!available) {
    return {
      ok: false,
      message:
        "Sorry, this car is already booked for those dates. Please pick different dates.",
    };
  }

  const days = countRentalDays(start, end);
  const totalAmount = computeTotal(car.pricePerDay, days);

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      carId: car.id,
      startDate: start,
      endDate: end,
      totalAmount,
      status: "PENDING",
      expiresAt: addMinutes(new Date(), PENDING_BOOKING_TTL_MINUTES),
      notes: notes ?? null,
    },
  });

  revalidatePath(`/cars/${car.slug}`);
  revalidatePath("/bookings");
  redirect(`/bookings/${booking.id}`);
}

/* ──────────────────────────────────────────────
   CANCEL BOOKING
   Owner can cancel their own PENDING/CONFIRMED bookings.
   ────────────────────────────────────────────── */
export async function cancelBookingAction(
  bookingId: string,
): Promise<{ ok: boolean; message?: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "Not signed in." };

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, userId: true, status: true, carId: true },
  });
  if (!booking) return { ok: false, message: "Booking not found." };

  /* Customers may cancel only their own bookings; admins can cancel any. */
  if (user.role !== "ADMIN" && booking.userId !== user.id) {
    return { ok: false, message: "You can't cancel this booking." };
  }

  if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
    return { ok: false, message: "This booking is already closed." };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  revalidatePath(`/bookings/${bookingId}`);
  revalidatePath("/bookings");
  return { ok: true };
}
