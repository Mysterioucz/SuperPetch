import { Pet } from "../types";
import AdoptPetCard from "./AdoptPetCard";
import AdoptEmptyState from "./AdoptEmptyState";
import Select from "../../components/ui/Select";

interface AdoptGridProps {
  pets: Pet[];
  loading: boolean;
  resetFilters: () => void;
  filters: any;
  setFilters: (filters: any) => void;
}

export default function AdoptGrid({
  pets,
  loading,
  resetFilters,
  filters,
  setFilters,
}: AdoptGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-600 border-t-transparent"></div>
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
        <div className="w-full sm:w-auto min-w-[200px]">
          <Select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            options={[
              { value: "newest", label: "Sort by: Newest" },
              { value: "oldest", label: "Sort by: Oldest" },
              { value: "name_asc", label: "Sort by: Name A-Z" },
              { value: "age", label: "Sort by: Age" },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pets.map((pet) => (
          <AdoptPetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </>
  );
}
