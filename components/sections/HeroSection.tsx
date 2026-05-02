import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star } from "lucide-react";
import CarShowcaseCard from "@/components/ui/CarShowcaseCard";

const stats = [
  { value: "10+", label: "Cars Available" },
  { value: "500+", label: "Happy Clients" },
  { value: "5★", label: "Rated Service" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* ── Background images ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-section-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />
        <Image
          src="/images/mobile-hero-section-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="md:hidden object-cover object-center"
        />
        {/* Vignette overlay for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent md:from-black/85 md:via-black/40 md:to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-32 lg:pt-36 lg:pb-40 min-h-[100svh] lg:min-h-[760px] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-8 items-center">
          {/* ── LEFT: Intro ── */}
          <div className="text-center lg:text-left text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-red/40 bg-brand-red/10 backdrop-blur-sm text-brand-red text-xs font-semibold mb-6">
              <Star className="h-3 w-3 fill-brand-red" />
              Trusted Car Rental in Lucena, Philippines
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-black leading-[1.05] tracking-tight">
              Rent Your <span className="text-brand-red">Ideal Car</span>
              <br className="hidden sm:block" /> with SamCar Rental
            </h1>

            <p className="mt-5 text-base lg:text-lg text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
              Premium, well-maintained, and ready-to-drive rental cars for your travel needs in
              Lucena and nearby areas.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/cars"
                className="shine-btn group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/30"
              >
                <span className="relative z-[2]">Browse Cars</span>
                <ChevronRight className="relative z-[2] h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/book"
                className="shine-btn group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/30 bg-white/5 backdrop-blur-md text-white hover:border-brand-red hover:text-brand-red font-bold text-sm transition-all"
              >
                <span className="relative z-[2]">Book Now</span>
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-8 justify-center lg:justify-start">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Car carousel (desktop only — mobile uses BG car) ── */}
          <div className="hidden lg:block relative">
            <CarShowcaseCard />
          </div>
        </div>
      </div>
    </section>
  );
}
