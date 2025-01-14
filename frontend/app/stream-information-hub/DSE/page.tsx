"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";
import {
  FaBrain,
  FaDatabase,
  FaChartLine,
  FaSearch,
  FaProjectDiagram,
  FaCogs,
  FaNetworkWired,
  FaChartPie,
  FaCloud,
} from "react-icons/fa";

const DSE = () => {
  
  const careers = [
    {
      icon: <FaChartLine />,
      title: "Predictive Analytics",
      description:
        "Leverage data to forecast trends and make informed decisions.",
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning",
      description: "Develop algorithms to analyze data and automate processes.",
    },
    {
      icon: <FaDatabase />,
      title: "Big Data Management",
      description: "Store, process, and analyze massive datasets efficiently.",
    },
    {
      icon: <FaSearch />,
      title: "Data Analysis",
      description:
        "Extract insights from complex datasets to solve real-world problems.",
    },
    {
      icon: <FaProjectDiagram />,
      title: "Data Visualization",
      description:
        "Create compelling visualizations to communicate findings effectively.",
    },
    {
      icon: <FaCogs />,
      title: "AI Development",
      description:
        "Build AI systems to solve complex challenges and innovate processes.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Data Engineering",
      description:
        "Design and maintain data pipelines for seamless data processing.",
    },
    {
      icon: <FaChartPie />,
      title: "Statistical Modeling",
      description:
        "Apply advanced statistical techniques to uncover hidden patterns in data.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Data Solutions",
      description:
        "Utilize cloud platforms to store, process, and analyze data at scale.",
    },
  ];
  

  return (
    
    <main>
     
      <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Data Science & Engineering
          </h2>
          <p className="text-white text-sm md:text-2xl  mt-6 text-center">
            Data Science is a rapidly growing field focused on extracting
            meaningful insights from data. It integrates statistics, machine
            learning, and data visualization with programming and domain
            knowledge.
          </p>
        </Vortex>
      </div>
    
      <section className="bg-black text-white p-8 min-h-screen">
        <div className="text-center ">
          <h1 className="text-4xl font-bold mt-10 mb-10">
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
      
    </main>
  );
};

export default DSE;
