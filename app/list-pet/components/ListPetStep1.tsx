import { useState } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

interface ListPetStep1Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

export default function ListPetStep1({
  formData,
  setFormData,
  nextStep,
}: ListPetStep1Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.species) newErrors.species = "Species is required";
    if (!formData.breed) newErrors.breed = "Breed is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.weight) newErrors.weight = "Weight is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Basic Information
      </h2>

      <div>
        <Input
          label="Pet Name *"
          type="text"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          placeholder="e.g., Max"
          error={errors.name}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            label="Species *"
            required
            value={formData.species}
            onChange={(e) =>
              setFormData({
                ...formData,
                species: e.target.value,
              })
            }
            options={[
              { value: "dog", label: "Dog" },
              { value: "cat", label: "Cat" },
              { value: "bird", label: "Bird" },
              { value: "rabbit", label: "Rabbit" },
              { value: "other", label: "Other" },
            ]}
            error={errors.species}
          />
        </div>

        <div>
          <Input
            label="Breed *"
            type="text"
            required
            value={formData.breed}
            onChange={(e) =>
              setFormData({
                ...formData,
                breed: e.target.value,
              })
            }
            placeholder="e.g., Golden Retriever"
            error={errors.breed}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Age (years) *"
            type="number"
            required
            min={0}
            max={30}
            value={formData.age}
            onChange={(e) =>
              setFormData({
                ...formData,
                age: e.target.value,
              })
            }
            placeholder="e.g., 3"
            error={errors.age}
          />
        </div>

        <div>
          <Select
            label="Gender *"
            required
            value={formData.gender}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value,
              })
            }
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            error={errors.gender}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            label="Size *"
            required
            value={formData.size}
            onChange={(e) =>
              setFormData({
                ...formData,
                size: e.target.value,
              })
            }
            options={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
            error={errors.size}
          />
        </div>

        <div>
          <Input
            label="Weight (lbs)"
            type="number"
            min={0}
            value={formData.weight}
            onChange={(e) =>
              setFormData({
                ...formData,
                weight: e.target.value,
              })
            }
            placeholder="e.g., 50"
            error={errors.weight}
          />
        </div>
      </div>

      <div>
        <Input
          label="Color"
          type="text"
          value={formData.color}
          onChange={(e) =>
            setFormData({
              ...formData,
              color: e.target.value,
            })
          }
          placeholder="e.g., Brown and White"
          error={errors.color}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
