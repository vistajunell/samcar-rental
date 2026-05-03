"use client";

import { useActionState } from "react";
import Link from "next/link";
import { User, Mail, Phone, Lock, AlertCircle, UserPlus } from "lucide-react";
import { registerAction, type AuthState } from "@/app/actions/auth";

const inputClass =
  "w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all placeholder-gray-400";

const labelClass =
  "text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    registerAction,
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
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Juan Dela Cruz"
            className={inputClass}
            aria-invalid={!!state?.errors?.name}
          />
        </div>
        {state?.errors?.name && (
          <p className="mt-1 text-xs text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={inputClass}
            aria-invalid={!!state?.errors?.email}
          />
        </div>
        {state?.errors?.email && (
          <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="text-gray-400 font-normal lowercase tracking-normal">(optional)</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+63 9XX XXX XXXX"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className={inputClass}
            aria-invalid={!!state?.errors?.password}
          />
        </div>
        {state?.errors?.password && (
          <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          Must include at least one letter and one number.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="shine-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red hover:bg-deep-red text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-red/30 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <UserPlus className="relative z-[2] h-4 w-4" />
        <span className="relative z-[2]">
          {pending ? "Creating account…" : "Create Account"}
        </span>
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-brand-red hover:text-deep-red">
          Sign in
        </Link>
      </p>
    </form>
  );
}
