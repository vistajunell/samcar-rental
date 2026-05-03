"use client";

import { useActionState } from "react";
import { Mail, Lock, AlertCircle, ShieldCheck } from "lucide-react";
import { adminLoginAction, type AuthState } from "@/app/actions/auth";

const inputClass =
  "w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all placeholder-gray-400";

const labelClass =
  "text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block";

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    adminLoginAction,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state?.message && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div>
        <label htmlFor="admin-email" className={labelClass}>
          Admin Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@samcar.ph"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="admin-password" className={labelClass}>
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="shine-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/30 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <ShieldCheck className="relative z-[2] h-4 w-4" />
        <span className="relative z-[2]">
          {pending ? "Verifying…" : "Sign In to Admin"}
        </span>
      </button>
    </form>
  );
}
