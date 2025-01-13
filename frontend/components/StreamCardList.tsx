import React from "react";
import Button from "./ui/button";
import Link from "next/link";

const StreamCardList = () => {

  const cardData = [
    {
      id: 1,
      title: "Data Science",
      description:
        "Transform raw data into actionable insights and drive the future of decision-making.",
      image: "/datascience.jpg",
      path: "/stream-information-hub/DSE",
    },
    {
      id: 2,
      title: "Cyber Security",
      description:
        "Shield the digital world by mastering the art of ethical hacking and cyber defense.",
      image: "cybersecurity.jpg",
      path: "/stream-information-hub/CyS",
    },
    {
      id: 3,
      title: "Integrated Computing",
      description:
        "Merge hardware and software to create innovative solutions.",
      image: "ice.jpg",
      path: "/stream-information-hub/ICE",
    },
    {
        id: 4,
        title: "Main",
        description:
          "Your Gateway to Endless Possibilities and Boundless Innovation.",
        image: "cse.jpg",
        path: "/stream-information-hub/Main",
      },
  ];

  return (
    <div className="min-h-screen p-4 mt-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {card.title}
                </h2>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <div className="flex justify-between items-center">
                <Link href={card.path}> {/* Wrap button in Link component */}
                    <Button title="Discover More" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreamCardList;
