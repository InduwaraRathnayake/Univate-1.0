"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const ref = React.useRef(null);

  // Row indices
  const [firstRowIndex, setFirstRowIndex] = React.useState(0);
  const [secondRowIndex, setSecondRowIndex] = React.useState(0);
  const [thirdRowIndex, setThirdRowIndex] = React.useState(0);

  // Sliced products
  const firstRowProducts = products.slice(0, 5);
  const secondRowProducts = products.slice(6, 10);
  const thirdRowProducts = products.slice(11, 15);

  // Next Handlers
  const handleNextFirstRow = () => {
    setFirstRowIndex((prevIndex) => (prevIndex + 1) % firstRowProducts.length);
  };
  const handleNextSecondRow = () => {
    setSecondRowIndex((prevIndex) => (prevIndex - 1) % secondRowProducts.length);
  };
  const handleNextThirdRow = () => {
    setThirdRowIndex((prevIndex) => (prevIndex + 1) % thirdRowProducts.length);
  };

  // Rotating rows
  const firstRow = firstRowProducts
    .slice(firstRowIndex)
    .concat(firstRowProducts.slice(0, firstRowIndex));

  const secondRow = secondRowProducts
    .slice(secondRowIndex)
    .concat(secondRowProducts.slice(0, secondRowIndex));

  const thirdRow = thirdRowProducts
    .slice(thirdRowIndex)
    .concat(thirdRowProducts.slice(0, thirdRowIndex));

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const headerTranslateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, -100]),
    springConfig
  );
  const headerPosition = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["relative", "fixed"]
  );
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="pt-40 pb-[500px] overflow-hidden mb-10 antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Header Parallax */}
      <motion.div
        style={{
          translateY: headerTranslateY,
          position: headerPosition,
        }}
        className="left-4 z-10"
      >
        <Header />
      </motion.div>

      {/* Parallax Content */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        {/* First Row */}
        <div className="relative mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={firstRowIndex}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-row space-x-20">
                {firstRow.map((product, idx) => (
                  <ProductCard product={product} translate={translateXReverse} key={idx} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <Button
            title="Next"
            handleClick={handleNextFirstRow}
            otherClasses="absolute bottom-4 right-4 py-2 px-4 transition-all"
          />
        </div>

        {/* Second Row */}
        <div className="relative mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={secondRowIndex}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-row space-x-20">
                {secondRow.map((product, idx) => (
                  <ProductCard product={product} translate={translateX} key={idx} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <Button
            title="Next"
            handleClick={handleNextSecondRow}
            otherClasses="absolute bottom-4 right-4 py-2 px-4 transition-all"
          />
        </div>

        {/* Third Row */}
        <div className="relative mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={thirdRowIndex}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-row space-x-20">
                {thirdRow.map((product, idx) => (
                  <ProductCard product={product} translate={translateXReverse} key={idx} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <Button
            title="Next"
            handleClick={handleNextThirdRow}
            otherClasses="absolute bottom-4 right-4 py-2 px-4 transition-all"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white">
        Career Guidance for CSE Students
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200">
        Unlock your potential with our career guidance platform. Explore
        specialized streams, gain valuable insights, and take the first step
        toward a successful future in Computer Science and Engineering.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-72 w-[30rem] relative flex-shrink-0 pt-96"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
        target="_blank"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};