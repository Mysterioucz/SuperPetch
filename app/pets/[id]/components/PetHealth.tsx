import { Pet } from "../types";

interface PetHealthProps {
  pet: Pet;
}

export default function PetHealth({ pet }: PetHealthProps) {
  return (
    <div className="bg-slate-50 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Health & Medical</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              pet.vaccinated ? "bg-green-500" : "bg-slate-300"
            }`}
          />
          <span className="text-sm text-slate-700">Vaccinated</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              pet.neutered ? "bg-green-500" : "bg-slate-300"
            }`}
          />
          <span className="text-sm text-slate-700">Spayed/Neutered</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              pet.microchipped ? "bg-green-500" : "bg-slate-300"
            }`}
          />
          <span className="text-sm text-slate-700">Microchipped</span>
        </div>
      </div>
      {pet.healthStatus && (
        <div className="pt-2 border-t border-slate-200 mt-2">
          <p className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">Health Note: </span>
            {pet.healthStatus}
          </p>
        </div>
      )}
      {pet.specialNeeds && (
        <div className="pt-2 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">Special Needs: </span>
            {pet.specialNeeds}
          </p>
        </div>
      )}
    </div>
  );
}
