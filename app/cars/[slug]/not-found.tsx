import Link from "next/link";
import { Car as CarIcon, ArrowLeft } from "lucide-react";

export default function CarNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#f7f7f7] dark:bg-[#050505]">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 mb-5">
          <CarIcon className="h-8 w-8 text-brand-red" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Car not found
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We couldn&apos;t find that car in our fleet. It may have been removed or the link
          may be incorrect.
        </p>
        <Link
          href="/cars"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all cars
        </Link>
      </div>
    </main>
  );
}
