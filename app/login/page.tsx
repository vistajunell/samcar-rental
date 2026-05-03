import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In — SamCar Rental Lucena PH",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-white dark:bg-[#050505]">
      {/* Subtle red glow accent */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-3xl pointer-events-none"
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-6">
          <div className="relative h-14 w-[150px]">
            <Image
              src="/images/logo/samcar-logo.webp"
              alt="SamCar Rental"
              fill
              priority
              sizes="150px"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/10 shadow-2xl p-7 lg:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
              Sign in to manage your rentals
            </p>
          </div>
          <LoginForm />
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Are you an administrator?{" "}
          <Link href="/admin/login" className="font-semibold hover:text-brand-red">
            Admin login
          </Link>
        </p>
      </div>
    </main>
  );
}
