interface ListPetStep2Props {
  formData: any;
  setFormData: (data: any) => void;
  prevStep: () => void;
  nextStep: () => void;
}

export default function ListPetStep2({
  formData,
  setFormData,
  prevStep,
  nextStep,
}: ListPetStep2Props) {
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
        ? formData.temperament.filter((t: string) => t !== trait)
        : [...formData.temperament, trait],
    });
  };

  return (
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
                checked={formData.temperament.includes(trait)}
                onChange={() => handleTemperamentToggle(trait)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{trait}</span>
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
          <span className="text-sm font-medium text-gray-700">Vaccinated</span>
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
  );
}
