import Link from "next/link";

export default function BlogContent() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
        Paw Home Blog
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Tips, stories, and news from the Paw Home community. Coming soon!
      </p>
      <Link href="/" className="text-pink-600 hover:text-pink-500 font-medium">
        &larr; Back to Home
      </Link>
    </div>
  );
}
