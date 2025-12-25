import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

export default function MarketplaceSearch() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input type="text" placeholder="Search products..." />
        <Select
          options={[
            { value: "all", label: "All Categories" },
            { value: "food", label: "Food & Treats" },
            { value: "toys", label: "Toys" },
            { value: "grooming", label: "Grooming" },
            { value: "healthcare", label: "Healthcare" },
            { value: "accessories", label: "Accessories" },
            { value: "services", label: "Services" },
          ]}
        />
        <Select
          options={[
            { value: "all", label: "Pet Type" },
            { value: "dog", label: "Dogs" },
            { value: "cat", label: "Cats" },
            { value: "bird", label: "Birds" },
            { value: "fish", label: "Fish" },
            { value: "other", label: "Other" },
          ]}
        />
        <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold h-[42px] mt-[1px]">
          Search
        </button>
      </div>
    </div>
  );
}
