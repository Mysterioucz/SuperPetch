interface User {
  id: string;
  email: string;
  name: string;
  userType: string;
}

interface DashboardWelcomeProps {
  user: User | null;
}

export default function DashboardWelcome({ user }: DashboardWelcomeProps) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Welcome back, {user?.name?.split(" ")[0]}! 👋
      </h1>
      <p className="mt-2 text-slate-600">
        {user?.userType === "adopter"
          ? "Ready to find your new best friend today?"
          : user?.userType === "breeder"
          ? "Manage your listings and connect with potential families."
          : "Discover, list, and adopt pets in your area."}
      </p>
    </div>
  );
}
