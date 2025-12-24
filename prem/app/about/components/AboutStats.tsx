import React from "react";

export default function AboutStats() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Impact by Numbers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
          <p className="text-gray-600">Successful Adoptions</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
          <p className="text-gray-600">Partner Shelters</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
          <p className="text-gray-600">Cities Served</p>
        </div>
      </div>
    </div>
  );
}
