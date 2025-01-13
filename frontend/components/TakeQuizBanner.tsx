"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "./ui/button";

const TakeQuiz = () => {
  return (
    <div
      className="min-h-screen flex items-center"
      style={{
        backgroundImage: 'url("/wallpaper2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", 
      }}
    >
      <div className="max-w-lg p-6 bg-white/90 shadow-lg rounded-lg ">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Unsure About Your Path? Let's Decide Together!
        </h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Choosing the right stream can feel overwhelming, but you're not alone!
          Explore your interests, visualize your future, and let us guide you
          toward the perfect path. Take the first step today and uncover where
          your passion truly lies.
        </p>
        <div>
          <Button title="Take the Quiz" icon={<FaArrowRight />} position="right" />
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;
