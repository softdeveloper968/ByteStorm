import SelectZipCoverageMap from "./select-zip-coverage-map";

export default function SelectZipCoverage() {
  return (
    <main className="flex flex-col h-screen w-full px-6 py-16">
      <div className="text-3xl text-center font-bold mt-2 mb-4">
        Select Coverage Area
      </div>

      <SelectZipCoverageMap />
    </main>
  );
};
