import React from 'react';

const HowItWorks = () => {
  return (
    <section className=" flex flex-col md:flex-row items-center justify-center py-16 px-4 pt-60 mt-10 ">
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
        <h2 className="text-3xl font-semibold text-[#3d52a0] mb-4">Navigating Your Future with Our Platform</h2>
        <p className="text-lg text-[#ede8f5] dark:text-[#adbbda] mb-6">
          Our platform simplifies the process for CSE students at the University of Moratuwa. Sign up, select your stream, track your progress, and utilize our career guidance resources for a successful academic journey.
        </p>
        
      </div>
    </section>
  );
};

export default HowItWorks;
