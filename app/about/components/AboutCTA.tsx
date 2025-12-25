import React from "react";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Join Our Mission
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Whether you're looking to adopt, list a pet, or partner with us, we'd
        love to have you as part of the Paw Home community.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/register"
          className="px-8 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition text-lg font-semibold shadow-lg"
        >
          Get Started Today
        </Link>
        <Link
          href="/contact"
          className="px-8 py-4 bg-white text-pink-600 border-2 border-pink-600 rounded-full hover:bg-pink-50 transition text-lg font-semibold"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
