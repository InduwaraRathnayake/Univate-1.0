import StreamCardList from "@/components/StreamCardList";
import React from "react";

const Streams = () => {
  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 ">
      <h1 className="text-5xl font-bold text-white mt-20 text-center mb-10">
        Stream Information Hub
      </h1>
      <div className="justify-center ">
        <p className="text-xl text-white/80 mt-10">
          Discover your passion and align it with your future! Exploring the
          diverse streams in the CSE program empowers you to choose a path that
          resonates with your interests, leverages your strengths, and sets the
          foundation for a fulfilling career in technology.
        </p>
      </div>

      <StreamCardList />
      
    </section>
  );
};

export default Streams;
