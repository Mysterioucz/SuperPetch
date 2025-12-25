import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#dbeafe,transparent)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-sm font-medium text-pink-800 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-pink-600 mr-2"></span>
            Now available in your city
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl text-balance">
            Find Your Perfect <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-pink-600 to-pink-600 bg-clip-text text-transparent">
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
              className="h-12 px-8 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-500 transition-all hover:shadow-lg hover:shadow-pink-200 flex items-center justify-center w-full sm:w-auto"
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
  );
}
