"use client";

import { FaArrowRight } from "react-icons/fa";

export function Services() {
  const services = [
    {
      title: "Career Guidance Workshop",
      image: "/service1.jpg",
      description: "Get personalized career mapping with our certified experts",
      highlights: ["1-on-1 sessions", "Career assessment", "Roadmap planning"],
    },
    {
      title: "Progress Tracking",
      image: "/service2.jpg",
      description: "Comprehensive academic performance analysis and improvement plan",
      highlights: ["Semester reviews", "GPA analysis", "Improvement strategies"],
    },
    {
      title: "Stream Selection",
      image: "/service3.jpg",
      description: "Tailored guidance for choosing your ideal academic path",
      highlights: ["Stream comparison", "Skill assessment", "Future prospects"],
    },
  ];

  return (
    <section className=" bg-white py-20" id="services">
      <div className="container mx-auto px-4">
        {/* Header with decorative elements */}
        <div className="text-center mt-5 mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-500 rounded-full"></div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering your academic journey with expert guidance
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-80 cursor-pointer"
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8">
                <div className="flex justify-end">
                  
                </div>
                
                <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 mb-4">
                    {service.description}
                  </p>
                  <ul className="mb-4 space-y-1">
                    {service.highlights.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-200">
                        <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="flex items-center mt-4 py-2 px-6 bg-white text-gray-800 font-medium rounded-full hover:bg-gray-100 transition-colors">
                    Learn More <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}