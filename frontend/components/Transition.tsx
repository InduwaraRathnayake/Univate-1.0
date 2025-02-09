"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TransitionPage = ({ children }: { children: React.ReactNode }) => {
  const numOfCols = 6;

  const columnsExpandVariants = {
    initial: {
      left: 0,
    },
    enter: (index: number) => ({
      left: "100vw",
      transition: {
        duration: 0.5,
        delay: 0.2 * index,
        ease: "easeIn",
      },
    }),
    exit: (index: number) => ({
      width: "100vw",
      transition: {
        duration: 0.5,
        delay: 0.2 * index,
        ease: "easeIn",
      },
    }),
  };

  return (
    <>
      <motion.div className="w-screen h-screen fixed flex flex-col top-0 left-0 pointer-events-none z-20">
        {[...Array(numOfCols)].map((_, i) =>
          i === 2 ? (
            <motion.div
              key={i}
              variants={columnsExpandVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              custom={numOfCols + i}
              className="bg-white relative w-full h-full flex items-center justify-center"
            > 
              {/* center the image */}
              <Image
                src={"./logoFill.svg"}
                alt={"Lodder"}
                width={600}
                height={300}
              />
            </motion.div>
          ) : i === 3 ? (
            <motion.div
              key={i}
              variants={columnsExpandVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              custom={numOfCols + i}
              className="bg-white relative w-full h-full flex items-center justify-center"
            >
              {/* Display a quote */}
              <p className="text-2xl font-semibold text-gray-700 italic text-center">“Empower your academic journey, discover your path, and achieve excellence!”</p>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              variants={columnsExpandVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              custom={numOfCols + i}
              className="bg-white relative w-full h-full"
            />
          )
        )}
      </motion.div>
      {children}
    </>
  );
};

export default TransitionPage;