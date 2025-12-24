import { Pet } from "../types";

interface PetStatsProps {
  pet: Pet;
}

export default function PetStats({ pet }: PetStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 py-6 border-y border-slate-200">
      <div className="text-center border-r border-slate-200 last:border-0">
        <p className="text-xs text-slate-500 uppercase tracking-wide">Age</p>
        <p className="font-semibold text-slate-900">{pet.age} yrs</p>
      </div>
      <div className="text-center border-r border-slate-200 last:border-0">
        <p className="text-xs text-slate-500 uppercase tracking-wide">Gender</p>
        <p className="font-semibold text-slate-900 capitalize">{pet.gender}</p>
      </div>
      <div className="text-center border-r border-slate-200 last:border-0">
        <p className="text-xs text-slate-500 uppercase tracking-wide">Size</p>
        <p className="font-semibold text-slate-900 capitalize">{pet.size}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-500 uppercase tracking-wide">Color</p>
        <p className="font-semibold text-slate-900 capitalize">{pet.color}</p>
      </div>
    </div>
  );
}
