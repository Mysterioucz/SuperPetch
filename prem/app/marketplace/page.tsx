import Link from "next/link";

export default function MarketplacePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-3xl">🐾</span>
                            <span className="text-2xl font-bold text-blue-600">
                                PetPlatform
                            </span>
                        </Link>
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/dashboard"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/login"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Pet Marketplace
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything your pet needs in one place. From food and toys to
                        grooming services and healthcare products.
                    </p>
                </div>

                {/* Search and Filter Bar */}
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

                {/* Categories */}
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

                {/* Featured Products */}
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
                                <div className="bg-gradient-to-br from-blue-200 to-blue-300 h-48 flex items-center justify-center">
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
                                        <span className="text-2xl font-bold text-blue-600">
                                            ${(19.99 + item * 5).toFixed(2)}
                                        </span>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Section */}
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
                            <p className="text-2xl font-bold text-blue-600 mb-4">
                                From $35
                            </p>
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
                            <p className="text-2xl font-bold text-blue-600 mb-4">
                                From $50
                            </p>
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
                            <p className="text-2xl font-bold text-blue-600 mb-4">
                                From $75
                            </p>
                            <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Why Shop With Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl mb-3">🚚</div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Free Shipping
                            </h3>
                            <p className="text-gray-600 text-sm">
                                On orders over $50
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Quality Guaranteed
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Premium products only
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-3">🔒</div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Secure Payment
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Safe & encrypted
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-3">💬</div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                24/7 Support
                            </h3>
                            <p className="text-gray-600 text-sm">
                                We're here to help
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Start Shopping Today
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of happy pet owners who trust our marketplace
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition text-lg font-semibold shadow-lg"
                        >
                            Create Account
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition text-lg font-semibold"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2025 PetPlatform. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
