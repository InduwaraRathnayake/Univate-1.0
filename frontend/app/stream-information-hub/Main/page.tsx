"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

const Main = () => {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        baseHue={15}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Main Stream
        </h2>
        <p className="text-white text-sm md:text-2xl  mt-6 text-center">
          The main Stream provides flexibility and breadth, allowing students to
          explore various domains and customize their learning path. It is ideal
          for those looking to develop diverse skills.
        </p>
      </Vortex>
    </div>
  );
};

export default Main;
