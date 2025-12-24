"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import DashboardWelcome from "./components/DashboardWelcome";
import DashboardStats from "./components/DashboardStats";
import DashboardQuickActions from "./components/DashboardQuickActions";
import DashboardRecentActivity from "./components/DashboardRecentActivity";

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
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <DashboardWelcome user={user} />
        <DashboardStats />
        <DashboardQuickActions />
        <DashboardRecentActivity />
      </main>
    </div>
  );
}
