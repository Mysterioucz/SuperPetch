"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "./components/ProfileSkeleton";
import ProfileCard from "./components/ProfileCard";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      console.error("Error parsing user data", e);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <ProfileCard user={user} onLogout={handleLogout} />
    </div>
  );
}
