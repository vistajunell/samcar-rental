import "server-only";
import { cache } from "react";
import prisma from "@/lib/prisma";

/* ──────────────────────────────────────────────
   UI-friendly view of a Car row.
   The DB stores enums in UPPERCASE; the UI uses
   capitalized labels. We translate at the edge.
   ────────────────────────────────────────────── */
export type CarUIView = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  year: number;
  category: "Sedan" | "SUV" | "MPV" | "Van";
  pricePerDay: number;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuelType: string;
  status: "Available" | "Maintenance" | "Retired";
  image: string;
  tagline: string;
  description: string | null;
};

const categoryLabel = {
  SEDAN: "Sedan",
  SUV: "SUV",
  MPV: "MPV",
  VAN: "Van",
} as const;

const transmissionLabel = {
  AUTOMATIC: "Automatic",
  MANUAL: "Manual",
} as const;

const statusLabel = {
  AVAILABLE: "Available",
  MAINTENANCE: "Maintenance",
  RETIRED: "Retired",
} as const;

type DBCar = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  year: number;
  category: keyof typeof categoryLabel;
  pricePerDay: number;
  seats: number;
  transmission: keyof typeof transmissionLabel;
  fuelType: string;
  status: keyof typeof statusLabel;
  image: string;
  tagline: string | null;
  description: string | null;
};

function toUIView(car: DBCar): CarUIView {
  return {
    id: car.id,
    slug: car.slug,
    brand: car.brand,
    name: car.name,
    year: car.year,
    category: categoryLabel[car.category],
    pricePerDay: car.pricePerDay,
    seats: car.seats,
    transmission: transmissionLabel[car.transmission],
    fuelType: car.fuelType,
    status: statusLabel[car.status],
    image: car.image,
    tagline: car.tagline ?? "",
    description: car.description,
  };
}

/* ──────────────────────────────────────────────
   Filters
   ────────────────────────────────────────────── */
export type CarsFilter = {
  category?: "Sedan" | "SUV" | "MPV" | "Van";
  seats?: number; // exact match
  transmission?: "Automatic" | "Manual";
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  sort?: "price-asc" | "price-desc" | "newest";
};

/* Reverse of the labels — turn UI string into DB enum value */
const dbCategory = {
  Sedan: "SEDAN",
  SUV: "SUV",
  MPV: "MPV",
  Van: "VAN",
} as const;
const dbTransmission = {
  Automatic: "AUTOMATIC",
  Manual: "MANUAL",
} as const;

export const getCars = cache(async (filter: CarsFilter = {}): Promise<CarUIView[]> => {
  const where: Record<string, unknown> = {
    status: "AVAILABLE",
  };

  if (filter.category) where.category = dbCategory[filter.category];
  if (filter.transmission) where.transmission = dbTransmission[filter.transmission];
  /* Seat filter is "at least N" so the AvailabilityBar's "10+" maps cleanly */
  if (typeof filter.seats === "number") where.seats = { gte: filter.seats };

  const priceFilter: Record<string, number> = {};
  if (typeof filter.minPrice === "number") priceFilter.gte = filter.minPrice;
  if (typeof filter.maxPrice === "number") priceFilter.lte = filter.maxPrice;
  if (Object.keys(priceFilter).length) where.pricePerDay = priceFilter;

  if (filter.q && filter.q.trim()) {
    const q = filter.q.trim();
    where.OR = [
      { brand: { contains: q, mode: "insensitive" } },
      { name: { contains: q, mode: "insensitive" } },
    ];
  }

  const orderBy =
    filter.sort === "price-asc"
      ? { pricePerDay: "asc" as const }
      : filter.sort === "price-desc"
        ? { pricePerDay: "desc" as const }
        : filter.sort === "newest"
          ? { year: "desc" as const }
          : { brand: "asc" as const };

  const cars = await prisma.car.findMany({ where, orderBy });
  return cars.map((c) => toUIView(c as DBCar));
});

/** Cars to spotlight on the home page — first N available. */
export const getFeaturedCars = cache(async (limit = 6): Promise<CarUIView[]> => {
  const cars = await prisma.car.findMany({
    where: { status: "AVAILABLE" },
    orderBy: { brand: "asc" },
    take: limit,
  });
  return cars.map((c) => toUIView(c as DBCar));
});

/** All available cars for the hero carousel. */
export const getCarsForCarousel = cache(async (): Promise<CarUIView[]> => {
  const cars = await prisma.car.findMany({
    where: { status: "AVAILABLE" },
    orderBy: { brand: "asc" },
  });
  return cars.map((c) => toUIView(c as DBCar));
});

/** Single car by slug. Returns null if not found. */
export const getCarBySlug = cache(async (slug: string): Promise<CarUIView | null> => {
  const car = await prisma.car.findUnique({ where: { slug } });
  return car ? toUIView(car as DBCar) : null;
});

/** Cars in the same category, excluding the one passed in. */
export const getRelatedCars = cache(
  async (
    category: CarUIView["category"],
    excludeSlug: string,
    limit = 3,
  ): Promise<CarUIView[]> => {
    const cars = await prisma.car.findMany({
      where: {
        status: "AVAILABLE",
        category: dbCategory[category],
        slug: { not: excludeSlug },
      },
      take: limit,
      orderBy: { brand: "asc" },
    });
    return cars.map((c) => toUIView(c as DBCar));
  },
);

/** Distinct facets for filter UI — derived from current available cars. */
export const getCarFacets = cache(async () => {
  const cars = await prisma.car.findMany({
    where: { status: "AVAILABLE" },
    select: { category: true, seats: true, transmission: true, pricePerDay: true },
  });

  const categories = new Set<CarUIView["category"]>();
  const seats = new Set<number>();
  const transmissions = new Set<CarUIView["transmission"]>();
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  for (const c of cars) {
    categories.add(categoryLabel[c.category as keyof typeof categoryLabel]);
    seats.add(c.seats);
    transmissions.add(transmissionLabel[c.transmission as keyof typeof transmissionLabel]);
    if (c.pricePerDay < minPrice) minPrice = c.pricePerDay;
    if (c.pricePerDay > maxPrice) maxPrice = c.pricePerDay;
  }

  return {
    categories: Array.from(categories).sort(),
    seats: Array.from(seats).sort((a, b) => a - b),
    transmissions: Array.from(transmissions).sort(),
    priceRange: {
      min: Number.isFinite(minPrice) ? minPrice : 0,
      max: Number.isFinite(maxPrice) ? maxPrice : 10000,
    },
  };
});
