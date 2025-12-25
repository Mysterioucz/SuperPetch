import Link from "next/link";

export default function DashboardQuickActions() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold leading-6 text-slate-900">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/adopt"
          className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-pink-200"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-2xl text-pink-600 group-hover:bg-pink-200 group-hover:text-pink-700 transition-colors">
            🔍
          </div>
          <h3 className="font-semibold text-slate-900">Browse Pets</h3>
          <p className="mt-1 text-sm text-slate-500">Find your perfect match</p>
        </Link>

        <Link
          href="/list-pet"
          className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-pink-200"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-2xl text-purple-600 group-hover:bg-purple-200 group-hover:text-purple-700 transition-colors">
            ➕
          </div>
          <h3 className="font-semibold text-slate-900">List a Pet</h3>
          <p className="mt-1 text-sm text-slate-500">Help a pet find a home</p>
        </Link>

        <Link
          href="/marketplace"
          className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-pink-200"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl text-orange-600 group-hover:bg-orange-200 group-hover:text-orange-700 transition-colors">
            🛒
          </div>
          <h3 className="font-semibold text-slate-900">Marketplace</h3>
          <p className="mt-1 text-sm text-slate-500">
            Shop supplies & services
          </p>
        </Link>

        <Link
          href="/profile"
          className="group relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-pink-200"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-2xl text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-700 transition-colors">
            👤
          </div>
          <h3 className="font-semibold text-slate-900">My Profile</h3>
          <p className="mt-1 text-sm text-slate-500">Manage your account</p>
        </Link>
      </div>
    </div>
  );
}
