import Link from "next/link";
import Image from "next/image";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Account — SamCar Rental Lucena PH",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-white dark:bg-[#050505]">
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-3xl pointer-events-none"
      />

      <div className="relative w-full max-w-md">
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
              Create Your Account
            </h1>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
              Start booking premium rental cars in Lucena
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
