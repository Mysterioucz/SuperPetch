"use client";

import { useState, useEffect } from "react";
import AdoptHero from "./components/AdoptHero";
import AdoptFilters from "./components/AdoptFilters";
import AdoptGrid from "./components/AdoptGrid";
import { Pet } from "./types";

export default function AdoptPage() {
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

  const resetFilters = () => {
    setFilters({
      species: "all",
      size: "all",
      age: "all",
      location: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <AdoptHero />
      {/* Filters */}
      <AdoptFilters filters={filters} setFilters={setFilters} />

      {/* Pet Grid */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        <AdoptGrid
          pets={pets}
          loading={loading}
          resetFilters={resetFilters}
        />
      </section>
    </div>
  );
}
