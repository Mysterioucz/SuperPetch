import Link from "next/link";

export default function CTASection() {
  return (
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
  );
}
