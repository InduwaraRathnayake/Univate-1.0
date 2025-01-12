import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <HowItWorks />
        <Testimonials />    
      </div>
    </main>
  );
}
