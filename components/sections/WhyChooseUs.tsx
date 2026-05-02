import {
  Shield,
  Clock,
  Wrench,
  MapPin,
  CreditCard,
  ThumbsUp,
} from "lucide-react";

const benefits = [
  {
    Icon: Shield,
    title: "Fully Insured Fleet",
    description:
      "All vehicles are covered with comprehensive insurance for your peace of mind on every trip.",
  },
  {
    Icon: Clock,
    title: "24/7 Support",
    description:
      "Our team is available around the clock to assist you before, during, and after your rental.",
  },
  {
    Icon: Wrench,
    title: "Well-Maintained Cars",
    description:
      "Every car is regularly serviced and thoroughly inspected before each booking.",
  },
  {
    Icon: MapPin,
    title: "Local Expertise",
    description:
      "Based in Lucena, we know the best routes, roads, and destinations in the province.",
  },
  {
    Icon: CreditCard,
    title: "Easy Online Payment",
    description:
      "Secure GCash and QR payment coming soon. Book and confirm your rental in minutes.",
  },
  {
    Icon: ThumbsUp,
    title: "Flexible Rental Terms",
    description:
      "Daily, weekly, or custom rental periods to fit your travel schedule and budget.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-[#f7f7f7] dark:bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest">
            Why Us
          </span>
          <h2 className="mt-1.5 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Why Choose SamCar Rental
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            We&apos;re committed to giving you a reliable, affordable, and hassle-free car rental
            experience every single time.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map(({ Icon, title, description }, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/[.05] hover:border-brand-red/25 dark:hover:border-brand-red/20 hover:shadow-lg hover:shadow-brand-red/[.05] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-red/[0.08] dark:bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-red transition-all duration-300">
                <Icon className="h-5 w-5 text-brand-red group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
