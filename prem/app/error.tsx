"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <span className="text-6xl mb-4">⚠️</span>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Something went wrong!
      </h2>
      <p className="mt-4 text-lg text-slate-600">
        We apologize for the inconvenience. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
