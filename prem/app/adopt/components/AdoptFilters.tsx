import React from "react";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";

export default function AdoptFilters({ filters, setFilters }: any) {
  return (
    <section className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Select
              label="Species"
              value={filters.species}
              onChange={(e) =>
                setFilters({ ...filters, species: e.target.value })
              }
              options={[
                { value: "all", label: "All" },
                { value: "dog", label: "Dog" },
                { value: "cat", label: "Cat" },
                { value: "bird", label: "Bird" },
                { value: "rabbit", label: "Rabbit" },
              ]}
            />
          </div>
          <div>
            <Select
              label="Size"
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
              options={[
                { value: "all", label: "All" },
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
              onChange={(e) => setFilters({ ...filters, age: e.target.value })}
              options={[
                { value: "all", label: "All" },
                { value: "baby", label: "Baby" },
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilters({ ...filters, location: e.target.value })
              }
              placeholder="Enter location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
