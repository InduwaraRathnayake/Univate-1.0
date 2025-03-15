import { useState, useEffect } from "react";

const categories = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    image: "/main1.jpg",
    description:
      "Learn the foundations of computer science, including sorting algorithms, trees, and graphs.",
  },
  {
    id: 2,
    name: "Software Engineering",
    image: "/main2.jpeg",
    description:
      "Explore the principles and practices of software development, including design patterns and testing.",
  },
  {
    id: 4,
    name: "Database Systems",
    image: "/main3.jpg",
    description:
      "Study relational databases, SQL, and how data is stored, managed, and queried.",
  },
  {
    id: 5,
    name: "Networking",
    image: "/main4.webp",
    description:
      "Dive into computer networking concepts, protocols, and how data communication works in modern systems.",
  },
];

const MainFeatures = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = () => {
      setError("Failed to load categories. Please try again later.");
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[350px] bg-gray-100 rounded-lg">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-10 py-16 bg-white">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Explore CSE Stream Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative w-full h-[250px] overflow-hidden rounded-2xl shadow-xl transition-all transform hover:scale-105 cursor-pointer"
            tabIndex={0}
            aria-label={`${category.name} category`}
          >
            {/* Image Background with Hover Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${category.image})` }}
            ></div>

            {/* Overlay with Hover Effect */}
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-70 transition-opacity"></div>

            {/* Content Box */}
            <div className="absolute bottom-0 left-0 p-6 text-white z-10">
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <p className="text-sm mt-2 opacity-90">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFeatures;
