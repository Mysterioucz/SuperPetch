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
  );
}
