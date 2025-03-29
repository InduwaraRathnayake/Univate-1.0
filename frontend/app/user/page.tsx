"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  User,
  Book,
  Award,
  Activity,
  Calendar,
  GraduationCap,
  BookOpen,
  Bell,
  FileText,
  Users,
  Plus,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { authService } from "@/lib/auth.service";
import { useRouter } from "next/navigation";
import { AddSemesterModal } from "@/components/AddSemester";

// Dummy data for the line chart
const performanceData = [
  { month: "Sem 1", score: 3.89 },
  { month: "Sem 2", score: 3.85 },
  { month: "Sem 3", score: 3.57 },
  { month: "Sem 4", score: 3.85 },
  { month: "Sem 5", score: 3.75 },
  { month: "Sem 6", score: 3.9 },
];

// Dummy data for course schedule
const courseSchedule = [
  {
    day: "Monday",
    courses: [
      { time: "09:00 - 10:30", name: "Computer Architecture", room: "Lab 201" },
      { time: "11:00 - 12:30", name: "Database Systems", room: "Room 105" },
    ],
  },
  {
    day: "Tuesday",
    courses: [
      { time: "08:30 - 10:00", name: "Software Engineering", room: "Room 302" },
      { time: "14:00 - 15:30", name: "Web Development", room: "Lab 103" },
    ],
  },
];

// Dummy data for upcoming assignments
const upcomingAssignments = [
  {
    course: "Computer Architecture",
    title: "CPU Design Project",
    dueDate: "2024-04-15",
    progress: 65,
  },
  {
    course: "Database Systems",
    title: "SQL Assignment",
    dueDate: "2024-04-18",
    progress: 30,
  },
  {
    course: "Web Development",
    title: "Final Project",
    dueDate: "2024-04-20",
    progress: 45,
  },
];

export default function ProfilePage() {
  const [selectedSemester, setSelectedSemester] = useState<{
    id: number;
    name: string;
    gpa: number;
    modules: { code: string; name: string; credits: number; grade: string }[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (semester: {
    id: number;
    name: string;
    gpa: number;
    modules: { code: string; name: string; credits: number; grade: string }[];
  }) => {
    setSelectedSemester(semester);
    setIsModalOpen(true);
  };

  const [semesters, setSemesters] = useState([
    {
      id: 1,
      name: "Semester 1",
      gpa: 3.89,
      modules: [
        {
          code: "CS101",
          name: "Introduction to Programming",
          credits: 4,
          grade: "A",
        },
        { code: "MATH101", name: "Calculus I", credits: 3, grade: "A-" },
        {
          code: "PHYS101",
          name: "Physics Fundamentals",
          credits: 3,
          grade: "B+",
        },
      ],
    },
    {
      id: 2,
      name: "Semester 2",
      gpa: 3.85,
      modules: [
        { code: "CS102", name: "Data Structures", credits: 4, grade: "A" },
        {
          code: "MATH102",
          name: "Discrete Mathematics",
          credits: 3,
          grade: "B+",
        },
        { code: "EE101", name: "Electrical Circuits", credits: 3, grade: "A-" },
      ],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Handle saving new semester
  const handleSaveSemester = (newSemester: {
    name: string;
    gpa: string;
    modules: { code: string; name: string; credits: string; grade: string }[];
  }) => {
    setSemesters([
      ...semesters,
      {
        ...newSemester,
        gpa: parseFloat(newSemester.gpa),
        modules: newSemester.modules.map((module) => ({
          ...module,
          credits: parseInt(module.credits, 10),
        })),
        id: Date.now(),
      },
    ]);
  };

  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // Function to update user state
  const updateUser = () => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("user"));
    }
  };

  useEffect(() => {
    // Load user from localStorage when component mounts
    updateUser();

    // Listen for storage events (when user logs in/out in another tab)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        updateUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle logout
  // const handleLogout = () => {
  //   localStorage.removeItem("user"); // Remove user data
  //   updateUser(); // Update UI
  //   router.push("/login"); // Redirect to login page
  // };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* User Profile Card */}
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Profile</CardTitle>
              <User className="h-5 w-5 text-[#3D52A0]" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-24 h-24">
                  <img
                    src={
                      user
                        ? JSON.parse(user).imageUrl ||
                          `https://ui-avatars.com/api/?name=${
                            JSON.parse(user).firstName
                          }`
                        : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="rounded-full object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="text-center">
                  {user && (
                    <h3 className="text-lg font-semibold">{`${
                      JSON.parse(user).firstName
                    } ${JSON.parse(user).lastName}`}</h3>
                  )}
                  {user && (
                    <p className="text-sm text-gray-500">{`${
                      JSON.parse(user).email
                    }`}</p>
                  )}
                  <p className="text-sm font-medium text-[#3D52A0] mt-2">
                    Computer Science & Engineering
                  </p>
                </div>

                <button
                  className="bg-red-700 text-white px-6 w-full h-12 mt-10 rounded-full hover:bg-red-800 transition-colors"
                  onClick={() => {
                    authService.logout();
                    router.push("/");
                  }}
                >
                  LogOut
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Academic Progress Card */}
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Academic Progress
              </CardTitle>
              <Book className="h-5 w-5 text-[#3D52A0]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Current GPA</p>
                  <h3 className="text-2xl font-bold">3.75</h3>
                </div>
                <div>
                  <p className="text-sm font-medium">Completed Credits</p>
                  <h3 className="text-2xl font-bold">75/120</h3>
                  <Progress value={62.5} className="mt-2" />
                </div>
                <div>
                  <p className="text-sm font-medium">Current Semester</p>
                  <h3 className="text-lg font-semibold">Semester 4</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Achievements</CardTitle>
              <Award className="h-5 w-5 text-[#3D52A0]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">
                      Dean&apos;s List
                    </span>
                  </div>
                  <span className="text-xs text-gray-800">Semester 1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">
                      Dean&apos;s List
                    </span>
                  </div>
                  <span className="text-xs text-gray-800">Semester 2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart Card */}
          <Card className="bg-white/90 backdrop-blur-lg md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Performance Trend
              </CardTitle>
              <Activity className="h-5 w-5 text-[#3D52A0]" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {" "}
                {/* Increased from h-[200px] */}
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#6b7280" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      domain={[3.0, 4.0]}
                      tick={{ fill: "#6b7280" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                      formatter={(value) => [`GPA: ${value}`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3D52A0"
                      strokeWidth={3}
                      dot={{
                        fill: "#3D52A0",
                        strokeWidth: 2,
                        r: 5,
                      }}
                      activeDot={{
                        r: 7,
                        stroke: "#3D52A0",
                        strokeWidth: 2,
                        fill: "#ffffff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Semester Results
              </CardTitle>
              <Book className="h-5 w-5 text-[#3D52A0]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Existing Results */}
                <div className="space-y-3">
                  {semesters.map((semester) => (
                    <div
                      key={semester.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{semester.name}</p>
                        <p className="text-xs text-gray-500">
                          GPA: {semester.gpa}
                        </p>
                      </div>
                      <button
                        className="text-xs text-blue-600 hover:text-blue-800"
                        onClick={() => handleViewDetails(semester)}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Result Button */}
                <Button
                  title="Add New Semester"
                  icon={<Plus className="h-4 w-4 mr-2" />}
                  handleClick={() => setIsAddModalOpen(true)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Semester Details Modal */}
          {isAddModalOpen && (
            <AddSemesterModal
              onSave={handleSaveSemester}
              onClose={() => setIsAddModalOpen(false)}
            />
          )}
          {isModalOpen && selectedSemester && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">
                      {selectedSemester.name} Results
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Module Code</th>
                          <th className="text-left py-3 px-4">Module Name</th>
                          <th className="text-left py-3 px-4">Credits</th>
                          <th className="text-left py-3 px-4">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSemester.modules.map((module) => (
                          <tr
                            key={module.code}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-mono">
                              {module.code}
                            </td>
                            <td className="py-3 px-4">{module.name}</td>
                            <td className="py-3 px-4 text-center">
                              {module.credits}
                            </td>
                            <td className="py-3 px-4 font-medium text-center">
                              {module.grade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        Semester GPA:{" "}
                        <span className="font-bold">
                          {selectedSemester.gpa}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Credits:{" "}
                        <span className="font-bold">
                          {selectedSemester.modules.reduce(
                            (sum, module) => sum + module.credits,
                            0
                          )}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-[#3D52A0] text-white rounded hover:bg-[#2C3B7A] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
          {/* Additional Sections */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardContent className="pt-6">
              <Tabs defaultValue="schedule" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger
                    value="schedule"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger
                    value="assignments"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Assignments
                  </TabsTrigger>
                  <TabsTrigger
                    value="degree"
                    className="flex items-center gap-2"
                  >
                    <GraduationCap className="h-4 w-4" />
                    Degree Progress
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Resources
                  </TabsTrigger>
                </TabsList>

                {/* Schedule Tab */}
                <TabsContent value="schedule" className="mt-4">
                  <div className="space-y-6">
                    {courseSchedule.map((day, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-lg mb-3">
                          {day.day}
                        </h3>
                        <div className="space-y-3">
                          {day.courses.map((course, courseIndex) => (
                            <div
                              key={courseIndex}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{course.name}</p>
                                <p className="text-sm text-gray-500">
                                  {course.time}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {course.room}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments" className="mt-4">
                  <div className="space-y-4">
                    {upcomingAssignments.map((assignment, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{assignment.title}</h4>
                            <p className="text-sm text-gray-500">
                              {assignment.course}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500">
                            Due: {assignment.dueDate}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{assignment.progress}%</span>
                          </div>
                          <Progress value={assignment.progress} />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Degree Progress Tab */}
                <TabsContent value="degree" className="mt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Core Requirements</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Programming Fundamentals</span>
                          <span className="text-green-500">Completed</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Data Structures</span>
                          <span className="text-green-500">Completed</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Algorithms</span>
                          <span className="text-blue-500">In Progress</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">
                        Electives (3/5 Required)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Machine Learning</span>
                          <span className="text-green-500">Completed</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Web Development</span>
                          <span className="text-blue-500">In Progress</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Cloud Computing</span>
                          <span className="text-gray-500">Not Started</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Resources Tab */}
                <TabsContent value="resources" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Important Announcements
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          Mid-term examination schedule published
                        </p>
                        <p className="text-sm">
                          Library hours extended for finals week
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Study Groups
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          Algorithm Study Group - Thursdays 5PM
                        </p>
                        <p className="text-sm">
                          Database Project Team - Tuesdays 3PM
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
