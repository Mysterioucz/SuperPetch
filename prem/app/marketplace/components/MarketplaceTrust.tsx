export default function MarketplaceTrust() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Why Shop With Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
          <p className="text-gray-600 text-sm">On orders over $50</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
          <p className="text-gray-600 text-sm">Premium products only</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold text-gray-900 mb-2">Secure Payment</h3>
          <p className="text-gray-600 text-sm">Safe & encrypted</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
          <p className="text-gray-600 text-sm">We're here to help</p>
        </div>
      </div>
    </div>
  );
}
