"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const fetchModuleDetails = async (moduleId: string) => {
  const response = await fetch(`http://localhost:8080/api/modules/${moduleId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch module details");
  }
  return response.json();
};

export default function ModuleContent({ moduleId }: { moduleId: string }) {
  const [moduleDetails, setModuleDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchModuleDetails(moduleId);
        console.log(data);
        setModuleDetails(data);
      } catch (err) {
        setError("Error fetching module details.");
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [moduleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error || !moduleDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          {error || "Error: Module not found"}
        </p>
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
          className="bg-white backdrop-blur-lg rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-black mb-5 text-center">
            {moduleDetails.moduleCode} - {moduleDetails.moduleTitle}
          </h1>

          <div className="flex gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
  {(moduleDetails.semester || []).map((sem: string | number, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-black rounded-full text-sm text-white"
                >
                  Semester {sem}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
  <div className="bg-gray-200 p-4 rounded-lg text-center">
    <h3 className="text-lg font-semibold text-gray-700">
      {moduleDetails.credits} Credits
    </h3>
  </div>
  <div className="bg-gray-200 p-4 rounded-lg text-center">
    <h3 className="text-lg font-semibold text-gray-700">
      {moduleDetails.compulsoryOrElective}
    </h3>
  </div>
  <div className="bg-gray-200 p-4 rounded-lg text-center">
    <h3 className="text-lg font-semibold text-gray-700">
      {moduleDetails.gpaOrNgpa}
    </h3>
  </div>
</div>


          <div className="prose max-w-none">
          {moduleDetails.prerequisitesOrCorequisites[0] !== "" && (
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-black mb-3">
                    Prerequisites
                  </h2>
                  <ul className="list-disc pl-5 text-gray-700">
                    {(moduleDetails.prerequisitesOrCorequisites).map(
                      (prereq: string, index: number) => (
                        <li key={index}>{prereq}</li>
                      )
                    )}
                  </ul>
                </section>
              )}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-3">
                Learning Outcomes
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                {moduleDetails.learningOutcomes.map(
                  (outcome: string, index: number) => (
                    <li key={index}>{outcome}</li>
                  )
                )}
              </ul>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-3">Syllabus Outline</h2>
            <p className="mb-5">{moduleDetails.syllabusOutline.syllabus_outline_desc}</p>
            <div className="space-y-4">
              <ul className="list-disc pl-5 text-gray-900">
                {moduleDetails.syllabusOutline.content.map(
                  (content: {
                    content: string;
                    topic: string;
                    subtopics: string[];
                  }) => (
                    <li key={content.topic} className="pb-2">
                      <div className="font-small">{content.topic}</div>
                      {content.subtopics &&
                      Array.isArray(content.subtopics) &&
                      content.subtopics.length > 0 &&
                      content.subtopics[0] !== "" ? (
                        <ul className="list-disc pl-5 text-gray-700">
                          {content.subtopics.map((subtopic, index) => (
                            <li key={index}>{subtopic}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-gray-600 italic"></div>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>
          <section>
  <h2 className="text-xl font-semibold text-black mb-3">
    Hours per Week
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="bg-gray-100 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-black">
        {moduleDetails.hoursPerWeek?.lecture || 0}
      </div>
      <div className="text-sm text-gray-600">Lectures</div>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-black">
        {moduleDetails.hoursPerWeek?.lab_tutes || 0}
      </div>
      <div className="text-sm text-gray-600">Lab/Tutes</div>
    </div>
  </div>
</section>


            <section>
  <h2 className="text-xl font-semibold text-black mb-3">
    Evaluation
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="bg-gray-100 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-black">
        {moduleDetails.evaluation?.CA || 0}%
      </div>
      <div className="text-sm text-gray-600">Continuous Assessment</div>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-black">
        {moduleDetails.evaluation?.WE || 0}%
      </div>
      <div className="text-sm text-gray-600">Written Exam</div>
    </div>
  </div>
</section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
