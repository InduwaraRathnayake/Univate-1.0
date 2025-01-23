"use client";
import React from "react";
import Link from "next/link"; 
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export default function SparklesPreview() {
  return (
    <AuroraBackground>
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="text-4xl md:text-7xl font-bold text-white text-center">
      Calculate Your GPA
      </div>
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4 ">
      Determines your overall academic performance by averaging your grades across all courses.
      </div>
      <Link href="/gpa/calculate-gpa">
        <button
          className="py-3 px-6 text-lg sm:text-xl font-semibold rounded-full border-2 border-white text-white bg-black hover:bg-white hover:text-black transition duration-300 transform hover:scale-105 mt-8"
        >
          Calculate GPA
        </button>
      </Link>
    </motion.div>
  </AuroraBackground>
  );
}
