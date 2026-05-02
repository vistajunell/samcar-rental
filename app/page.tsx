import HeroSection from "@/components/sections/HeroSection";
import AvailabilityBar from "@/components/sections/AvailabilityBar";
import FeaturedCars from "@/components/sections/FeaturedCars";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AvailabilityBar />
      <FeaturedCars />
      <HowItWorks />
      <WhyChooseUs />
      <ContactSection />
    </main>
  );
}
