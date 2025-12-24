import Link from "next/link";

interface ForgotPasswordSuccessProps {
  email: string;
  onRetry: () => void;
}

export default function ForgotPasswordSuccess({
  email,
  onRetry,
}: ForgotPasswordSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <span className="text-4xl">🐾</span>
            <span className="text-2xl font-bold text-blue-600">
              PetPlatform
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h1>
          <p className="text-gray-600 mb-6">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              onClick={onRetry}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              try again
            </button>
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
