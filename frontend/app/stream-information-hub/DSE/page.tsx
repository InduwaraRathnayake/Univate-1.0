"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Vortex } from "@/components/ui/vortex";
import { FaDatabase } from "react-icons/fa";
import DSEFeatures from "@/components/DSEFeatures";
import TabsComponent from "@/components/StreamTable";

const DSE = () => {
  interface Data {
    careers: { title: string; description: string }[];
    companies: { name: string; logo_url: string }[];
  }

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/streams/1`); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const careers = data.careers.map((career) => ({
    icon: <FaDatabase />,
    title: career.title,
    description: career.description,
  }));

  const companies = data.companies;

  return (
    <main>
      <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Data Science & Engineering
          </h2>
          <p className="text-white text-sm md:text-2xl mt-6 text-center">
            Data Science is a rapidly growing field focused on extracting
            meaningful insights from data. It integrates statistics, machine
            learning, and data visualization with programming and domain
            knowledge.
          </p>
        </Vortex>
      </div>

      <DSEFeatures />

      <section className="bg-black text-white p-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mt-5 mb-12">
            Empowering Data Science Professionals
          </h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="text-[gray] text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 bg-white overflow-hidden ">
        <h2 className="text-4xl font-bold text-black mb-10 text-center">
          Companies
        </h2>
        <div className="relative flex items-center mt-10 mb-10">
          <div
            className="flex gap-4 animate-scroll"
            style={{
              animation: "scroll 20s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 border-2 border-gray-200"
                role="button"
                aria-label={`Shop ${company.name}`}
                style={{ minWidth: "200px" }}
              >
                <img
                  src={company.logo_url}
                  alt={`Logo of ${company.name}`}
                  className="w-32 h-32 object-contain"
                />
              </div>
            ))}
          </div>
        </div>       
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      <section className="p-8 bg-black overflow-hidden min-h-screen">
        <h2 className="text-4xl font-bold text-white mt-10 mb-10 text-center">
          Curriculum Structure & Credits Breakdown
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8">
          The following table outlines the modules for each semester in the Data
          Science & Engineering program. Each module is accompanied by its
          respective module code, title, and the number of credits. The total
          credits for each semester are calculated based on the sum of the
          credits for all modules.
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
          <TabsComponent streamName={1} />
          </div>
        </div>
      </section>

    </main>
  );
};

export default DSE;
