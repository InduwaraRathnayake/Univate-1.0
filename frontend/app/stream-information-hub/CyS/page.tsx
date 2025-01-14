"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

const CyS = () => {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        baseHue={180}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Cyber Security
        </h2>
        <p className="text-white text-sm md:text-2xl  mt-6 text-center">
          Cyber Security focuses on protecting computer systems and networks from
          security threats. This stream prepares students to safeguard digital
          assets in an increasingly connected world.
        </p>
      </Vortex>
    </div>
  );
};

export default CyS;
