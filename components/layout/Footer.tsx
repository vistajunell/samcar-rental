import Link from "next/link";
import { Car, Phone, Mail, MapPin } from "lucide-react";

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

const quickLinks = ["Home", "Browse Cars", "How It Works", "Rates", "Availability"];
const companyLinks = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ── Brand ── */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red">
                <Car className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-black tracking-tight">SamCar</span>
                <span className="text-[9px] font-semibold text-brand-red tracking-[0.15em] uppercase">
                  Rental Lucena
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Affordable and reliable car rental in Lucena City, Quezon Province, Philippines.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-red flex items-center justify-center transition-colors"
              >
                <IconFacebook />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-red flex items-center justify-center transition-colors"
              >
                <IconInstagram />
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-brand-red transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-brand-red transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-red mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  Lucena City, Quezon Province, Philippines
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-red shrink-0" />
                <span className="text-sm text-gray-400">+63 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-red shrink-0" />
                <span className="text-sm text-gray-400">samcar.rental@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SamCar Rental Lucena PH. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">Built with Next.js · Phase 1</p>
        </div>
      </div>
    </footer>
  );
}
