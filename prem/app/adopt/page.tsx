"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
            if (filters.species !== "all") queryParams.append("species", filters.species);
            if (filters.size !== "all") queryParams.append("size", filters.size);
            if (filters.age !== "all") queryParams.append("age", filters.age);
            if (filters.location) queryParams.append("location", filters.location);

            const response = await fetch(`/api/pets?${queryParams.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setPets(data.pets || []);
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-3xl">🐾</span>
                            <span className="text-xl font-bold text-blue-600">
                                PetPlatform
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-6">
                            <Link
                                href="/adopt"
                                className="text-blue-600 font-semibold"
                            >
                                Adopt
                            </Link>
                            <Link
                                href="/list-pet"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                List Pet
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-blue-600 hover:text-blue-700"
                            >
                                Login
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find Your Perfect Companion
                    </h1>
                    <p className="text-xl opacity-90">
                        Browse through our collection of adorable pets waiting for a loving home
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Species
                            </label>
                            <select
                                value={filters.species}
                                onChange={(e) =>
                                    setFilters({ ...filters, species: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Species</option>
                                <option value="dog">Dogs</option>
                                <option value="cat">Cats</option>
                                <option value="bird">Birds</option>
                                <option value="rabbit">Rabbits</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Size
                            </label>
                            <select
                                value={filters.size}
                                onChange={(e) =>
                                    setFilters({ ...filters, size: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Sizes</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age
                            </label>
                            <select
                                value={filters.age}
                                onChange={(e) =>
                                    setFilters({ ...filters, age: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Ages</option>
                                <option value="puppy">Puppy/Kitten</option>
                                <option value="young">Young</option>
                                <option value="adult">Adult</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={filters.location}
                                onChange={(e) =>
                                    setFilters({ ...filters, location: e.target.value })
                                }
                                placeholder="City or ZIP code"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pet Grid */}
            <section className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>
                ) : pets.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🐾</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            No pets found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters or check back later
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
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Available Pets ({pets.length})
                            </h2>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg">
                                <option>Sort by: Newest</option>
                                <option>Sort by: Oldest</option>
                                <option>Sort by: Name A-Z</option>
                                <option>Sort by: Age</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {pets.map((pet) => (
                                <div
                                    key={pet.id}
                                    onClick={() => handlePetClick(pet.id)}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                                >
                                    <div className="relative h-64 bg-gray-200">
                                        {pet.images && pet.images.length > 0 ? (
                                            <img
                                                src={pet.images[0]}
                                                alt={pet.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-6xl">
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
                                            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                                                ❤️
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {pet.name}
                                        </h3>

                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                                                {pet.breed}
                                            </span>
                                            <span>{pet.age} years old</span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {pet.description}
                                        </p>

                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <span className="mr-4">📍 {pet.location}</span>
                                            <span>{pet.gender}</span>
                                        </div>

                                        <div className="flex space-x-2 mb-3">
                                            {pet.vaccinated && (
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    ✓ Vaccinated
                                                </span>
                                            )}
                                            {pet.neutered && (
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    ✓ Neutered
                                                </span>
                                            )}
                                        </div>

                                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
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
