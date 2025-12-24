import React from "react";

export default function AboutMission() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Every pet deserves a loving home, and every family deserves the joy
            that comes with pet companionship. We believe that finding your
            perfect pet match should be easy, transparent, and safe.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            PetPlatform was founded to bridge the gap between pets in need and
            families ready to adopt, using technology to make the process
            seamless and trustworthy for everyone involved.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🏠</div>
          <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
          <p className="text-gray-700 text-lg">Pets Found Homes</p>
        </div>
      </div>
    </div>
  );
}
