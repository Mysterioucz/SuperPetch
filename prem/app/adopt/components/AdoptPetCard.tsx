import { useRouter } from "next/navigation";
import { Pet } from "../types";

interface AdoptPetCardProps {
  pet: Pet;
}

export default function AdoptPetCard({ pet }: AdoptPetCardProps) {
  const router = useRouter();

  const handlePetClick = () => {
    router.push(`/pets/${pet.id}`);
  };

  return (
    <div
      onClick={handlePetClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {pet.images && pet.images.length > 0 ? (
          <img
            src={pet.images[0]}
            alt={pet.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl text-slate-300">
            {pet.species === "dog"
              ? "🐕"
              : pet.species === "cat"
              ? "🐈"
              : pet.species === "bird"
              ? "🐦"
              : pet.species === "rabbit"
              ? "🐰"
              : "🐾"}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm backdrop-blur-sm transition-colors hover:text-red-500 hover:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.16-1.1c-1.07-1.09-3.2-3.43-3.32-6.125-.08-1.785 1.398-3.332 3.18-3.332.837 0 1.592.35 2.12.906a3.36 3.36 0 012.12-.906c1.782 0 3.26 1.547 3.18 3.332-.12 2.695-2.25 5.035-3.32 6.125a20.759 20.759 0 01-1.16 1.1l-.019.01-.005.003h-.002z" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm shadow-sm">
            {pet.breed}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {pet.name}
          </h3>
          <span className="text-sm font-medium text-slate-500">
            {pet.age} {pet.age === 1 ? "yr" : "yrs"}
          </span>
        </div>

        <p className="mb-4 text-sm text-slate-600 line-clamp-2 flex-1">
          {pet.description}
        </p>

        <div className="flex items-center text-xs text-slate-500 mb-4 gap-3">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-slate-400"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.001.001zm0-3.196L9.69 15.737zM6 9a4 4 0 118 0 4 4 0 01-8 0z"
                clipRule="evenodd"
              />
            </svg>
            {pet.location}
          </div>
          <div className="flex items-center gap-1 capitalize">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-slate-400"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                clipRule="evenodd"
              />
            </svg>
            {pet.gender}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {pet.vaccinated && (
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Vaccinated
            </span>
          )}
          {pet.neutered && (
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Neutered
            </span>
          )}
        </div>

        <button className="mt-auto w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
