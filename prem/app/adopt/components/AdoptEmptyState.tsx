interface AdoptEmptyStateProps {
  resetFilters: () => void;
}

export default function AdoptEmptyState({
  resetFilters,
}: AdoptEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 rounded-full bg-slate-100 p-6">
        <span className="text-6xl">🐾</span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        No pets found
      </h2>
      <p className="mt-2 text-slate-600">
        We couldn't find any pets matching your criteria. Try adjusting your
        filters.
      </p>
      <button
        onClick={resetFilters}
        className="mt-8 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
      >
        Clear Filters
      </button>
    </div>
  );
}
