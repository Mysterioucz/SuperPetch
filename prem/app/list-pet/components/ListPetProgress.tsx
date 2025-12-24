interface ListPetProgressProps {
  step: number;
}

export default function ListPetProgress({ step }: ListPetProgressProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center flex-1">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
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
            step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
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
          step >= 3 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
        }`}
      >
        3
      </div>
    </div>
  );
}
