import Link from "next/link";

export default function DashboardRecentActivity() {
  return (
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
            Start browsing pets, listing your own, or exploring the marketplace
            to see your activity here.
          </p>
          <Link
            href="/adopt"
            className="mt-6 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            Browse Pets
          </Link>
        </div>
      </div>
    </div>
  );
}
