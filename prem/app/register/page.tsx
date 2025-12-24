"use client";

import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import SocialLogin from "../login/components/SocialLogin";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
          >
            <span className="text-4xl">🐾</span>
            <span className="text-2xl font-bold text-blue-600 tracking-tight">
              PetPlatform
            </span>
          </Link>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Join our community and find your perfect pet match
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200 sm:rounded-2xl sm:px-10 border border-slate-100">
          <RegisterForm />
          <SocialLogin />

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
