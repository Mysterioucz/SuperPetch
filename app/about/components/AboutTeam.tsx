import React from "react";

export default function AboutTeam() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-5xl text-white">👨‍💼</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">John Smith</h3>
          <p className="text-pink-600 mb-2">CEO & Founder</p>
          <p className="text-gray-600 text-sm">
            Passionate about animal welfare and technology innovation
          </p>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-5xl text-white">👩‍💻</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Sarah Johnson
          </h3>
          <p className="text-pink-600 mb-2">CTO</p>
          <p className="text-gray-600 text-sm">
            Building scalable solutions to connect pets with families
          </p>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-5xl text-white">👨‍🏫</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Dr. Mike Chen
          </h3>
          <p className="text-pink-600 mb-2">Head of Pet Welfare</p>
          <p className="text-gray-600 text-sm">
            Veterinarian ensuring best practices in pet care
          </p>
        </div>
      </div>
    </div>
  );
}
