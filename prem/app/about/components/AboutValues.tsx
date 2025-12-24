import React from "react";

export default function AboutValues() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Our Core Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❤️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Compassion First
          </h3>
          <p className="text-gray-600">
            We prioritize the wellbeing of every pet and ensure they find
            loving, responsible homes.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Safety & Trust
          </h3>
          <p className="text-gray-600">
            We verify all listings and users to create a secure environment for
            pet adoption.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🤝</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Community Driven
          </h3>
          <p className="text-gray-600">
            We build strong connections between adopters, breeders, and shelters
            to support each other.
          </p>
        </div>
      </div>
    </div>
  );
}
