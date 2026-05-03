import { Car, Calendar, Wallet, Users } from "lucide-react";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";

export const metadata = {
  title: "Admin Dashboard — SamCar Rental",
};

const tiles = [
  { label: "Cars", href: "/admin/cars", icon: Car, key: "cars" },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar, key: "bookings" },
  { label: "Payments", href: "/admin/payments", icon: Wallet, key: "payments" },
  { label: "Customers", href: "/admin/customers", icon: Users, key: "customers" },
] as const;

export default async function AdminHomePage() {
  const admin = await requireAdmin();

  const [carCount, bookingCount, paymentCount, customerCount] = await Promise.all([
    prisma.car.count(),
    prisma.booking.count(),
    prisma.payment.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
  ]);

  const counts: Record<string, number> = {
    cars: carCount,
    bookings: bookingCount,
    payments: paymentCount,
    customers: customerCount,
  };

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
          Welcome back
        </p>
        <h1 className="mt-1 text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {admin.name}
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Phase 5 will fill in full management for cars, bookings, and payments. For now,
          this dashboard confirms your admin session is working.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <div
            key={tile.key}
            className="rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-5 hover:border-brand-red/30 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center mb-3">
              <tile.icon className="h-5 w-5 text-brand-red" />
            </div>
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
              {tile.label}
            </p>
            <p className="text-3xl font-black text-gray-900 dark:text-white mt-0.5 tabular-nums">
              {counts[tile.key]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          Phase 2 — Foundation Ready
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Auth, database, and API foundation are wired up. Ready for Phase 3 (car browsing)
          and Phase 4 (booking logic).
        </p>
      </div>
    </div>
  );
}
