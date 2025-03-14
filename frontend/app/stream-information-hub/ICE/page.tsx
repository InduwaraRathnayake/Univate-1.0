"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Vortex } from "@/components/ui/vortex";
import { FaRobot } from "react-icons/fa";
import ICESection from "@/components/ICEFeatures";

const ICE = () => {
  interface Data {
    careers: { title: string; description: string }[];
    companies: { name: string; logo_url: string }[]; 
  }

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/streams/3"); // Replace with your backend URL
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
    icon: <FaRobot />, 
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
            Integrated Computer Engineering
          </h2>
          <p className="text-white text-sm md:text-2xl mt-6 text-center">
            This stream bridges the gap between hardware and software, preparing
            students to work on embedded systems, IoT devices, and system
            architecture.
          </p>
        </Vortex>
      </div>

      <ICESection />

      <section className="bg-black text-white p-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mt-5 mb-12">
            Empowering Integrated Computer Engineering Professionals
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
                className="rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
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
    </main>
  );
};

export default ICE;
