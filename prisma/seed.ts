/**
 * Seed: admin user + sync the 10 featured cars from lib/data/cars.ts.
 * Idempotent — safe to run multiple times.
 *
 * Run: `npm run db:seed`
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { featuredCars } from "../lib/data/cars";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const categoryMap = {
  Sedan: "SEDAN",
  SUV: "SUV",
  MPV: "MPV",
  Van: "VAN",
} as const;

const transmissionMap = {
  Automatic: "AUTOMATIC",
  Manual: "MANUAL",
} as const;

/* lib/data/cars uses "Booked" as a UI state derived from active bookings.
   In the DB schema, CarStatus only has AVAILABLE / MAINTENANCE / RETIRED. */
const statusMap = {
  Available: "AVAILABLE",
  Booked: "AVAILABLE",
  Maintenance: "MAINTENANCE",
} as const;

async function main() {
  /* ── Admin user ───────────────────────────────────────── */
  const email = process.env.ADMIN_EMAIL ?? "admin@samcar.ph";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const name = process.env.ADMIN_NAME ?? "SamCar Admin";

  const admin = await prisma.user.upsert({
    where: { email },
    update: {}, // don't reset password if user already exists
    create: {
      email,
      name,
      role: "ADMIN",
      password: await bcrypt.hash(password, 10),
    },
  });
  console.log(`✅ Admin: ${admin.email}`);

  /* ── Cars ─────────────────────────────────────────────── */
  for (const car of featuredCars) {
    await prisma.car.upsert({
      where: { slug: car.id },
      update: {
        brand: car.brand,
        name: car.name,
        year: car.year,
        category: categoryMap[car.category],
        pricePerDay: car.pricePerDay,
        seats: car.seats,
        transmission: transmissionMap[car.transmission],
        fuelType: car.fuelType,
        status: statusMap[car.status],
        image: car.image,
        tagline: car.tagline,
      },
      create: {
        slug: car.id,
        brand: car.brand,
        name: car.name,
        year: car.year,
        category: categoryMap[car.category],
        pricePerDay: car.pricePerDay,
        seats: car.seats,
        transmission: transmissionMap[car.transmission],
        fuelType: car.fuelType,
        status: statusMap[car.status],
        image: car.image,
        tagline: car.tagline,
      },
    });
  }
  console.log(`✅ Cars synced: ${featuredCars.length}`);
  console.log("\nDone. Sign in at /admin/login with:");
  console.log(`   Email:    ${email}`);
  console.log(`   Password: ${password}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
