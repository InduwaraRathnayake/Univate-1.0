import { useState, useEffect } from "react";

interface TabsComponentProps {
  streamName: Number;
}

interface ModuleDetails {
  moduleCode: string;
  moduleTitle: string;
  credits: number;
}

const TabsComponent: React.FC<TabsComponentProps> = ({ streamName }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [modules, setModules] = useState<{ [key: number]: ModuleDetails[] }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const tabs = Array.from({ length: 8 }, (_, i) => ({ text: `${i + 1}` }));

  useEffect(() => {
    fetchModules();
  }, [streamName]);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/streams/${streamName}`); // Replace with your backend URL
      const data = await response.json();
      console.log(data.sem1);

      const groupedModules: { [key: number]: ModuleDetails[] } = {};

      // For each semester, fetch the module details based on module codes
      for (let sem = 1; sem <= 8; sem++) {
        const semesterModules = data[`sem${sem}`];
        if (semesterModules && semesterModules.length > 0) {
          groupedModules[sem] = [];
          // Fetch details for each module in this semester
          for (const moduleCode of semesterModules) {
            const moduleDetails = await fetchModuleDetails(moduleCode);
            if (moduleDetails) {
              groupedModules[sem].push(moduleDetails);
            }
          }
        }
      }

      setModules(groupedModules);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

const fetchModuleDetails = async (moduleCode: string): Promise<ModuleDetails | null> => {
    try {
      const response = await fetch(`http://localhost:8080/api/modules/search/${moduleCode}`);
  
  
      if (!response.ok) {
        return null;
      }
  
      // Try to parse the response as JSON
      const data = await response.json();
  
      return {
        moduleCode: data[0].moduleCode,
        moduleTitle: data[0].moduleTitle,
        credits: data[0].credits,
      };
    } catch (error) {
      console.error(`Error fetching details for module ${moduleCode}:`, error);
      return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <nav className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              activeTab === index ? "bg-gray-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <span className="hidden sm:inline">Sem {tab.text}</span>
          </button>
        ))}
      </nav>

      <div className="bg-white text-black rounded-lg shadow-md p-6">
        {tabs.map((tab, index) => (
          <div key={index} id={`tabpanel-${index}`} role="tabpanel" className={`${activeTab === index ? "block" : "hidden"}`}>
            <h2 className="text-2xl font-bold mb-4">Semester {tab.text}</h2>

            {/* Table */}
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-left">Module Code</th>
                  <th className="border px-4 py-2 text-left">Module Title</th>
                  <th className="border px-4 py-2 text-left">Credits</th>
                </tr>
              </thead>
              <tbody>
                {modules[index + 1]?.map((module, moduleIndex) => (
                  <tr key={moduleIndex}>
                    <td className="border px-4 py-2">{module.moduleCode}</td>
                    <td className="border px-4 py-2">{module.moduleTitle}</td>
                    <td className="border px-4 py-2">{module.credits}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={3} className="border px-4 py-2 text-center text-gray-500">
                      No modules available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Total Credits Row */}
            <div className="flex justify-end mt-4">
              <div className="font-semibold text-lg">
                Total Credits: {modules[index + 1]?.reduce((sum, mod) => sum + mod.credits, 0) || 0}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
