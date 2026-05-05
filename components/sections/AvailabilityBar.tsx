"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Cog, Search } from "lucide-react";

const seatOptions = [
  { value: "5", label: "5+ Seats" },
  { value: "7", label: "7+ Seats" },
  { value: "10", label: "10+ Seats" },
];

const transmissionOptions = [
  { value: "Automatic", label: "Automatic" },
  { value: "Manual", label: "Manual" },
];

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all";

const fieldLabelClass =
  "text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5";

export default function AvailabilityBar() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seats, setSeats] = useState("");
  const [transmission, setTransmission] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickupDate) params.set("pickup", pickupDate);
    if (returnDate) params.set("return", returnDate);
    if (seats) params.set("seats", seats);
    if (transmission) params.set("transmission", transmission);
    /* /availability is the date-aware listing — runs the real conflict /
       grace-day check against the database. /cars stays as the
       attribute-only browse page. */
    router.push(`/availability?${params.toString()}`);
  };

  return (
    <section className="relative -mt-20 lg:-mt-24 z-30 px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/10 shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-brand-red via-deep-red to-brand-red" />

          <div className="p-6 lg:p-8">
            {/* Heading */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg lg:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  Find Your Perfect Ride
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Check real-time availability for your travel dates.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-red uppercase tracking-wider">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                Live Availability
              </span>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4"
            >
              <div>
                <label className={fieldLabelClass}>
                  <Calendar className="h-3 w-3" /> Pick-up Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={fieldLabelClass}>
                  <Calendar className="h-3 w-3" /> Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={fieldLabelClass}>
                  <Users className="h-3 w-3" /> Seats
                </label>
                <select
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any</option>
                  {seatOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={fieldLabelClass}>
                  <Cog className="h-3 w-3" /> Transmission
                </label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any</option>
                  {transmissionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="shine-btn w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/30 h-[42px]"
                >
                  <Search className="relative z-[2] h-4 w-4" />
                  <span className="relative z-[2]">Check Availability</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
