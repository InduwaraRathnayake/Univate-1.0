import ModuleContent from "./module-content";

export default async function ModulePage({
  params,
}: {
  params: { moduleId: string };
}) {
  const { moduleId } = await params;

  if (!moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: Module ID is missing</p>
      </div>
    );
  }

  return <ModuleContent moduleId={moduleId} />;
}