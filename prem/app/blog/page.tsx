import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
          PetPlatform Blog
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Tips, stories, and news from the PetPlatform community. Coming soon!
        </p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
