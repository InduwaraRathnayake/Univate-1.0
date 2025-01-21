"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const moduleSchema = z.object({
  moduleCode: z.string().min(1, "Module code is required"),
  moduleTitle: z.string().min(1, "Module title is required"),
  semester: z.array(z.number()).min(1, "At least one semester is required"),
  intake: z.string().min(1, "Intake is required"),
  compulsoryOrElective: z.enum(["Compulsory", "Elective"]),
  gpaOrNgpa: z.enum(["GPA", "NGPA"]),
  hours_per_week: z.object({
    lecture: z.number().min(0),
    lab_tutes: z.number().min(0),
  }),
  credits: z.number().min(1),
  prerequisitesOrCorequisites: z.array(z.string()),
  evaluation: z.object({
    CA: z.number().min(0).max(100),
    WE: z.number().min(0).max(100),
  }),
  learning_outcomes: z
    .array(z.string())
    .min(1, "At least one learning outcome is required"),
  syllabus_outline: z.object({
    syllabus_outline_desc: z.string(),
    content: z.array(
      z.object({
        topic: z.string().min(1, "Topic is required"),
        subtopics: z.array(z.string()).optional(),
      })
    ),
  }),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

export default function AdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      semester: [3],
      hours_per_week: { lecture: 2, lab_tutes: 2 },
      prerequisitesOrCorequisites: [""],
      evaluation: { CA: 40, WE: 60 },
      learning_outcomes: [""],
      syllabus_outline: {
        syllabus_outline_desc: "",
        content: [{ topic: "", subtopics: [""] }],
      },
    },
  });

  const {
    fields: prerequisiteFields,
    append: appendPrerequisite,
    remove: removePrerequisite,
  } = useFieldArray({
    control,
    name: "prerequisitesOrCorequisites",
  });

  const {
    fields: learningOutcomeFields,
    append: appendLearningOutcome,
    remove: removeLearningOutcome,
  } = useFieldArray({
    control,
    name: "learning_outcomes",
  });

  const {
    fields: syllabusFields,
    append: appendSyllabus,
    remove: removeSyllabus,
    update: updateSyllabus,
  } = useFieldArray({
    control,
    name: "syllabus_outline.content",
  });

  // Add these new functions to handle subtopics
  const addSubtopic = (topicIndex: number) => {
    const currentField = syllabusFields[topicIndex];
    const currentSubtopics = currentField.subtopics || [];
    updateSyllabus(topicIndex, {
      ...currentField,
      subtopics: [...currentSubtopics, ""],
    });
  };

  const removeSubtopic = (topicIndex: number, subtopicIndex: number) => {
    const currentField = syllabusFields[topicIndex];
    const currentSubtopics = currentField.subtopics || [];
    const newSubtopics = currentSubtopics.filter(
      (_, index) => index !== subtopicIndex
    );
    updateSyllabus(topicIndex, {
      ...currentField,
      subtopics: newSubtopics,
    });
  };
  const onSubmit = async (data: ModuleFormData) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      await axios.post("http://localhost:8080/api/modules", data);
      toast.success("Module added successfully!");
      reset(); // <-- reset form here
    } catch (error) {
      toast.error("Failed to add module. Please try again.");
      console.error("Error adding module:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-black mb-8">Add New Module</h1>

          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="moduleCode">Module Code</Label>
                <Input {...register("moduleCode")} placeholder="e.g., CS2053" />
                {errors.moduleCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.moduleCode.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="moduleTitle">Module Title</Label>
                <Input
                  {...register("moduleTitle")}
                  placeholder="e.g., Computer Architecture"
                />
                {errors.moduleTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.moduleTitle.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="semester">Semester</Label>
                <Input
                  type="number"
                  {...register("semester.0", { valueAsNumber: true })}
                  min={1}
                  max={8}
                  defaultValue={3}
                />
              </div>

              <div>
                <Label htmlFor="intake">Intake</Label>
                <Input
                  {...register("intake")}
                  placeholder="e.g., 2020 onwards"
                />
              </div>

              <div>
                <Label htmlFor="compulsoryOrElective">Type</Label>
                <select
                  {...register("compulsoryOrElective")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="Compulsory">Compulsory</option>
                  <option value="Elective">Elective</option>
                </select>
              </div>

              <div>
                <Label htmlFor="gpaOrNgpa">GPA Status</Label>
                <select
                  {...register("gpaOrNgpa")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="GPA">GPA</option>
                  <option value="NGPA">NGPA</option>
                </select>
              </div>
            </div>

            {/* Hours per Week */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="hours_per_week.lecture">
                  Lecture Hours/Week
                </Label>
                <Input
                  type="number"
                  {...register("hours_per_week.lecture", {
                    valueAsNumber: true,
                  })}
                  min={0}
                  defaultValue={2}
                />
              </div>

              <div>
                <Label htmlFor="hours_per_week.lab_tutes">
                  Lab/Tutorial Hours/Week
                </Label>
                <Input
                  type="number"
                  {...register("hours_per_week.lab_tutes", {
                    valueAsNumber: true,
                  })}
                  min={0}
                  defaultValue={2}
                />
              </div>
            </div>

            {/* Credits */}
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                type="number"
                {...register("credits", { valueAsNumber: true })}
                min={1}
                defaultValue={3}
              />
            </div>

            {/* Prerequisites */}
            <div>
              <Label>Prerequisites/Corequisites</Label>
              <div className="space-y-4">
                {prerequisiteFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`prerequisitesOrCorequisites.${index}`)}
                      placeholder="e.g., CS1050"
                    />
                    <Button
                      title=""
                      icon={<Minus className="h-4 w-4" />}
                      handleClick={() => removePrerequisite(index)}
                      position="left"
                    />
                  </div>
                ))}
                <Button
                  title="Add Prerequisite"
                  icon={<Plus className="h-4 w-4 mr-2" />}
                  handleClick={() => appendPrerequisite("")}
                  position="left"
                />
              </div>
            </div>

            {/* Evaluation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="evaluation.CA">Continuous Assessment (%)</Label>
                <Input
                  type="number"
                  {...register("evaluation.CA", { valueAsNumber: true })}
                  min={0}
                  max={100}
                  defaultValue={40}
                />
              </div>

              <div>
                <Label htmlFor="evaluation.WE">Written Exam (%)</Label>
                <Input
                  type="number"
                  {...register("evaluation.WE", { valueAsNumber: true })}
                  min={0}
                  max={100}
                  defaultValue={60}
                />
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <Label htmlFor="learning_outcomes">Learning Outcomes</Label>
              <div className="space-y-4">
                {learningOutcomeFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`learning_outcomes.${index}`)}
                      placeholder="Enter a learning outcome"
                    />
                    <Button
                      title=""
                      icon={<Minus className="h-4 w-4" />}
                      handleClick={() => removeLearningOutcome(index)}
                      position="left"
                    />
                  </div>
                ))}
                <Button
                  title="Add Learning Outcome"
                  icon={<Plus className="h-4 w-4 mr-2" />}
                  handleClick={() => appendLearningOutcome("")}
                  position="left"
                />
              </div>
            </div>

            {/* Syllabus Outline */}
            <div>
              <Label>Syllabus Outline</Label>
              <div className="space-y-6">
                <div>
                  <Label>Description</Label>
                  <Textarea
                    {...register("syllabus_outline.syllabus_outline_desc")}
                    placeholder="Enter syllabus outline description"
                  />
                </div>

                {syllabusFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-4 p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <Label>Topic</Label>
                        <Input
                          {...register(
                            `syllabus_outline.content.${index}.topic`
                          )}
                          placeholder="Enter topic name"
                        />
                      </div>
                      <Button
                        title=""
                        icon={<Minus className="h-4 w-4" />}
                        handleClick={() => removeSyllabus(index)}
                        position="left"
                      />
                    </div>

                    {/* Subtopics */}
                    <div className="ml-4">
                      <Label>Subtopics</Label>
                      <div className="space-y-2">
                        {field.subtopics?.map((_, subtopicIndex) => (
                          <div
                            key={`${field.id}-subtopic-${subtopicIndex}`}
                            className="flex gap-2"
                          >
                            <Input
                              {...register(
                                `syllabus_outline.content.${index}.subtopics.${subtopicIndex}`
                              )}
                              placeholder="Enter subtopic"
                            />
                            <Button
                              title=""
                              icon={<Minus className="h-4 w-4" />}
                              handleClick={() =>
                                removeSubtopic(index, subtopicIndex)
                              }
                              position="left"
                            />
                          </div>
                        ))}
                        <Button
                          title="Add Subtopic"
                          icon={<Plus className="h-4 w-4 mr-2" />}
                          handleClick={() => addSubtopic(index)}
                          position="left"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  title="Add Topic"
                  icon={<Plus className="h-4 w-4 mr-2" />}
                  handleClick={() =>
                    appendSyllabus({ topic: "", subtopics: [""] })
                  }
                  position="left"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center">
              <input type="checkbox" id="confirm" required className="mr-2" />
              <Label htmlFor="confirm">
                I confirm the above information is correct
              </Label>
            </div>
            <Button
              title={isSubmitting ? "Adding Module..." : "Add Module"}
              icon={
                isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : undefined
              }
              otherClasses="w-full bg-[#3D52A0] hover:bg-[#8697C4]"
              disabled={isSubmitting}
              variant="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
