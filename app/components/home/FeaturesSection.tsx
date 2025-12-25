export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Paw Home?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We combine advanced technology with compassionate care to ensure the
            best outcomes for pets and people.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-pink-200 hover:shadow-xl hover:shadow-pink-50">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl text-pink-600 group-hover:bg-pink-200 group-hover:text-pink-700 transition-colors">
              🤖
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              AI-Powered Matching
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Our intelligent algorithm analyzes lifestyle, experience, and
              preferences to recommend the perfect pet matches for your family.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-green-200 hover:shadow-xl hover:shadow-green-50">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl text-green-600 group-hover:bg-green-200 group-hover:text-green-700 transition-colors">
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
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl text-purple-600 group-hover:bg-purple-200 group-hover:text-purple-700 transition-colors">
              💬
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Real-Time Chat
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Connect instantly with pet owners. Share photos, ask questions,
              and build trust securely before meeting in person.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-yellow-200 hover:shadow-xl hover:shadow-yellow-50">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-2xl text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700 transition-colors">
              🏥
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Health Records
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Access complete medical history, vaccination records, and genetic
              information to make informed decisions about your new pet.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-red-200 hover:shadow-xl hover:shadow-red-50">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-600 group-hover:bg-red-200 group-hover:text-red-700 transition-colors">
              🛡️
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Fraud Protection
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Our advanced fraud detection system monitors activity 24/7 to keep
              the community safe from scams and fake listings.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-pink-200 hover:shadow-xl hover:shadow-pink-50">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl text-pink-600 group-hover:bg-pink-200 group-hover:text-pink-700 transition-colors">
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
  );
}
