import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import AdminLoginForm from "@/components/auth/AdminLoginForm";

export const metadata = {
  title: "Admin Login — SamCar Rental",
};

export default function AdminLoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gray-950 dark:bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-red/[0.06] via-transparent to-transparent pointer-events-none"
      />

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <div className="relative h-14 w-[150px]">
            <Image
              src="/images/logo/samcar-logo.webp"
              alt="SamCar Rental"
              fill
              priority
              sizes="150px"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="rounded-2xl bg-[#111] border border-white/10 shadow-2xl shadow-black/40 p-7 lg:p-8">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 mb-3">
              <ShieldCheck className="h-6 w-6 text-brand-red" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Admin Access</h1>
            <p className="mt-1.5 text-sm text-gray-400">
              Restricted area · Authorized personnel only
            </p>
          </div>
          <AdminLoginForm />
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          Customer login is{" "}
          <Link href="/login" className="font-semibold text-gray-300 hover:text-brand-red">
            here
          </Link>
        </p>
      </div>
    </main>
  );
}
