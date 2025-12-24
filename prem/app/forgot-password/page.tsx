"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // TODO: Implement password reset API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                            <span className="text-4xl">🐾</span>
                            <span className="text-2xl font-bold text-blue-600">
                                PetPlatform
                            </span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">✉️</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Check Your Email
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We've sent password reset instructions to{" "}
                            <strong>{email}</strong>
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            Didn't receive the email? Check your spam folder or{" "}
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                try again
                            </button>
                        </p>
                        <Link
                            href="/login"
                            className="inline-block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                        <span className="text-4xl">🐾</span>
                        <span className="text-2xl font-bold text-blue-600">
                            PetPlatform
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">
                        Reset Your Password
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Enter your email address and we'll send you instructions to reset
                        your password
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="you@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send Reset Instructions"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            Need help?{" "}
                            <Link
                                href="/contact"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
