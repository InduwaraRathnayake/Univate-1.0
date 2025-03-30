"use client";
import React from "react";
import Link from "next/link";
import { 
  FaCalculator, 
  FaBookOpen, 
  FaQuestionCircle, 
  FaLayerGroup,
  FaArrowRight
} from "react-icons/fa";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <Link
    href={feature.url}
    className="group relative p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col items-center text-center hover:-translate-y-1"
    aria-label={`Go to ${feature.title}`}
  >
    <div className="w-16 h-16 mb-6 rounded-full bg-gray-50 flex items-center justify-center text-black group-hover:bg-gray-200 transition-colors duration-300">
      {feature.icon}
    </div>
    <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-gray-600 transition-colors">
      {feature.title}
    </h3>
    <p className="text-gray-500 mb-4">{feature.description}</p>
    <div className="flex items-center text-black transition-colors duration-300">
      <span className="mr-2 text-sm font-medium">Learn more</span>
      <FaArrowRight className="w-3 h-3" />
    </div>
    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gray-400 transition-all duration-300 pointer-events-none"></div>
  </Link>
);

const Features = () => {
  const features = [
    {
      icon: <FaCalculator className="w-6 h-6" />,
      title: "GPA Calculator",
      description: "Track and predict your academic performance with precision",
      url: "/gpa",
    },
    {
      icon: <FaBookOpen className="w-6 h-6" />,
      title: "Stream Hub",
      description: "Comprehensive information about all academic streams",
      url: "/stream-information-hub",
    },
    {
      icon: <FaQuestionCircle className="w-6 h-6" />,
      title: "Stream Quiz",
      description: "Get personalized recommendations for your academic path",
      url: "/quiz",
    },
    {
      icon: <FaLayerGroup className="w-6 h-6" />,
      title: "Modules",
      description: "Detailed course information and learning resources",
      url: "/modules",
    },
  ];

  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Academic Success Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional tools designed to optimize your educational experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={`feature-${index}`} feature={feature} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Click on any tool to explore its features
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;