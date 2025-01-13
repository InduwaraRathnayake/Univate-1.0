import ModuleContent from "./module-content";
import { modules } from "@/lib/data/modules";

export const dynamicParams = true; // Allow unknown dynamic routes

export async function generateStaticParams() {
  return modules.map((module) => ({
    moduleId: module.id.toLowerCase(),
  }));
}

export default  function ModulePage({ params }: { params: { moduleId?: string } }) {
  const moduleId = params?.moduleId;

  if (!moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: Module ID is missing</p>
      </div>
    );
  }

  return <ModuleContent moduleId={moduleId} />;
}
