import AboutUs from "@/components/AboutUs";
import { FeaturesSectionDemo } from "@/components/Demo";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import TakeQuiz from "@/components/TakeQuizBanner";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden ">
      <div className="w-full">
        <Hero />
      </div>
      <div className="max-w-7xl w-full sm:px-10 px-5">
        <HowItWorks />
      </div>
      <div className="w-full pr-0 pl-0 ">
        <Services />
        <TakeQuiz />
        <FeaturesSectionDemo />
        <Features />
        <Testimonial/>
        <AboutUs />
      </div>
    </main>
  );
}
