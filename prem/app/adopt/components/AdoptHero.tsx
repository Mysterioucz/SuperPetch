import React from "react";

export default function AdoptHero() {
  return (
    <section className="relative overflow-hidden bg-blue-600 py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 h-full w-full bg-blue-600 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#60a5fa,transparent)] opacity-40"></div>
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Perfect Companion
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
          Browse through our collection of adorable pets waiting for a loving
          home. Your new best friend is just a click away.
        </p>
      </div>
    </section>
  );
}
