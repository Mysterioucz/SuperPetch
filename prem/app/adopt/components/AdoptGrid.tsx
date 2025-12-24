import { Pet } from "../types";
import AdoptPetCard from "./AdoptPetCard";
import AdoptEmptyState from "./AdoptEmptyState";

interface AdoptGridProps {
  pets: Pet[];
  loading: boolean;
  resetFilters: () => void;
}

export default function AdoptGrid({
  pets,
  loading,
  resetFilters,
}: AdoptGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (pets.length === 0) {
    return <AdoptEmptyState resetFilters={resetFilters} />;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Available Pets{" "}
          <span className="text-slate-500 text-lg font-normal">
            ({pets.length})
          </span>
        </h2>
        <select className="block w-full sm:w-auto rounded-lg border-0 py-2 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
          <option>Sort by: Newest</option>
          <option>Sort by: Oldest</option>
          <option>Sort by: Name A-Z</option>
          <option>Sort by: Age</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pets.map((pet) => (
          <AdoptPetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </>
  );
}
