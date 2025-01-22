"use client";

import React, { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import Link from "next/link";
import Loader from "@/components/ui/lodder";
import { useRouter } from "next/navigation";

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const fetchModules = async (query: string = "") => {
    try {
      setLoading(true);
      const url = query
        ? `http://localhost:8080/api/modules/search/${encodeURIComponent(
            query
          )}`
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
      <div className="h-full flex justify-center items-center min-h-screen flex-col">
        <Loader />
        <p className="text-white text-xl mt-4">
          Loading modules, please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      // <div className="h-full flex justify-center items-center">
      //   <p className="text-red-500 text-xl">Error: {error}</p>
      // </div>
      router.push("/not_found")
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

        {modules.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-white space-y-6 mt-10 mb-10">
            <img
              src="/noresults.png"
              alt="No results found"
              className="w-40 h-40 object-cover mb-4"
            />

            <h2 className="text-3xl font-bold">No Results Found</h2>

            <p className="text-lg text-gray-400 text-center">
              Sorry, we couldn't find any matches for your search. <br />
              Try refining your search or return to view all modules.
            </p>

            <button
              onClick={handleReturnToModules}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-500 transition-all"
            >
              Return to All Modules
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10">
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
                      <div className="flex mt-4">
                        {module.semester.map(
                          (semester: string, index: number) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-gray-600 rounded-full text-sm text-white mr-2"
                            >
                              Semester {semester}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* Return to Modules button after displaying results */}
            {searchText && (
              <button
                onClick={handleReturnToModules}
                className="mt-10 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-500 transition-all"
              >
                Return to All Modules
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Modules;
