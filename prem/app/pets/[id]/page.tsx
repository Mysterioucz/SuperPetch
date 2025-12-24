"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Pet } from "./types";
import PetGallery from "./components/PetGallery";
import PetHeader from "./components/PetHeader";
import PetStats from "./components/PetStats";
import PetAbout from "./components/PetAbout";
import PetTemperament from "./components/PetTemperament";
import PetHealth from "./components/PetHealth";
import PetActions from "./components/PetActions";

export default function PetDetailPage() {
  const params = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PET_SERVICE_URL}/api/v1/pets/${params.id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch pet details");
        }

        // Parse temperament if it's a string (backend might return JSON string)
        if (typeof data.temperament === "string") {
          try {
            data.temperament = JSON.parse(data.temperament);
          } catch (e) {
            data.temperament = [data.temperament];
          }
        }

        setPet(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPet();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Oops! Pet not found
          </h2>
          <p className="text-slate-600 mb-6">
            {error || "We couldn't find the pet you're looking for."}
          </p>
          <Link
            href="/adopt"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
          >
            Browse other pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/adopt" className="hover:text-blue-600">
            Adopt
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">{pet.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <PetGallery pet={pet} />

          {/* Pet Details */}
          <div className="space-y-8">
            <PetHeader pet={pet} />
            <PetStats pet={pet} />
            <PetAbout pet={pet} />
            <PetTemperament pet={pet} />
            <PetHealth pet={pet} />
            <PetActions pet={pet} />
          </div>
        </div>
      </main>
    </div>
  );
}
