import React from "react";
import { MdCheckCircle } from "react-icons/md";

const courses = [
  {
    id: 1,
    title: "Machine Learning",
    description:
      "Build AI-powered predictive models that enable automation and smarter decision-making.",
    imageUrl: "/ml.jpg",
    skills: ["Neural Networks", "Deep Learning", "Scikit-Learn", "NLP"],
  },
  {
    id: 2,
    title: "Data Analytics",
    description:
      "Extract valuable insights from large datasets to enhance business strategies and innovation.",
    imageUrl: "/dataanalytics.jpg",
    skills: ["SQL", "Data Visualization", "Power BI", "Pandas"],
  },
  {
    id: 3,
    title: "Big Data Engineering",
    description:
      "Design robust systems for storing, processing, and managing vast amounts of data efficiently.",
    imageUrl: "/bigdata.jpg",
    skills: ["Hadoop", "Spark", "Kafka", "NoSQL Databases"],
  },
  {
    id: 4,
    title: "AI & Cloud Computing",
    description:
      "Leverage cloud platforms to deploy AI solutions at scale for real-world applications.",
    imageUrl: "/ai.jpg",
    skills: ["AWS", "Google Cloud", "MLOps", "Docker"],
  },
];

const DSEFeatures = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-8xl mx-auto px-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Explore Data Science & Engineering Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative w-full h-[280px] overflow-hidden rounded-2xl shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              tabIndex={0}
              aria-label={`${course.title} course`}
            >
              {/* Background Image with Hover Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${course.imageUrl})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-70 transition-opacity"></div>

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                <h3 className="text-2xl font-bold">{course.title}</h3>
                <p className="text-sm mt-2 opacity-90">{course.description}</p>

                {/* Skills List */}
                <ul className="mt-3 space-y-1">
                  {course.skills.map((skill, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <MdCheckCircle className="text-blue-400 mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DSEFeatures;
