import { Pet } from "../types";

interface PetTemperamentProps {
  pet: Pet;
}

export default function PetTemperament({ pet }: PetTemperamentProps) {
  if (!pet.temperament || pet.temperament.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-3">Temperament</h3>
      <div className="flex flex-wrap gap-2">
        {pet.temperament.map((trait, idx) => (
          <span
            key={idx}
            className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}
