"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  color: string;
  weight: number;
  description: string;
  temperament: string[];
  healthStatus: string;
  vaccinated: boolean;
  neutered: boolean;
  microchipped: boolean;
  specialNeeds: string;
  city: string;
  state: string;
  zipCode: string;
  adoptionFee: number;
  images: string[];
  status: string;
  ownerId: string;
  createdAt: string;
}

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

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
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-3xl">🐾</span>
              <span className="text-xl font-bold text-blue-600">
                PetPlatform
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/adopt"
                className="text-slate-600 hover:text-blue-600 font-medium"
              >
                Adopt
              </Link>
              <Link
                href="/list-pet"
                className="text-slate-600 hover:text-blue-600 font-medium"
              >
                List Pet
              </Link>
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

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

          {/* Pet Details */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    {pet.name}
                  </h1>
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
                    <p className="mt-2 text-2xl font-bold text-green-600">
                      Free
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 py-6 border-y border-slate-200">
              <div className="text-center border-r border-slate-200 last:border-0">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Age
                </p>
                <p className="font-semibold text-slate-900">{pet.age} yrs</p>
              </div>
              <div className="text-center border-r border-slate-200 last:border-0">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Gender
                </p>
                <p className="font-semibold text-slate-900 capitalize">
                  {pet.gender}
                </p>
              </div>
              <div className="text-center border-r border-slate-200 last:border-0">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Size
                </p>
                <p className="font-semibold text-slate-900 capitalize">
                  {pet.size}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Color
                </p>
                <p className="font-semibold text-slate-900 capitalize">
                  {pet.color}
                </p>
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                About {pet.name}
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {pet.description}
              </p>
            </div>

            {/* Temperament */}
            {pet.temperament && pet.temperament.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Temperament
                </h3>
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
            )}

            {/* Health & Medical */}
            <div className="bg-slate-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Health & Medical
              </h3>
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
                  <span className="text-sm text-slate-700">
                    Spayed/Neutered
                  </span>
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
                    <span className="font-medium text-slate-900">
                      Health Note:{" "}
                    </span>
                    {pet.healthStatus}
                  </p>
                </div>
              )}
              {pet.specialNeeds && (
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-900">
                      Special Needs:{" "}
                    </span>
                    {pet.specialNeeds}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Adopt {pet.name}
              </button>
              <button className="px-6 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all">
                ❤️
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
