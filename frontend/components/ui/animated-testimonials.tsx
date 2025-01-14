"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="py-20 bg-gradient-to-r from-white to-slate-300 min-h-screen px-2">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          What Our Users Say
        </h1>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="relative h-[500px] w-full flex items-center justify-center">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 999
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -20, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={450}
                  height={450}
                  draggable={false}
                  className="rounded-2xl object-cover shadow-lg mx-auto"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start space-y-8 text-gray-900">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-4xl text-gray-700 font-bold mb-5">
              {testimonials[active].name}
            </h3>
            <p className="text-lg text-gray-600">
              {testimonials[active].designation}
            </p>

            <motion.p className="text-lg mt-6 text-gray-800 italic">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-8 pt-8">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center group hover:bg-opacity-75 transition-all"
            >
              <IconArrowLeft className="h-6 w-6 text-gray-800 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center group hover:bg-opacity-75 transition-all"
            >
              <IconArrowRight className="h-6 w-6 text-gray-800 group-hover:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
