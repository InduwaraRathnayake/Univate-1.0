"use client";
import { useState } from "react";
import { Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddSemesterModalProps {
  onSave: (semester: {
    name: string;
    gpa: string;
    modules: { code: string; name: string; credits: string; grade: string }[];
  }) => void;
  onClose: () => void;
}

export function AddSemesterModal({ onSave, onClose }: AddSemesterModalProps) {
  const [newSemester, setNewSemester] = useState({
    name: "",
    modules: [{ code: "", name: "", credits: "", grade: "" }],
  });
  const [expandedModuleIndex, setExpandedModuleIndex] = useState<number | null>(
    0
  );

  // Grade to GPA mapping
  const gradeToGPA: Record<string, number> = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "D": 1.0,
    "F": 0.0,
  };

  // Add new module field
  const addModuleField = () => {
    setNewSemester({
      ...newSemester,
      modules: [
        ...newSemester.modules,
        { code: "", name: "", credits: "", grade: "" },
      ],
    });
    setExpandedModuleIndex(newSemester.modules.length); // Expand the new module
  };

  // Remove module field
  const removeModuleField = (index: number) => {
    const updatedModules = [...newSemester.modules];
    updatedModules.splice(index, 1);
    setNewSemester({
      ...newSemester,
      modules: updatedModules,
    });
    // Adjust expanded index if needed
    if (expandedModuleIndex === index) {
      setExpandedModuleIndex(null);
    } else if (expandedModuleIndex !== null && expandedModuleIndex > index) {
      setExpandedModuleIndex(expandedModuleIndex - 1);
    }
  };

  // Handle module input change
  const handleModuleChange = (
    index: number,
    field: keyof (typeof newSemester.modules)[0],
    value: string
  ) => {
    const updatedModules = [...newSemester.modules];
    updatedModules[index][field] = value;
    setNewSemester({
      ...newSemester,
      modules: updatedModules,
    });
  };

  // Calculate GPA based on credits and grades
  const calculateGPA = (
    modules: { code: string; name: string; credits: string; grade: string }[]
  ) => {
    let totalCredits = 0;
    let weightedSum = 0;

    modules.forEach((module) => {
      if (module.code && module.grade && module.credits) {
        const gradeValue = gradeToGPA[module.grade] || 0;
        const credits = parseInt(module.credits) || 0;

        if (gradeValue > 0 && credits > 0) {
          weightedSum += gradeValue * credits;
          totalCredits += credits;
        }
      }
    });

    if (totalCredits === 0) return "0.00";
    return (weightedSum / totalCredits).toFixed(2);
  };

  // Handle form submission
  const handleSubmit = () => {
    const gpa = calculateGPA(newSemester.modules);
    const semesterToAdd = {
      name: newSemester.name || `Semester ${new Date().getTime()}`,
      gpa: gpa.toString(),
      modules: newSemester.modules.filter((m) => m.code && m.name),
    };
    onSave(semesterToAdd);
    onClose();
  };

  // Check if form is valid
  const isFormValid =
    newSemester.name &&
    newSemester.modules.some((m) => m.code && m.name && m.grade && m.credits);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold">Add New Semester Results</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="semester-name">Semester Name</Label>
                <select
                  id="semester-name"
                  value={newSemester.name}
                  onChange={(e) =>
                    setNewSemester({ ...newSemester, name: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => (
                    <option key={semNum} value={`Semester ${semNum}`}>
                      Semester {semNum}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Modules</Label>
                <Button
                  variant="outline"
                  handleClick={addModuleField}
                  title="Add Module"
                  icon={<Plus className="h-4 w-4 mr-1" />}
                />
              </div>

              <div className="space-y-4">
                {newSemester.modules.map((module, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Module {index + 1}</h4>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedModuleIndex(
                              expandedModuleIndex === index ? null : index
                            )
                          }
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedModuleIndex === index ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {newSemester.modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeModuleField(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {expandedModuleIndex === index && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <Label htmlFor={`module-code-${index}`}>Code</Label>
                          <Input
                            id={`module-code-${index}`}
                            value={module.code}
                            onChange={(e) =>
                              handleModuleChange(index, "code", e.target.value)
                            }
                            placeholder="e.g., CS101"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`module-name-${index}`}>Name</Label>
                          <Input
                            id={`module-name-${index}`}
                            value={module.name}
                            onChange={(e) =>
                              handleModuleChange(index, "name", e.target.value)
                            }
                            placeholder="e.g., Introduction to Programming"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`module-credits-${index}`}>
                            Credits
                          </Label>
                          <Input
                            id={`module-credits-${index}`}
                            type="number"
                            value={module.credits}
                            onChange={(e) =>
                              handleModuleChange(
                                index,
                                "credits",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 3"
                            min="1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`module-grade-${index}`}>Grade</Label>
                          <select
                            id={`module-grade-${index}`}
                            value={module.grade}
                            onChange={(e) =>
                              handleModuleChange(index, "grade", e.target.value)
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select grade</option>
                            <option value="A">A (4.0)</option>
                            <option value="A-">A- (3.7)</option>
                            <option value="B+">B+ (3.3)</option>
                            <option value="B">B (3.0)</option>
                            <option value="B-">B- (2.7)</option>
                            <option value="C+">C+ (2.3)</option>
                            <option value="C">C (2.0)</option>
                            <option value="D">D (1.0)</option>
                            <option value="F">F (0.0)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" handleClick={onClose} title="Cancel" />
              <Button
                handleClick={handleSubmit}
                disabled={!isFormValid}
                title="Save"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}