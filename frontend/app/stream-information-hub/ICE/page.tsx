"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

const DSE = () => {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Integrated Computer Engineering
        </h2>
        <p className="text-white text-sm md:text-2xl  mt-6 text-center">
          This stream bridges the gap between hardware and software, preparing
          students to work on embedded systems, IoT devices, and system
          architecture.
        </p>
      </Vortex>
    </div>
  );
};

export default DSE;
