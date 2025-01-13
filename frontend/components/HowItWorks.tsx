import React from "react";
import { AiOutlineApi } from "react-icons/ai";

const HowItWorks = () => {
  return (
    // <section className=" flex flex-col md:flex-row items-center justify-center py-16 px-4 pt-60 mt-10 mb-20 " id="about">
    //   {/* Left Image */}
    //   <div className="flex-1 mb-8 md:mb-0 mr-10">
    //     <img
    //       src="/university.jpg"
    //       alt="How It Works"
    //       className="rounded-lg shadow-lg w-full h-auto"
    //     />
    //   </div>

    //   {/* Right Text */}
    //   <div className="flex-1 text-center md:text-left px-4">
    //     <h2 className="text-4xl font-bold text-[#3D52E0] mb-4">
    //       Navigating Your Future with Our Platform
    //     </h2>
    //     <p className="text-lg text-[#ede8f5] dark:text-[#adbbda] mb-6">
    //       Our platform is designed to empower CSE students at the University of
    //       Moratuwa by providing a seamless and comprehensive solution for
    //       academic and career planning. From the moment you sign up, you'll have
    //       access to a personalized dashboard where you can select your desired
    //       stream, monitor your academic progress with detailed CGPA and SGPA
    //       trackers, and explore tailored resources to enhance your skills and
    //       knowledge.
    //     </p>
    //   </div>
    // </section>
    <main className="flex justify-center items-center my-12 mx-auto">
      <div className="flex-1 justify-center items-center px-12">
        <img
          src="/wallpaper.jpg"
          alt="Smartphone"
          className="rounded-lg shadow-2xl"
        />
      </div>
      <div className="flex-1 text-left px-12">
        <h1 className="text-6xl text-[#7091e6] font-bold my-4">How it works</h1>
        <p className="text-gray-400 text-xl my-4">
          Our platform is designed to empower CSE students at the University of
          Moratuwa by providing a seamless and comprehensive solution for
          academic and career planning. From the moment you sign up, you'll have
          access to a personalized dashboard where you can select your
          desired stream, monitor your academic progress with detailed CGPA
          and SGPA trackers, and explore tailored resources to enhance your
          skills and knowledge.
        </p>
        <p className="text-green-600 text-xl font-semibold py-3 px-6 rounded-lg inline-flex items-center">
  <AiOutlineApi className="mr-3" />
  Start exploring now!
</p>

       
      </div>
    </main>
  );
};

export default HowItWorks;
