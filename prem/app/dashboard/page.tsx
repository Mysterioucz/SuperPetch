"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  userType: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Get user data from token or API
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-3xl">🐾</span>
              <span className="text-xl font-bold tracking-tight text-blue-600">
                PetPlatform
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-900">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-slate-500 capitalize">
                  {user?.userType || "Member"}
                </span>
              </div>
              <Link
                href="/profile"
                className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 hover:ring-2 hover:ring-blue-400 transition-all"
              >
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 hover:text-red-600 transition-all"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="mt-2 text-slate-600">
            {user?.userType === "adopter"
              ? "Ready to find your new best friend today?"
              : user?.userType === "breeder"
              ? "Manage your listings and connect with potential families."
              : "Discover, list, and adopt pets in your area."}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">My Pets</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  0
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600">
                🐕
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Favorites</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  0
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl text-pink-600">
                ❤️
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Messages</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  0
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl text-green-600">
                💬
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold leading-6 text-slate-900">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/adopt"
              className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-blue-200"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                🔍
              </div>
              <h3 className="font-semibold text-slate-900">Browse Pets</h3>
              <p className="mt-1 text-sm text-slate-500">
                Find your perfect match
              </p>
            </Link>

            <Link
              href="/list-pet"
              className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-blue-200"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                ➕
              </div>
              <h3 className="font-semibold text-slate-900">List a Pet</h3>
              <p className="mt-1 text-sm text-slate-500">
                Help a pet find a home
              </p>
            </Link>

            <Link
              href="/marketplace"
              className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-blue-200"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                🛒
              </div>
              <h3 className="font-semibold text-slate-900">Marketplace</h3>
              <p className="mt-1 text-sm text-slate-500">
                Shop supplies & services
              </p>
            </Link>

            <Link
              href="/profile"
              className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-blue-200"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-2xl text-slate-600 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                👤
              </div>
              <h3 className="font-semibold text-slate-900">My Profile</h3>
              <p className="mt-1 text-sm text-slate-500">Manage your account</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-semibold leading-6 text-slate-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-slate-50 p-4">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                No activity yet
              </h3>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Start browsing pets, listing your own, or exploring the
                marketplace to see your activity here.
              </p>
              <Link
                href="/adopt"
                className="mt-6 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Browse Pets
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
