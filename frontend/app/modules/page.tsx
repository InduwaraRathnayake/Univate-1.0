"use client";

import React, { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import Link from "next/link";

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchModules = async (query: string = "") => {
    try {
      setLoading(true);
      const url = query
        ? `http://localhost:8080/api/modules/${encodeURIComponent(query)}`
        : "http://localhost:8080/api/modules";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch modules");
      }
      const data = await response.json();
      setModules(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchModules(searchText); // Fetch modules based on search input
  };

  const handleReturnToModules = () => {
    setSearchText(""); // Clear search text
    fetchModules(); // Fetch all modules
  };

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center px-2 pt-28 pb-[10px]">
        <h2 className="text-4xl text-center font-bold sm:text-5xl text-white pb-6">
          Find Your Modules
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={modules.map((module: any) => module.moduleTitle)}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        {modules.length > 0 && (
          <div className="max-w-7xl my-10 pt-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl text-white text-center"
            >
              All Modules
            </motion.h1>
          </div>
        )}
        {modules.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-white space-y-4">
            <span className="text-6xl mt-10">😞</span>
            <p className="text-xl">Could not find requested module</p>
            <button
              onClick={handleReturnToModules}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-600 transition-all mb-10"
            >
              Return to Modules
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module: any, index: number) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex"
              >
                <Link href={`/modules/${module.id}`} className="flex-grow">
                  <div className="h-full bg-white backdrop-blur-lg rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold text-[#000] mb-2">
                      {module.moduleCode} - {module.moduleTitle}
                    </h2>
                    <p className="text-gray-700">
                      {module.intake} | {module.compulsoryOrElective} |{" "}
                      {module.gpaOrNgpa}
                    </p>
                    <div className="mt-4 w-fit px-3 py-1 bg-gray-600 rounded-full text-sm text-white">
                      Semester {module.semester}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Modules;

