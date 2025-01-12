"use client";

export function Services() {
  const services = [
    {
      title: "Career Guidance Workshop",
      price: "Rs.1000",
      image: "/service1.jpg",
    },
    {
      title: "Progress Tracking Session",
      price: "Rs.5000",
      image: "/service2.jpg",
    },
    {
      title: "Stream Selection Consultation",
      price: "Rs.3000",
      image: "/service3.jpg",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold dark:text-white text-[#ede8f5] ">
          Our Services
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Explore the range of services we offer to guide your success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="max-w-xs w-full group/card mx-auto rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative card h-96 flex flex-col justify-end p-4">
              {/* Overlay for hover effect */}
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>

              {/* Dark gradient at the bottom */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-80"></div>

              {/* Text Content */}
              <div className="z-10 relative">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                  {service.title}
                </h1>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
