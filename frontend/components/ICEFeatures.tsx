import { useState, useEffect } from "react";

const categories = [
  {
    id: 1,
    name: "Digital Systems Design",
    image: "/ice1.webp",
    description: "Explore the design of digital circuits and systems."
  },
  {
    id: 2,
    name: "Embedded Systems",
    image: "/ice2.jpg",
    description: "Learn about the integration of hardware and software in embedded systems."
  },
  {
    id: 3,
    name: "Control Systems",
    image: "/ice3.webp",
    description: "Dive into the principles of control systems and their applications."
  }
];

const ICESection = () => {
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
        Explore ICE Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative w-full h-[300px] overflow-hidden rounded-2xl shadow-lg transition-all transform hover:scale-105 cursor-pointer"
            tabIndex={0}
            aria-label={`${category.name} category`}
          >
            {/* Background Image with Hover Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 "
              style={{ backgroundImage: `url(${category.image})` }}
            ></div>

            {/* Overlay with Hover Effect */}
            <div className="absolute inset-0 bg-black opacity-30 "></div>

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

export default ICESection;
