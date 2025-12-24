export default function MarketplaceSearch() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Categories</option>
          <option value="food">Food & Treats</option>
          <option value="toys">Toys</option>
          <option value="grooming">Grooming</option>
          <option value="healthcare">Healthcare</option>
          <option value="accessories">Accessories</option>
          <option value="services">Services</option>
        </select>
        <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Pet Type</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="bird">Birds</option>
          <option value="fish">Fish</option>
          <option value="other">Other</option>
        </select>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
          Search
        </button>
      </div>
    </div>
  );
}
