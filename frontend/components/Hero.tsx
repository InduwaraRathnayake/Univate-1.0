"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowDown, FaLongArrowAltRight } from "react-icons/fa";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Hero = () => {
  const [activeLayer, setActiveLayer] = useState(1);

  const smoothScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const layers = [
    {
      id: 1,
      title: "Empowering Your Academic Journey",
      subtitle: "Discover the path that aligns with your aspirations",
      content:
        "Univate 1.0 helps you explore CSE streams, track your GPA, and make informed decisions for a successful career",
      image: "/slider1.jpeg",
    },
    {
      id: 2,
      title: "Your Personalized Guide to Excellence",
      subtitle: "Navigate streams with confidence and clarity",
      content:
        "With Univate 1.0, you can assess your strengths, receive tailored guidance, and stay on top of your academic performance",
      image: "/slider2.jpeg",
    },
    {
      id: 3,
      title: "Build Your Future, One Step at a Time",
      subtitle: "Innovate, achieve, and excel with the right tools",
      content:
        "From stream selection quizzes to a digitalized handbook, Univate 1.0 provides everything you need to achieve your dreams",
      image: "/slider3.jpeg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev < layers.length ? prev + 1 : 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [layers.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {layers.map((layer, index) => (
        <motion.div
          key={layer.id}
          className={`absolute inset-0 w-full min-h-screen flex items-center justify-center
            ${activeLayer === layer.id ? "z-20" : "z-10"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: activeLayer === layer.id ? 1 : 0,
            y: activeLayer === layer.id ? 0 : 50,
          }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative w-full min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${layer.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-start">
              <motion.h1
                key={`title-${layer.id}-${activeLayer}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              >
                <TextGenerateEffect words={layer.title} duration={0.3} />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-200 mb-8"
              >
                {layer.subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-300 mb-12 max-w-2xl"
              >
                {layer.content}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-6 items-center"
              >
                <button
                  onClick={smoothScroll}
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2"
                >
                  Get Started <FaArrowDown />
                </button>
                {index < layers.length - 1 && (
                  <button
                    onClick={() => setActiveLayer(layer.id + 1)}
                    className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors animate-pulse"
                  >
                    Explore More{" "}
                    <FaLongArrowAltRight className="animate-pulse" />
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex gap-3">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeLayer === layer.id
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
