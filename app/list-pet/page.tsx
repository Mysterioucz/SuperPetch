"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ListPetProgress from "./components/ListPetProgress";
import ListPetStep1 from "./components/ListPetStep1";
import ListPetStep2 from "./components/ListPetStep2";
import ListPetStep3 from "./components/ListPetStep3";

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
    city: "",
    state: "",
    zipCode: "",
    adoptionFee: "",
    images: [] as File[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PET_SERVICE_URL}/api/v1/pets`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataToSend,
        }
      );

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

          <ListPetProgress step={step} />

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <ListPetStep1
                  formData={formData}
                  setFormData={setFormData}
                  nextStep={nextStep}
                />
              )}

              {step === 2 && (
                <ListPetStep2
                  formData={formData}
                  setFormData={setFormData}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              )}

              {step === 3 && (
                <ListPetStep3
                  formData={formData}
                  setFormData={setFormData}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
