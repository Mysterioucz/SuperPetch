import Link from "next/link";

interface User {
  name: string;
  email: string;
  userType: string;
  createdAt?: string;
}

interface ProfileCardProps {
  user: User | null;
  onLogout: () => void;
}

export default function ProfileCard({ user, onLogout }: ProfileCardProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-slate-900">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Personal details and account information.
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign out
          </button>
        </div>
        <div className="border-t border-slate-200">
          <dl>
            <div className="bg-slate-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-slate-500">Full name</dt>
              <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                {user?.name || "N/A"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-slate-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                {user?.email || "N/A"}
              </dd>
            </div>
            <div className="bg-slate-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-slate-500">
                Account type
              </dt>
              <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 capitalize">
                {user?.userType || "User"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-slate-500">
                Member since
              </dt>
              <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/dashboard"
          className="text-pink-600 hover:text-pink-500 font-medium"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
