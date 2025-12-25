import { useState, useEffect } from "react";
import Image from "next/image";
import Input from "../../components/ui/Input";

interface ListPetStep3Props {
  formData: any;
  setFormData: (data: any) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function ListPetStep3({
  formData,
  setFormData,
  prevStep,
  handleSubmit,
  loading,
}: ListPetStep3Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP Code is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // Create previews for existing files
    const newPreviews = formData.images.map((file: File) =>
      URL.createObjectURL(file)
    );
    setPreviews(newPreviews);

    // Cleanup
    return () => {
      newPreviews.forEach((url: string) => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...newFiles],
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Location & Photos
      </h2>

      <div>
        <Input
          label="City *"
          type="text"
          required
          value={formData.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              city: e.target.value,
            })
          }
          placeholder="e.g., San Francisco"
          error={errors.city}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="State *"
            type="text"
            required
            value={formData.state}
            onChange={(e) =>
              setFormData({
                ...formData,
                state: e.target.value,
              })
            }
            placeholder="e.g., CA"
            error={errors.state}
          />
        </div>

        <div>
          <Input
            label="ZIP Code *"
            type="text"
            required
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                zipCode: e.target.value,
              })
            }
            placeholder="e.g., 94102"
            error={errors.zipCode}
          />
        </div>
      </div>

      <div>
        <Input
          label="Adoption Fee ($)"
          type="number"
          min={0}
          value={formData.adoptionFee}
          onChange={(e) =>
            setFormData({
              ...formData,
              adoptionFee: e.target.value,
            })
          }
          placeholder="e.g., 150 (Leave blank if free)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pet Photos *
          {errors.images && (
            <span className="text-red-500 text-sm ml-2 font-normal">
              {errors.images}
            </span>
          )}
        </label>

        {/* Image Previews */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {previews.map((src, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={src}
                alt={`Pet preview ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-pink-500 transition">
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
            <div className="flex text-sm text-gray-600 justify-center">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500">
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
          </div>
        </div>
      </div>

      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-pink-900 mb-2">
          📸 Photo Tips
        </h3>
        <ul className="text-sm text-pink-800 space-y-1">
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
          onClick={handleFormSubmit}
          disabled={loading}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold disabled:bg-pink-300 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "List Pet for Adoption"}
        </button>
      </div>
    </div>
  );
}
