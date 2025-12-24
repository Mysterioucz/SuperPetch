import Link from "next/link";

export default function SafetyContent() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
        Safety Guidelines
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Your safety is our top priority. Read our guidelines for safe adoptions
        and interactions.
      </p>
      <div className="text-left bg-white p-8 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Tips for Safe Adoptions</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          <li>Always meet in a public place for the first time.</li>
          <li>Bring a friend or family member with you.</li>
          <li>Ask for veterinary records and history.</li>
          <li>
            Trust your instincts - if something feels off, it probably is.
          </li>
          <li>Use our secure chat and payment systems.</li>
        </ul>
      </div>
      <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
        &larr; Back to Home
      </Link>
    </div>
  );
}
