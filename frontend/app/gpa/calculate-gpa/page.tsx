"use client";
import React, { useState } from "react";
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

const modulesBySemester: { [key: number]: string[] } = {
  1: [
    "CE1023 : Fluid Mechanics",
    "CS1033 : Programming Fundamentals",
    "EE1040 : Electrical Fundamentals",
  ],
  2: [
    "MA1020 : Mathematics 2",
    "PH1020 : Physics 2",
    "CS1050 : Data Structures",
  ],
  3: [
    "MA2010 : Mathematics 3",
    "EE1010 : Electronics 1",
    "CS2010 : Algorithms",
  ],};

const grades = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "I-we",
  "I-ca",
  "F",
];

const gradeToGPA: { [key: string]: number } = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  F: 0.0,
};

const Page = () => {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [moduleGrades, setModuleGrades] = useState<{ [key: string]: string }>(
    {}
  );

  const handleGradeChange = (module: string, grade: string) => {
    setModuleGrades((prev) => ({ ...prev, [module]: grade }));
  };

  const calculateGPA = () => {
    const gradeValues = Object.values(moduleGrades)
      .map((grade) => gradeToGPA[grade] || 0)
      .filter((value) => value > 0);

    if (!gradeValues.length) return 0;

    const totalGPA = gradeValues.reduce((sum, value) => sum + value, 0);
    return (totalGPA / gradeValues.length).toFixed(2);
  };

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
              <input
                type="text"
                placeholder="Search modules..."
                className="w-2/3 max-w-lg mb-6 p-3 rounded-lg shadow-md mx-auto"
                onChange={(e) => {
                  const term = e.target.value.toLowerCase();
                  setSelectedModules(
                    modulesBySemester[selectedSemester]?.filter((module) =>
                      module.toLowerCase().includes(term)
                    ) || []
                  );
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {modulesBySemester[selectedSemester]?.map((module) => (
                  <div
                    key={module}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedModules.includes(module)
                        ? "bg-gray-400 text-white"
                        : "bg-white"
                    }`}
                    onClick={() =>
                      setSelectedModules((prev) =>
                        prev.includes(module)
                          ? prev.filter((m) => m !== module)
                          : [...prev, module]
                      )
                    }
                  >
                    {module}
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
                        <th className="p-4 ">Module</th>
                        <th className="p-4">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedModules.map((module) => (
                        <tr
                          key={module}
                          className="text-center border-b-2 border-gray-300"
                        >
                          <td className="p-4 ">{module}</td>
                          <td className="p-4">
                            <select
                              className="p-2 border rounded-lg"
                              value={moduleGrades[module] || ""}
                              onChange={(e) =>
                                handleGradeChange(module, e.target.value)
                              }
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

                  <div className="mt-6 text-white text-center">
                    <h3 className="text-2xl font-semibold">
                      GPA: {calculateGPA()}
                    </h3>
                  </div>
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
