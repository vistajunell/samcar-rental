"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Search } from "lucide-react";

const seatOptions = [
  { value: "2", label: "2 Seats" },
  { value: "4", label: "4 Seats" },
  { value: "5", label: "5 Seats" },
  { value: "7", label: "7 Seats" },
  { value: "10+", label: "10+ Seats" },
];

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600";

const labelClass =
  "text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1";

export default function AvailabilitySearch() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seats, setSeats] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickupDate) params.set("pickup", pickupDate);
    if (returnDate) params.set("return", returnDate);
    if (seats) params.set("seats", seats);
    router.push(`/availability?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/10 shadow-2xl p-5">
      <h3 className="text-sm font-black text-gray-900 dark:text-white text-center mb-4 tracking-tight">
        Check Availability
      </h3>
      <form onSubmit={handleSearch} className="flex flex-col gap-3.5">
        {/* Pickup date */}
        <div>
          <label className={labelClass}>
            <Calendar className="h-3 w-3" />
            Pick-up Date
          </label>
          <input
            type="date"
            value={pickupDate}
            min={today}
            onChange={(e) => setPickupDate(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Return date */}
        <div>
          <label className={labelClass}>
            <Calendar className="h-3 w-3" />
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            min={pickupDate || today}
            onChange={(e) => setReturnDate(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Seating capacity */}
        <div>
          <label className={labelClass}>
            <Users className="h-3 w-3" />
            Seating Capacity
          </label>
          <select
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className={inputClass}
          >
            <option value="">Any capacity</option>
            {seatOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-red hover:bg-deep-red active:scale-95 text-white font-bold text-sm transition-all shadow-lg shadow-brand-red/20"
        >
          <Search className="h-4 w-4" />
          Check Availability
        </button>
      </form>
    </div>
  );
}
