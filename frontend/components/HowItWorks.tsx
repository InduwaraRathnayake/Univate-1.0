import React from "react";

const HowItWorks = () => {
  return (
    <section className=" flex flex-col md:flex-row items-center justify-center py-16 px-4 pt-60 mt-10 mb-20 " id="about">
      {/* Left Image */}
      <div className="flex-1 mb-8 md:mb-0 mr-10">
        <img
          src="/university.jpg"
          alt="How It Works"
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>

      {/* Right Text */}
      <div className="flex-1 text-center md:text-left px-4">
        <h2 className="text-4xl font-bold text-[#3D52E0] mb-4">
          Navigating Your Future with Our Platform
        </h2>
        <p className="text-lg text-[#ede8f5] dark:text-[#adbbda] mb-6">
          Our platform is designed to empower CSE students at the University of
          Moratuwa by providing a seamless and comprehensive solution for
          academic and career planning. From the moment you sign up, you'll have
          access to a personalized dashboard where you can select your desired
          stream, monitor your academic progress with detailed CGPA and SGPA
          trackers, and explore tailored resources to enhance your skills and
          knowledge.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
