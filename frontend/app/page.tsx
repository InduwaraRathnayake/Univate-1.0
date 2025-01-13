import AboutUs from "@/components/AboutUs";
import { FeaturesSection } from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto ">
      <div className="w-full">
        <Hero />
      </div>
      <div className="max-w-7xl w-full sm:px-10 px-5">
        <HowItWorks />
        <Services />
        <FeaturesSection />
        <Testimonials />
        <AboutUs />
      </div>
    </main>
  );
}
