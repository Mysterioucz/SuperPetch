import { Pet } from "../types";

interface PetHeaderProps {
  pet: Pet;
}

export default function PetHeader({ pet }: PetHeaderProps) {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{pet.name}</h1>
          <p className="text-lg text-slate-600 flex items-center gap-2">
            <span className="capitalize">{pet.breed}</span>
            <span>•</span>
            <span>
              {pet.city}, {pet.state}
            </span>
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {pet.status}
          </span>
          {pet.adoptionFee > 0 ? (
            <p className="mt-2 text-2xl font-bold text-slate-900">
              ${pet.adoptionFee}
            </p>
          ) : (
            <p className="mt-2 text-2xl font-bold text-green-600">Free</p>
          )}
        </div>
      </div>
    </div>
  );
}
