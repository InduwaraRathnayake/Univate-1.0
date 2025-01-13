"use client";

import React from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import Link from "next/link";
import { modules , placeholders } from "@/lib/data/modules";

const Modules = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted", e);
  };
  return (
    <>
      <div className="h-full flex flex-col justify-center  items-center px-2">
        <h2 className=" text-xl text-center sm:text-5xl text-white my-32">
          Find Your Modules
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <div className="max-w-7xl my-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white text-center"
          >
            All Modules
          </motion.h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/modules/${module.id.toLowerCase()}`}>
                <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                  <h2 className="text-xl font-semibold text-[#3D52E0] mb-2">
                    {module.id} {module.name}
                  </h2>
                  <p className="text-gray-600">{module.description}</p>
                  <div className="mt-4 inline-block px-3 py-1 bg-[#3D52E0]/10 rounded-full text-sm text-[#3D52E0]">
                    Semester {module.semester}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modules;
