export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Your journey to finding a new best friend is simple and secure.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
              1
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Create Profile
            </h3>
            <p className="text-slate-600">
              Sign up and tell us about your lifestyle, home environment, and
              what you're looking for in a pet.
            </p>
          </div>
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
              2
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Get Matched
            </h3>
            <p className="text-slate-600">
              Browse AI-curated matches or search manually. Connect with owners
              through secure chat.
            </p>
          </div>
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
              3
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Adopt & Love
            </h3>
            <p className="text-slate-600">
              Complete the adoption process securely and welcome your new family
              member home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
