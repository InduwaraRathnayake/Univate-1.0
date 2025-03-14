import { useState, useEffect } from "react";

const categories = [
  {
    id: 1,
    name: "Advanced Threat Protection",
    image: "/cs1.jpg"
  },
  {
    id: 2,
    name: "Data Encryption & Privacy",
    image: "/cs2.jpg"
  },
  {
    id: 3,
    name: "Vulnerability Assessment",
    image: "/cs3.jpg"
  },
  {
    id: 4,
    name: "Network Security",
    image: "/cs4.jpg"
  },
  {
    id: 5,
    name: "Identity & Access Management",
    image: "/cs5.avif"
  },
];

type Category = {
  id: number;
  name: string;
  image: string;
  description?: string;
};

const CategoryCard = ({ category, onClick }: { category: Category; onClick: () => void }) => (
  <div
    className="relative min-w-[250px] h-[350px] mx-5 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`${category.name} category`}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100" />
    <img
      src={category.image}
      alt={category.name}
      className="w-full h-full object-cover opacity-100"
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent opacity-90 p-4">
      <p className="text-lg font-semibold text-white">{category.name}</p>
      <p className="text-sm mt-2 text-white">{category.description || 'Explore this category for more information.'}</p>
    </div>
  </div>
);

const CSFeatureSection = () => {
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
    <div className="relative max-w-8xl mx-auto px-10 py-8 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Cyber Security Features</h2>
        <p className="text-lg text-gray-600 mt-2">Explore the latest streams in Cyber Security and strengthen your knowledge in vital security areas</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10 mt-10">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => console.log(`Selected category: ${category.name}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CSFeatureSection;
