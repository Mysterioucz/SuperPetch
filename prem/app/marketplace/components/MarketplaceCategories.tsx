export default function MarketplaceCategories() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">🍖</div>
          <p className="font-semibold text-gray-900">Food & Treats</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">🎾</div>
          <p className="font-semibold text-gray-900">Toys</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">✂️</div>
          <p className="font-semibold text-gray-900">Grooming</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">💊</div>
          <p className="font-semibold text-gray-900">Healthcare</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">🦴</div>
          <p className="font-semibold text-gray-900">Accessories</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">🏥</div>
          <p className="font-semibold text-gray-900">Services</p>
        </div>
      </div>
    </div>
  );
}
