"use client";
import React, { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";

const categories = [
  { id: 1, name: "Semester 1", icon: FaRocket },
  { id: 2, name: "Semester 2", icon: FaRocket },
  { id: 3, name: "Semester 3", icon: FaRocket },
  { id: 4, name: "Semester 4", icon: FaRocket },
  { id: 5, name: "Semester 5", icon: FaRocket },
  { id: 6, name: "Semester 6", icon: FaRocket },
  { id: 7, name: "Semester 7", icon: FaRocket },
  { id: 8, name: "Semester 8", icon: FaRocket },
];

const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "I-we", "I-ca", "F"];

const gradeToGPA: { [key: string]: number } = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "I-we": 0,
  "I-ca": 0,
  "F": 0,
};

const Page = () => {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [modules, setModules] = useState<
    {
      moduleTitle: string;
      moduleCode: string;
      credits: number;
    }[]
  >([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [moduleGrades, setModuleGrades] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleGradeChange = (module: string, grade: string) => {
    setModuleGrades((prev) => ({ ...prev, [module]: grade }));
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    modules.forEach((module) => {
      if (selectedModules.includes(module.moduleCode)) {
        const grade = moduleGrades[module.moduleCode];
        const gradeValue = gradeToGPA[grade] || 0;
        const credit = module.credits;

        if (gradeValue > 0) {
          weightedSum += gradeValue * credit;
          totalCredits += credit;
        }
      }
    });

    if (totalCredits === 0) return 0;
    return (weightedSum / totalCredits).toFixed(2);
  };

  useEffect(() => {
    if (selectedSemester) {
      const fetchModules = async () => {
        setLoading(true);
        try {
          console.log("Fetching modules for semester", selectedSemester);
          const response = await fetch(
            `${process.env.API_URL}/modules/sem/${selectedSemester}`
          );
          if (!response.ok) throw new Error("Failed to fetch modules");
          const data = await response.json();
          console.log(data);
          setModules(data);
        } catch (error) {
          console.error("Error fetching modules:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchModules();
    }
  }, [selectedSemester]);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: 'url("/wallpaper5.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main className="flex-grow p-4 bg-black/50">
        <div className="container mx-auto px-20 py-8 mt-10">
          {!selectedSemester ? (
            <>
              <h2 className="text-5xl font-bold text-white mt-10 mb-10 text-center">
                Select your Semester
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
                    onClick={() => setSelectedSemester(category.id)}
                  >
                    <button className="w-full h-full p-6 text-left focus:outline-none">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-gray-700 bg-gray-200 rounded-full">
                        <category.icon />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                        {category.name}
                      </h3>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-white text-center mb-8">
                Semester {selectedSemester} - Select Modules
              </h2>
              {loading ? (
                <div className="text-center text-white">Loading modules...</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modules.map((module, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg cursor-pointer ${
                          selectedModules.includes(module.moduleCode)
                            ? "bg-gray-400 text-white"
                            : "bg-white"
                        }`}
                        onClick={() =>
                          setSelectedModules((prev) =>
                            prev.includes(module.moduleCode)
                              ? prev.filter((m) => m !== module.moduleCode)
                              : [...prev, module.moduleCode]
                          )
                        }
                      >
                        <div className="font-bold text-lg">{module.moduleCode}</div>{" "}
                        {/* moduleCode */}
                        <div className="text-base">{module.moduleTitle}</div>{" "}
                        {/* topic as the module title */}
                      </div>
                    ))}
                  </div>

                  {selectedModules.length > 0 && (
                    <>
                      <h3 className="text-2xl font-semibold text-white mt-8">
                        Selected Modules
                      </h3>
                      <table className="w-2/3 max-w-lg mx-auto bg-white mt-4 rounded-lg shadow-md overflow-hidden">
                        <thead>
                          <tr className="bg-black text-white text-center">
                            <th className="p-4">Module</th>
                            <th className="p-4">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedModules.map((module) => (
                            <tr
                              key={module}
                              className="border-b hover:bg-gray-100"
                            >
                              <td className="p-4 text-center">{module}</td>
                              <td className="p-4">
                                <select
                                  value={moduleGrades[module] || ""}
                                  onChange={(e) =>
                                    handleGradeChange(module, e.target.value)
                                  }
                                  className="w-full border px-2 py-1 rounded-md"
                                >
                                  <option value="">Select Grade</option>
                                  {grades.map((grade) => (
                                    <option key={grade} value={grade}>
                                      {grade}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="text-center text-white text-xl mt-8">
                        GPA: {calculateGPA()}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
