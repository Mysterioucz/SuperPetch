import { useState } from "react";
import { Pet } from "../types";

interface PetGalleryProps {
  pet: Pet;
}

export default function PetGallery({ pet }: PetGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
        {pet.images && pet.images.length > 0 ? (
          <img
            src={pet.images[activeImage]}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <span className="text-6xl">🐾</span>
          </div>
        )}
      </div>
      {pet.images && pet.images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {pet.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === idx
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-transparent hover:border-slate-300"
              }`}
            >
              <img
                src={img}
                alt={`${pet.name} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
