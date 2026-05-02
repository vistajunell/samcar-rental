import Link from "next/link";
import { Car, ChevronRight } from "lucide-react";

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-red/10 mb-6">
          <Car className="h-10 w-10 text-brand-red" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Browse Cars</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
          Full car browsing with filters, car details pages, and 360° image previews will be
          available in Phase 3.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all"
          >
            Back to Home
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/availability"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:border-brand-red hover:text-brand-red font-bold text-sm transition-all"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </main>
  );
}
