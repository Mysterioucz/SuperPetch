"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ListPetPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        species: "dog",
        breed: "",
        age: "",
        gender: "male",
        size: "medium",
        color: "",
        weight: "",
        description: "",
        temperament: [] as string[],
        healthStatus: "",
        vaccinated: false,
        neutered: false,
        microchipped: false,
        specialNeeds: "",
        location: "",
        city: "",
        state: "",
        zipCode: "",
        adoptionFee: "",
        images: [] as File[],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const temperamentOptions = [
        "Friendly",
        "Energetic",
        "Calm",
        "Playful",
        "Affectionate",
        "Independent",
        "Protective",
        "Gentle",
        "Social",
        "Quiet",
    ];

    const handleTemperamentToggle = (trait: string) => {
        setFormData({
            ...formData,
            temperament: formData.temperament.includes(trait)
                ? formData.temperament.filter((t) => t !== trait)
                : [...formData.temperament, trait],
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                images: Array.from(e.target.files),
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "images") {
                    formData.images.forEach((image) => {
                        formDataToSend.append("images", image);
                    });
                } else if (key === "temperament") {
                    formDataToSend.append(key, JSON.stringify(value));
                } else {
                    formDataToSend.append(key, value.toString());
                }
            });

            const response = await fetch("/api/pets", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to list pet");
            }

            router.push(`/pets/${data.id}`);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
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
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Adopt
                            </Link>
                            <Link
                                href="/list-pet"
                                className="text-blue-600 font-semibold"
                            >
                                List Pet
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Dashboard
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            List Your Pet for Adoption
                        </h1>
                        <p className="text-gray-600">
                            Help your pet find a loving forever home
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center flex-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                    step >= 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-600"
                                }`}
                            >
                                1
                            </div>
                            <div
                                className={`flex-1 h-1 mx-2 ${
                                    step >= 2 ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            ></div>
                        </div>
                        <div className="flex items-center flex-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                    step >= 2
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-600"
                                }`}
                            >
                                2
                            </div>
                            <div
                                className={`flex-1 h-1 mx-2 ${
                                    step >= 3 ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            ></div>
                        </div>
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                step >= 3
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 text-gray-600"
                            }`}
                        >
                            3
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Basic Information */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Basic Information
                                    </h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pet Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., Max"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Species *
                                            </label>
                                            <select
                                                required
                                                value={formData.species}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        species: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="dog">Dog</option>
                                                <option value="cat">Cat</option>
                                                <option value="bird">Bird</option>
                                                <option value="rabbit">Rabbit</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Breed *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.breed}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        breed: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="e.g., Golden Retriever"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Age (years) *
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                max="30"
                                                value={formData.age}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        age: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="e.g., 3"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Gender *
                                            </label>
                                            <select
                                                required
                                                value={formData.gender}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        gender: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Size *
                                            </label>
                                            <select
                                                required
                                                value={formData.size}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        size: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="large">Large</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Weight (lbs)
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.weight}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        weight: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="e.g., 50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Color
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.color}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    color: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., Brown and White"
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                        >
                                            Next Step →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Health & Temperament */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Health & Temperament
                                    </h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Tell us about this pet's personality, habits, and what makes them special..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Temperament (Select all that apply)
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {temperamentOptions.map((trait) => (
                                                <label
                                                    key={trait}
                                                    className="flex items-center space-x-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.temperament.includes(
                                                            trait
                                                        )}
                                                        onChange={() =>
                                                            handleTemperamentToggle(trait)
                                                        }
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {trait}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={formData.vaccinated}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        vaccinated: e.target.checked,
                                                    })
                                                }
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                Vaccinated
                                            </span>
                                        </label>

                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={formData.neutered}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        neutered: e.target.checked,
                                                    })
                                                }
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                Spayed/Neutered
                                            </span>
                                        </label>

                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={formData.microchipped}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        microchipped: e.target.checked,
                                                    })
                                                }
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                Microchipped
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Health Status
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.healthStatus}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    healthStatus: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Any health conditions, medications, or special care requirements..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Special Needs
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.specialNeeds}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    specialNeeds: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Any special needs or requirements..."
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                                        >
                                            ← Previous
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                        >
                                            Next Step →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Location & Images */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Location & Photos
                                    </h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    city: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., San Francisco"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.state}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        state: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="e.g., CA"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ZIP Code *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.zipCode}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        zipCode: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="e.g., 94102"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Adoption Fee ($)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.adoptionFee}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    adoptionFee: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., 150 (Leave blank if free)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pet Photos *
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                        <span>Upload photos</span>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 10MB each
                                                </p>
                                                {formData.images.length > 0 && (
                                                    <p className="text-sm text-green-600 font-medium mt-2">
                                                        {formData.images.length} file(s) selected
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h3 className="text-sm font-semibold text-blue-900 mb-2">
                                            📸 Photo Tips
                                        </h3>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• Use good lighting and clear focus</li>
                                            <li>• Show different angles of your pet</li>
                                            <li>• Include close-ups of their face</li>
                                            <li>• Show them in natural, happy moments</li>
                                        </ul>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                                        >
                                            ← Previous
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Submitting..." : "List Pet for Adoption"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
