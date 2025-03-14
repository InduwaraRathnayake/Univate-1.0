import React from "react";
import { MdCheckCircle } from "react-icons/md";

const DSEFeatures = () => {
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
  return (
    <section className="bg-white text-black py-12 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 max-w-8xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white text-black p-6 rounded-lg  transition-all duration-300 flex flex-col md:flex-row m-5 border-2 border-gray-400"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full md:w-1/2 h-50 object-cover rounded-lg"
            />
            <div className="md:w-2/3 px-6 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold">{course.title}</h3>
              <p className="text-gray-500 mt-2">{course.description}</p>
              <ul className="mt-3 space-y-2">
                {course.skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <MdCheckCircle className="text-blue-400 mr-2" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DSEFeatures;
