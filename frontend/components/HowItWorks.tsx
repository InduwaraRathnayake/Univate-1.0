import React from "react";
import { AiOutlineApi } from "react-icons/ai";

const HowItWorks = () => {
  return (
    <main
      className="flex flex-col md:flex-row items-center justify-center py-16 px-4  my-12 mx-auto "
      id="about"
    >
      <div className="flex-1 px-0 sm:text-left text-center">
        <h1 className="text-5xl text-white font-bold my-4 mb-10">
          How it works
        </h1>
        <p className="text-gray-400 text-xl my-4">
          Our platform is designed to empower CSE students at the University of
          Moratuwa by providing a seamless and comprehensive solution for
          academic and career planning. From the moment you sign up, you&apos;ll have
          access to a personalized dashboard where you can select your desired
          stream, monitor your academic progress with detailed CGPA and SGPA
          trackers, and explore tailored resources to enhance your skills and
          knowledge.
        </p>
        <p className="text-gray-300 text-xl font-semibold py-3 px-6 rounded-lg inline-flex items-center">
          <AiOutlineApi className="mr-3" />
          Start exploring now!
        </p>
      </div>
      <div className="flex-1 justify-center items-center px-12 ">
        <img
          src="/wallpaper.jpg"
          alt="Smartphone"
          className="shadow-2xl rounded-lg"
        />
      </div>
    </main>
  );
};

export default HowItWorks;
