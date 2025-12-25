import { Pet } from "../types";

interface PetAboutProps {
  pet: Pet;
}

export default function PetAbout({ pet }: PetAboutProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-3">
        About {pet.name}
      </h3>
      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
        {pet.description}
      </p>
    </div>
  );
}
