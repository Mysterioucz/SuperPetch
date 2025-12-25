export default function MarketplaceFeatured() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="bg-gradient-to-br from-pink-200 to-pink-300 h-48 flex items-center justify-center">
              <span className="text-6xl">🎁</span>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Premium Pet Product {item}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                High-quality product for your beloved pet
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-pink-600">
                  ${(19.99 + item * 5).toFixed(2)}
                </span>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-sm font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
