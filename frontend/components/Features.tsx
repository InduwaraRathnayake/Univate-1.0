"use client";
import React from "react";
import Link from "next/link";

interface Book {
  image: string;
  title: string;
  url: string; // Add the url property to each book object
}

const FeaturesSlide = ({ book }: { book: Book }) => (
  <div className="w-full px-4 my-4 flex flex-col items-center text-center relative">
    <img
      src={book.image}
      alt={book.title}
      className="mb-4 h-40 object-cover w-full rounded-md" // Added border radius
    />
    <h3 className="text-lg font-semibold text-white">{book.title}</h3>
  </div>
);

const Features = () => {
  const books = [
    {
      image: "gpa.jpg",
      title: 'GPA Calculator',
      url: '/gpa', 
    },
    {
      image: "streams.jpeg",
      title: "Stream Information Hub",
      url: '/stream-information-hub', 
    },
    {
      image: "quiz.jpg",
      title: "Stream Selection Quiz",
      url: '/quiz', 
    },
    {
      image: "modules.jpg",
      title: "Modules",
      url: '/modules',
    },
  ];

  return (
    <div className="container mx-auto px-4 flex justify-center items-center min-h-screen py-28">
      <div className="flex flex-wrap justify-center items-center w-full">
        <div className="w-full md:w-6/12 px-4 text-center md:text-left flex flex-col gap-4 justify-center items-left">
          <h1 className="text-5xl text-white font-bold mb-4">Features</h1>
          <p className="text-2xl text-gray-400 mb-4">
            Discover the Key Features of Our Platform
          </p>
          <p className="mb-4 text-gray-500">
            Explore your path with our interactive quiz, GPA tracker,
            digitalized handbook, and tailored career guidance—all on a
            user-friendly platform designed to simplify your academic journey.
          </p>
        </div>
        <div className="w-full md:w-6/12 flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-items-center">
            {books.map((book, index) => (
              <Link
                key={index}
                href={book.url}
                className="relative w-72 p-4 border-2 border-gray-400 rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FeaturesSlide book={book} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
