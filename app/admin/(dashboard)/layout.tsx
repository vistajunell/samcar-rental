import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Car, Calendar, Wallet, Users, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { logoutAction } from "@/app/actions/auth";

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Cars", href: "/admin/cars", icon: Car },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Payments", href: "/admin/payments", icon: Wallet },
  { label: "Customers", href: "/admin/customers", icon: Users },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Server-side guard — redirects to /admin/login if not admin */
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#050505]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 min-h-screen flex-col bg-gray-950 dark:bg-black border-r border-white/10 text-white">
          <div className="px-6 py-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="relative h-10 w-[110px]">
                <Image
                  src="/images/logo/samcar-logo.webp"
                  alt="SamCar Admin"
                  fill
                  sizes="110px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-2 text-[10px] font-bold text-brand-red tracking-[0.25em] uppercase">
              Admin Console
            </p>
          </div>

          <nav className="flex-1 px-3 py-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-white/10">
            <div className="mb-3 px-3 text-xs">
              <p className="text-gray-500 uppercase tracking-wider font-bold mb-1">
                Signed in as
              </p>
              <p className="text-white font-semibold truncate">{admin.name}</p>
              <p className="text-gray-500 truncate">{admin.email}</p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-brand-red hover:bg-white/5 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile top bar */}
          <header className="lg:hidden flex items-center justify-between px-4 h-16 bg-gray-950 dark:bg-black border-b border-white/10 text-white">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="relative h-9 w-[100px]">
                <Image
                  src="/images/logo/samcar-logo.webp"
                  alt="SamCar Admin"
                  fill
                  sizes="100px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-300 hover:text-brand-red border border-white/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </header>

          <main className="p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
