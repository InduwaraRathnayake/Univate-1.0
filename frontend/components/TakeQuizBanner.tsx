"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "./ui/button";

const TakeQuiz = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent shadow-lg rounded-lg">
      <div className="flex flex-wrap justify-center gap-6">
        <img
          src="/decide.jpg"
          alt="Featured content image1"
          className="w-1/3 sm:w-1/2 lg:w-45 h-auto object-cover rounded-lg"
        />
      
      </div>
      <h2 className="text-3xl font-bold text-[#ede8f5] mt-10 text-center sm:text-left">
        Unsure About Your Path? Let's Decide Together!
      </h2>
      <p className="text-lg text-[#adbbda] mt-5 mb-6 leading-relaxed text-center sm:text-left">
        Choosing the right stream can feel overwhelming, but you're not alone!
        Explore your interests, visualize your future, and let us guide you
        toward the perfect path. Take the first step today and uncover where
        your passion truly lies.
      </p>

      <div className="text-center sm:text-left">
        <Button title="Take the Quiz" icon={<FaArrowRight />} position="right" />
      </div>
    </div>
  );
};

export default TakeQuiz;
