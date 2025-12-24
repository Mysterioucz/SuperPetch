export default function MarketplaceServices() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-12 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Pet Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✂️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Grooming Services
          </h3>
          <p className="text-gray-600 mb-4">
            Professional grooming by certified pet stylists
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-4">From $35</p>
          <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Book Now
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏥</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Veterinary Care
          </h3>
          <p className="text-gray-600 mb-4">
            Connect with licensed veterinarians
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-4">From $50</p>
          <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Schedule Visit
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎓</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Training Classes
          </h3>
          <p className="text-gray-600 mb-4">
            Expert training for dogs and cats
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-4">From $75</p>
          <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
