import SelectStateCoverageMap from "./select-state-coverage-map";

export default function SelectCoverageArea() {
  return (
    <main className="flex flex-col h-screen w-full px-6 py-16">
      <div className="text-3xl text-center font-bold mt-2 mb-4">
        Select State Coverage Area
      </div>

      <SelectStateCoverageMap />
    </main>
  );
};
