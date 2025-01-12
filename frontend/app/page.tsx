import AboutUs from "@/components/AboutUs";
import { FeaturesSection } from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto ">
      <div className="max-w-7xl w-full sm:px-10 px-5">
        <Hero />
        <HowItWorks />
        <Services />
        <FeaturesSection />
        <Testimonials />
        <AboutUs />
      </div>
      <div className="w-full">
        {" "}
        <Footer />
      </div>
    </main>
  );
}
