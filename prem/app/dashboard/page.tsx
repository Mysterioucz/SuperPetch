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
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-3xl">🐾</span>
                            <span className="text-2xl font-bold text-blue-600">
                                PetPlatform
                            </span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">
                                Welcome, {user?.name || "User"}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600">
                        {user?.userType === "adopter"
                            ? "Find your perfect pet companion today"
                            : user?.userType === "breeder"
                            ? "Manage your pet listings and connect with adopters"
                            : "Discover, list, and adopt pets"}
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">My Pets</p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🐕</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Favorites</p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">❤️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Messages</p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💬</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/adopt"
                            className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition"
                        >
                            <span className="text-4xl mb-3">🔍</span>
                            <span className="font-semibold text-gray-900">
                                Browse Pets
                            </span>
                            <span className="text-sm text-gray-500 text-center mt-1">
                                Find your perfect match
                            </span>
                        </Link>

                        <Link
                            href="/list-pet"
                            className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition"
                        >
                            <span className="text-4xl mb-3">➕</span>
                            <span className="font-semibold text-gray-900">
                                List a Pet
                            </span>
                            <span className="text-sm text-gray-500 text-center mt-1">
                                Help a pet find a home
                            </span>
                        </Link>

                        <Link
                            href="/marketplace"
                            className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition"
                        >
                            <span className="text-4xl mb-3">🛒</span>
                            <span className="font-semibold text-gray-900">
                                Marketplace
                            </span>
                            <span className="text-sm text-gray-500 text-center mt-1">
                                Pet supplies & services
                            </span>
                        </Link>

                        <Link
                            href="/dashboard/profile"
                            className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition"
                        >
                            <span className="text-4xl mb-3">👤</span>
                            <span className="font-semibold text-gray-900">
                                My Profile
                            </span>
                            <span className="text-sm text-gray-500 text-center mt-1">
                                Manage your account
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Recent Activity
                    </h2>
                    <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">📋</span>
                        <p className="text-gray-500 text-lg">
                            No recent activity yet
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Start browsing pets or list your own to see activity here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
