import Link from "next/link";

export default function MarketplaceCTA() {
  return (
    <div className="text-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
      <h2 className="text-3xl font-bold mb-4">Start Shopping Today</h2>
      <p className="text-xl mb-8 text-blue-100">
        Join thousands of happy pet owners who trust our marketplace
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/register"
          className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition text-lg font-semibold shadow-lg"
        >
          Create Account
        </Link>
        <Link
          href="/login"
          className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition text-lg font-semibold"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
