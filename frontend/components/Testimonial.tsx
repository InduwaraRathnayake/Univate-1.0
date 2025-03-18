"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ayesha Perera",
      text: "This product made stream selection stress-free and helped me excel academically with its GPA tracker and career insights",
      designation: "Final Year Student",
    },
    {
      id: 2,
      name: "Chandima Fernando",
      text: "Provided invaluable guidance for my child, making their academic decisions easier and well-informed.",
      designation: "Data Scientist ",
    },
    {
      id: 3,
      name: "Ravindu Silva",
      text: "The career insights and academic tools on this platform are unmatched. It's like having a personal mentor!",
      designation: "Creative Director",
    },
    {
      id: 4,
      name: "Nimali Gunawardana",
      text: "This platform is a must-have for CSE students. It simplified my journey and opened doors to exciting opportunities.",
      designation: "3rd Year Undergraduat",
    },
    {
      id: 5,
      name: "Dineth Samarasinghe",
      text: "This platform is a game-changer! The stream recommendations and digital CSE handbook saved me so much time.",
      designation: "Software Engineer",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative min-h-screen  text-white overflow-hidden ">
      <div className="absolute inset-0 z-0">
        <img
          src="/background.jpeg"
          alt="Product Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 text-center sm:text-left">
        {/* Left (Text) Section */}
        <div className="w-full lg:w-1/2 lg:mb-0 space-y-6 lg:space-y-10 mb-4">
          <h1 className="text-5xl lg:text-7xl font-bold text-border-black">
            Experience Excellence
          </h1>
          <p className="text-xl lg:text-2xl text-border-black">
            Experience the future of innovation with our cutting-edge technology
          </p>
        </div>

        {/* Right (Testimonial) Section */}
        <div className="w-full lg:w-1/2 max-w-xl">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl text-black">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center">
              What People Are Saying
            </h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="transform transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  <div className="flex">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="w-full flex-shrink-0 px-4 md:px-6">
                        <div className="space-y-4">
                          <p className="italic">&quot;{testimonial.text}&quot;</p>
                          <div>
                            <p className="font-semibold text-gray-800">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.designation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-black p-2 rounded-full transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Previous testimonial"
              >
                <FaArrowLeft className="text-white" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-black p-2 rounded-full transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Next testimonial"
              >
                <FaArrowRight className="text-white" />
              </button>

              {/* Dots / Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      currentSlide === index ? "bg-gray-600" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;