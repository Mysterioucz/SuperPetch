import React from "react";

export default function AboutStory() {
  return (
    <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl shadow-xl p-12 mb-12 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            Paw Home was born from a simple observation: finding the right
            pet shouldn't be complicated. In 2024, our founders noticed how
            fragmented the pet adoption process was—scattered listings,
            unreliable information, and limited ways to connect with the right
            match.
          </p>
          <p>
            We set out to create a centralized platform that brings together
            shelters, breeders, and families in one trusted space. Using
            advanced matching algorithms, verified profiles, and secure
            communication tools, we've made it easier than ever to find your
            perfect pet companion.
          </p>
          <p>
            Today, Paw Home serves thousands of users across the country,
            helping pets find their forever homes every single day. But we're
            just getting started—our vision is to make pet adoption accessible,
            transparent, and joyful for everyone, everywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
