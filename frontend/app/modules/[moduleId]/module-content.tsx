"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const getModuleDetails = (moduleId: string) => {
  // Fetch module details dynamically or return dummy data
  return {
    id: moduleId,
    name: moduleId === "me-1818" ? "Mechatronics" : "Sample Module",
    description:
      "This module is designed to provide students with comprehensive knowledge and practical skills.",
    semester: 4,
    credits: 4,
    prerequisites: ["Basic Electronics", "Programming Fundamentals"],
    learningOutcomes: [
      "Understand core principles and concepts",
      "Apply theoretical knowledge to practical scenarios",
      "Develop problem-solving skills in the domain",
      "Master industry-standard tools and techniques",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to the Subject",
        content: "Overview of basic concepts and fundamentals",
      },
      {
        week: 2,
        topic: "Core Principles",
        content: "Detailed exploration of key theories and methodologies",
      },
      {
        week: 3,
        topic: "Practical Applications",
        content: "Hands-on exercises and real-world examples",
      },
    ],
    assessment: {
      assignments: 30,
      midterm: 30,
      final: 40,
    },
  };
};

export default function ModuleContent({ moduleId }: { moduleId: string }) {
  const moduleDetails = getModuleDetails(moduleId);

  if (!moduleDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: Module not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/modules"
          className="inline-flex items-center text-white hover:text-gray-200 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Modules
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-[#3D52E0] mb-2">
            {moduleDetails.id.toUpperCase()} {moduleDetails.name}
          </h1>

          <div className="flex gap-4 mb-6">
            <span className="px-3 py-1 bg-[#3D52E0]/10 rounded-full text-sm text-[#3D52E0]">
              Semester {moduleDetails.semester}
            </span>
            <span className="px-3 py-1 bg-[#3D52E0]/10 rounded-full text-sm text-[#3D52E0]">
              {moduleDetails.credits} Credits
            </span>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#3D52E0] mb-3">
                Description
              </h2>
              <p className="text-gray-700">{moduleDetails.description}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#3D52E0] mb-3">
                Prerequisites
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                {moduleDetails.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#3D52E0] mb-3">
                Learning Outcomes
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                {moduleDetails.learningOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#3D52E0] mb-3">
                Weekly Schedule
              </h2>
              <div className="space-y-4">
                {moduleDetails.syllabus.map((week) => (
                  <div key={week.week} className="border-b pb-4">
                    <h3 className="font-medium text-[#3D52E0]">
                      Week {week.week}: {week.topic}
                    </h3>
                    <p className="text-gray-700">{week.content}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3D52E0] mb-3">
                Assessment
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#3D52E0]/5 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#3D52E0]">
                    {moduleDetails.assessment.assignments}%
                  </div>
                  <div className="text-sm text-gray-600">Assignments</div>
                </div>
                <div className="bg-[#3D52E0]/5 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#3D52E0]">
                    {moduleDetails.assessment.midterm}%
                  </div>
                  <div className="text-sm text-gray-600">Midterm</div>
                </div>
                <div className="bg-[#3D52E0]/5 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#3D52E0]">
                    {moduleDetails.assessment.final}%
                  </div>
                  <div className="text-sm text-gray-600">Final</div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
