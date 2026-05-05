"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { cancelBookingAction } from "@/app/actions/booking";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCancel = () => {
    setError(null);
    startTransition(async () => {
      const res = await cancelBookingAction(bookingId);
      if (!res.ok) {
        setError(res.message ?? "Could not cancel booking.");
        return;
      }
      router.refresh();
    });
  };

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/15 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        <X className="h-3.5 w-3.5" /> Cancel reservation
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/5 p-3">
      <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
        Cancel this booking? This can&apos;t be undone.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={pending}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-bold disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
          Yes, cancel
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="px-3 py-2 rounded-md text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
        >
          Keep booking
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
