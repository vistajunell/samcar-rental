import { format } from "date-fns";
import { Calendar, Coins, Hash, Receipt } from "lucide-react";

interface Props {
  pricePerDay: number;
  startDate?: Date | null;
  endDate?: Date | null;
  days: number;
  total: number;
}

export default function BookingSummary({
  pricePerDay,
  startDate,
  endDate,
  days,
  total,
}: Props) {
  const dateLine = (d?: Date | null) =>
    d ? format(d, "EEE, MMM d, yyyy") : "—";

  return (
    <aside className="rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 shadow-sm p-6 lg:p-7 sticky top-24">
      <h3 className="text-base font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
        <Receipt className="h-4 w-4 text-brand-red" />
        Booking Summary
      </h3>

      <div className="mt-5 space-y-3 text-sm">
        <Row Icon={Calendar} label="Pick-up" value={dateLine(startDate)} />
        <Row Icon={Calendar} label="Return" value={dateLine(endDate)} />
        <Row
          Icon={Hash}
          label="Days"
          value={days > 0 ? String(days) : "—"}
        />
        <Row
          Icon={Coins}
          label="Daily rate"
          value={`₱${pricePerDay.toLocaleString()}`}
        />
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/10">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Total
          </span>
          <div>
            <span className="text-3xl font-black text-brand-red tracking-tight">
              ₱{total.toLocaleString()}
            </span>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
          Held as a pending reservation for 30 minutes. Booking is confirmed only after
          payment is successful (Phase 6 — PayMongo).
        </p>
      </div>
    </aside>
  );
}

function Row({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold">
        <Icon className="h-3.5 w-3.5 text-brand-red" />
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">
        {value}
      </span>
    </div>
  );
}
