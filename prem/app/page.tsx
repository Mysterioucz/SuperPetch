import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-all">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-xl font-bold tracking-tight text-blue-600">
              PetPlatform
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-blue-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:shadow-blue-200 hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#dbeafe,transparent)]"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                Now available in your city
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl text-balance">
                Find Your Perfect <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Pet Match
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-slate-600 md:text-xl text-pretty">
                The AI-powered platform connecting loving families with pets in
                need. Swipe, match, and start your adoption journey today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/adopt"
                  className="h-12 px-8 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-200 flex items-center justify-center w-full sm:w-auto"
                >
                  Start Adopting
                </Link>
                <Link
                  href="/list-pet"
                  className="h-12 px-8 rounded-full bg-white text-slate-900 border border-slate-200 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center w-full sm:w-auto"
                >
                  List Your Pet
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 border-y border-slate-100 bg-white/50 py-12 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-bold text-slate-900">10K+</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Adoptions
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-bold text-slate-900">5K+</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Active Users
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-bold text-slate-900">500+</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Breeders
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-bold text-slate-900">99%</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Success Rate
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Why Choose PetPlatform?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We combine advanced technology with compassionate care to ensure
                the best outcomes for pets and people.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  🤖
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  AI-Powered Matching
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Our intelligent algorithm analyzes lifestyle, experience, and
                  preferences to recommend the perfect pet matches for your
                  family.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-green-200 hover:shadow-xl hover:shadow-green-50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  ✅
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Verified Profiles
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Every pet and breeder undergoes strict verification. Our trust
                  scores ensure safe, reliable, and transparent adoptions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  💬
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Real-Time Chat
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Connect instantly with pet owners. Share photos, ask
                  questions, and build trust securely before meeting in person.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-yellow-200 hover:shadow-xl hover:shadow-yellow-50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-2xl text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                  🏥
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Health Records
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Access complete medical history, vaccination records, and
                  genetic information to make informed decisions about your new
                  pet.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-red-200 hover:shadow-xl hover:shadow-red-50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  🛡️
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Fraud Protection
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Our advanced fraud detection system monitors activity 24/7 to
                  keep the community safe from scams and fake listings.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  🏪
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Pet Services
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Find top-rated veterinarians, groomers, trainers, and boarding
                  services all in one convenient marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
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
                  Sign up and tell us about your lifestyle, home environment,
                  and what you're looking for in a pet.
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
                  Browse AI-curated matches or search manually. Connect with
                  owners through secure chat.
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
                  Complete the adoption process securely and welcome your new
                  family member home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-16 text-center shadow-2xl sm:px-16 md:py-24">
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500 opacity-50 blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to meet your new best friend?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-blue-100">
                  Join thousands of happy families who have found their perfect
                  match on PetPlatform.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link
                    href="/register"
                    className="h-12 px-8 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center w-full sm:w-auto"
                  >
                    Get Started Now
                  </Link>
                  <Link
                    href="/about"
                    className="h-12 px-8 rounded-full bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center w-full sm:w-auto"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐾</span>
                <span className="text-lg font-bold text-slate-900">
                  PetPlatform
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Making pet adoption simple, safe, and joyful for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/adopt" className="hover:text-blue-600">
                    Browse Pets
                  </Link>
                </li>
                <li>
                  <Link href="/list-pet" className="hover:text-blue-600">
                    List a Pet
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-blue-600">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/breeding" className="hover:text-blue-600">
                    Breeding
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/privacy" className="hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-blue-600">
                    Safety Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} PetPlatform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
