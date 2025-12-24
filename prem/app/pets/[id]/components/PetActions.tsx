import { Pet } from "../types";

interface PetActionsProps {
  pet: Pet;
}

export default function PetActions({ pet }: PetActionsProps) {
  return (
    <div className="flex gap-4 pt-4">
      <button className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
        Adopt {pet.name}
      </button>
      <button className="px-6 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all">
        ❤️
      </button>
    </div>
  );
}
