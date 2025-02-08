import React from "react";
import { motion } from "framer-motion";

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

    //   transitionEnd: {
    //   left: "0",
    //     width: "0",
    //   },
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
        {[...Array(numOfCols)].map((_, i) => (
          <motion.div
            key={i}
            variants={columnsExpandVariants}
            initial={"initial"}
            animate={"enter"}
            exit={"exit"}
            custom={numOfCols + i}
            className=" bg-white relative w-full h-full"
          ></motion.div>
        ))}
      </motion.div>
      {children}
    </>
  );
};
export default TransitionPage;
