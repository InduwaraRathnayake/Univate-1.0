"use client";
import React from "react";
import Link from "next/link"; 
import { SparklesCore } from "@/components/ui/sparkles";

export default function SparklesPreview() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md px-4 sm:px-8">
      <h1 className="md:text-6xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20 mb-0">
        GPA Calculator
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-8 md:space-y-0 md:space-x-8 mt-0">
        
        <div className="w-full md:w-1/4 flex justify-center p-4">
          <img src="/robot.webp" alt="Left Image" className="w-3/4 object-contain" />
        </div>

    
        <div className="w-full md:w-[30rem] h-40 relative flex justify-center items-center">
     
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>

        <div className="w-3/4 md:w-1/4 flex justify-center p-4">
          <img src="/robot2.png" alt="Right Image" className="w-2/4 object-contain" />
        </div>
      </div>

      <Link href="/gpa/calculate-gpa">
        <button
          className="py-3 px-6 text-lg sm:text-xl font-semibold rounded-full border-2 border-white text-white bg-black hover:bg-white hover:text-black transition duration-300 transform hover:scale-105 mt-8"
        >
          Calculate GPA
        </button>
      </Link>
    </div>
  );
}
