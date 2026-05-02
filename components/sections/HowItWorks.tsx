import { Search, CalendarCheck, Car } from "lucide-react";

const steps = [
  {
    Icon: Search,
    title: "Browse & Choose",
    description:
      "Explore our fleet of well-maintained cars. Filter by seats, transmission, or date to find your perfect ride.",
  },
  {
    Icon: CalendarCheck,
    title: "Pick Your Dates",
    description:
      "Select your pickup and return dates. Our real-time availability calendar prevents double-bookings.",
  },
  {
    Icon: Car,
    title: "Book & Go",
    description:
      "Confirm your booking and pay online. Your car will be ready and waiting. Drive off and enjoy your trip!",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest">
            Simple Process
          </span>
          <h2 className="mt-1.5 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            Renting a car with SamCar is quick and easy. Three steps and you&apos;re on the road.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-brand-red/[0.08] dark:bg-brand-red/10 flex items-center justify-center border border-brand-red/20 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                  <step.Icon className="h-8 w-8 text-brand-red group-hover:text-white transition-colors duration-300" />
                </div>
                {/* Step number badge */}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-red text-white text-[11px] font-black flex items-center justify-center shadow-md shadow-brand-red/30">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
