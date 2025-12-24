"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  description: string;
  images: string[];
  location: string;
  vaccinated: boolean;
  neutered: boolean;
}

export default function AdoptPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    species: "all",
    size: "all",
    age: "all",
    location: "",
  });

  useEffect(() => {
    fetchPets();
  }, [filters]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.species !== "all")
        queryParams.append("species", filters.species);
      if (filters.size !== "all") queryParams.append("size", filters.size);
      if (filters.age !== "all") queryParams.append("age", filters.age);
      if (filters.location) queryParams.append("location", filters.location);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_PET_SERVICE_URL
        }/api/v1/pets?${queryParams.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setPets(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePetClick = (petId: string) => {
    router.push(`/pets/${petId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-3xl">🐾</span>
              <span className="text-xl font-bold tracking-tight text-blue-600">
                PetPlatform
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/adopt" className="text-blue-600">
                Adopt
              </Link>
              <Link
                href="/list-pet"
                className="hover:text-blue-600 transition-colors"
              >
                List Pet
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-600 py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 h-full w-full bg-blue-600 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#60a5fa,transparent)] opacity-40"></div>

        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Perfect Companion
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Browse through our collection of adorable pets waiting for a loving
            home. Your new best friend is just a click away.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 md:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Select
                label="Species"
                value={filters.species}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    species: e.target.value,
                  })
                }
                options={[
                  { value: "all", label: "All Species" },
                  { value: "dog", label: "Dogs" },
                  { value: "cat", label: "Cats" },
                  { value: "bird", label: "Birds" },
                  { value: "rabbit", label: "Rabbits" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>

            <div>
              <Select
                label="Size"
                value={filters.size}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    size: e.target.value,
                  })
                }
                options={[
                  { value: "all", label: "All Sizes" },
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
              />
            </div>

            <div>
              <Select
                label="Age"
                value={filters.age}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    age: e.target.value,
                  })
                }
                options={[
                  { value: "all", label: "All Ages" },
                  { value: "puppy", label: "Puppy/Kitten" },
                  { value: "young", label: "Young" },
                  { value: "adult", label: "Adult" },
                  { value: "senior", label: "Senior" },
                ]}
              />
            </div>

            <div>
              <Input
                label="Location"
                type="text"
                value={filters.location}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    location: e.target.value,
                  })
                }
                placeholder="City or ZIP code"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 rounded-full bg-slate-100 p-6">
              <span className="text-6xl">🐾</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              No pets found
            </h2>
            <p className="mt-2 text-slate-600">
              We couldn't find any pets matching your criteria. Try adjusting
              your filters.
            </p>
            <button
              onClick={() =>
                setFilters({
                  species: "all",
                  size: "all",
                  age: "all",
                  location: "",
                })
              }
              className="mt-8 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Available Pets{" "}
                <span className="text-slate-500 text-lg font-normal">
                  ({pets.length})
                </span>
              </h2>
              <select className="block w-full sm:w-auto rounded-lg border-0 py-2 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                <option>Sort by: Newest</option>
                <option>Sort by: Oldest</option>
                <option>Sort by: Name A-Z</option>
                <option>Sort by: Age</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => handlePetClick(pet.id)}
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
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
