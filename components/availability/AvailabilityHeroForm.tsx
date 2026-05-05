"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Cog, Search, Loader2 } from "lucide-react";

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
const labelClass =
  "text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5";

export interface AvailabilityHeroFormProps {
  initialPickup?: string;
  initialReturn?: string;
  initialSeats?: string;
  initialTransmission?: string;
}

export default function AvailabilityHeroForm({
  initialPickup = "",
  initialReturn = "",
  initialSeats = "",
  initialTransmission = "",
}: AvailabilityHeroFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const today = new Date().toISOString().split("T")[0];

  const [pickup, setPickup] = useState(initialPickup);
  const [returnDate, setReturnDate] = useState(initialReturn);
  const [seats, setSeats] = useState(initialSeats);
  const [transmission, setTransmission] = useState(initialTransmission);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (returnDate) params.set("return", returnDate);
    if (seats) params.set("seats", seats);
    if (transmission) params.set("transmission", transmission);
    startTransition(() => {
      router.push(`/availability?${params.toString()}`);
    });
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden"
    >
      <div className="h-1 w-full bg-gradient-to-r from-brand-red via-deep-red to-brand-red" />
      <div className="p-5 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4">
          <div>
            <label className={labelClass}>
              <Calendar className="h-3 w-3" /> Pick-up
            </label>
            <input
              type="date"
              required
              value={pickup}
              min={today}
              onChange={(e) => setPickup(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              <Calendar className="h-3 w-3" /> Return
            </label>
            <input
              type="date"
              required
              value={returnDate}
              min={pickup || today}
              onChange={(e) => setReturnDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              <Users className="h-3 w-3" /> Seats
            </label>
            <select
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className={inputClass}
            >
              <option value="">Any</option>
              {seatOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              <Cog className="h-3 w-3" /> Transmission
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className={inputClass}
            >
              <option value="">Any</option>
              {transmissionOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={pending}
              className="shine-btn w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/30 h-[42px] disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="relative z-[2] h-4 w-4 animate-spin" />
              ) : (
                <Search className="relative z-[2] h-4 w-4" />
              )}
              <span className="relative z-[2]">Search</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
