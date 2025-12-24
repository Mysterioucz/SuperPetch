"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-xl font-bold tracking-tight text-blue-600">
              PetPlatform
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link
            href="/#features"
            className="hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-blue-600 transition-colors"
          >
            How It Works
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:shadow-blue-200 hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-700 transition-all"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
