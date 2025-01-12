"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      title: "GPA Tracker",
      description:
        "Track and manage your project issues with ease using our intuitive interface.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-2 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Stream Information Hub",
      description:
        "The Stream Information Hub in Univate 1.0 offers detailed insights into CSE streams, including curriculum, career opportunities, and key skills, helping students make informed decisions about their academic path.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-4 dark:border-neutral-800",
    },
    {
      title: "Career Guidance",
      description:
        "Provides personalized advice and resources to help students navigate their career paths.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "Quizes",
      description:
        "These personalized quizzes provide valuable insights, guiding students towards the academic path that best fits their skills and aspirations.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-white">
          Packed with thousands of features
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-slate-200 text-center font-normal dark:text-neutral-300">
          Univate 1.0 offers a comprehensive set of features, including stream
          selection quizzes, GPA tracking, career guidance, and access to a
          digitalized CSE handbook, all designed to help students make informed
          decisions and streamline their academic journey.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-[#7091e6] dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  text-left mx-auto",
        "text-slate-300  font-normal dark:text-neutral-300"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
    return (
      <div className="relative flex py-8 px-2 gap-10 h-full">
        <div className="w-full p-5 mx-auto group h-full">
          <div className="flex flex-1 w-full h-full flex-col space-y-4 mt-10">
            <Image
              src="/gpa1.png"
              alt="Image 1"
              width={300}
              height={300}
              className="w-full h-50 object-cover rounded-sm"
            />
            <Image
            src="/gpa1.png"
              alt="Image 2"
              width={300}
              height={300}
              className="w-full h-50 object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    );
  };
  

export const SkeletonThree = () => {
  return (
    <div className="grid grid-cols-2 gap-4 relative mt-20">
      <Image
        src="/career-guidance1.jpg"
        alt="header 1"
        width={300}
        height={300}
        className="h-50 w-50 object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
      />
      <Image
        src="/career-guidance2.jpeg"
        alt="header 2"
        width={300}
        height={300}
        className="h-50 w-50 object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
      />
      <Image
        src="/career-guidance3.jpg"
        alt="header 3"
        width={300}
        height={300}
        className="h-50 w-50 object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
      />
      <Image
        src="/career-guidance4.jpg"
        alt="header 4"
        width={300}
        height={300}
        className="h-50 w-50 object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
      />
    </div>
  );
};

export const SkeletonTwo = () => {
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="grid grid-cols-2 gap-4 w-full">
        <Image
          src="/stream1.jpg"
          alt="Image 1"
          width={300}
          height={300}
          className="w-full h-50 object-cover rounded-sm"
        />
        <Image
          src="/stream1.jpg"
          alt="Image 2"
          width={300}
          height={300}
          className="w-full h-50 object-cover rounded-sm"
        />
        <Image
          src="/stream1.jpg"
          alt="Image 3"
          width={300}
          height={300}
          className="w-full h-50 object-cover rounded-sm"
        />
        <Image
          src="/stream1.jpg"
          alt="Image 4"
          width={300}
          height={300}
          className="w-full h-50 object-cover rounded-sm"
        />
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
      <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
        {/* TODO */}
        <Image
          src="/quiz.png"
          alt="header"
          width={600}
          height={600}
          className=" h-80 w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200 mt-20"
        />
      </div>
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
