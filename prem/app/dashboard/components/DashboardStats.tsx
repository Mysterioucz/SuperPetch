export default function DashboardStats() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">My Pets</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              0
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600">
            🐕
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Favorites</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              0
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl text-pink-600">
            ❤️
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Messages</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              0
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl text-green-600">
            💬
          </div>
        </div>
      </div>
    </div>
  );
}
