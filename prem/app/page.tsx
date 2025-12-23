import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-4xl">🐾</span>
                        <span className="text-2xl font-bold text-blue-600">
                            PetPlatform
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link
                            href="#features"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#about"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            About
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-blue-600 hover:text-blue-700 transition"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
                        >
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Find Your Perfect
                    <span className="text-blue-600"> Pet Match</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    AI-powered platform connecting pets with loving homes.
                    Swipe, match, and adopt your new best friend.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/adopt"
                        className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-lg font-semibold shadow-lg"
                    >
                        Start Adopting
                    </Link>
                    <Link
                        href="/list-pet"
                        className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition text-lg font-semibold"
                    >
                        List Your Pet
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div>
                        <div className="text-4xl font-bold text-blue-600">
                            10K+
                        </div>
                        <div className="text-gray-600 mt-2">
                            Happy Adoptions
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600">
                            5K+
                        </div>
                        <div className="text-gray-600 mt-2">Active Users</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600">
                            500+
                        </div>
                        <div className="text-gray-600 mt-2">
                            Verified Breeders
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600">
                            99%
                        </div>
                        <div className="text-gray-600 mt-2">Success Rate</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                        Why Choose PetPlatform?
                    </h2>
                    <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                        We use advanced AI and matching algorithms to ensure the
                        best fit between pets and families.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 bg-blue-50 rounded-2xl">
                            <div className="text-5xl mb-4">🤖</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                AI-Powered Matching
                            </h3>
                            <p className="text-gray-600">
                                Our intelligent algorithm considers your
                                lifestyle, experience, and preferences to
                                recommend the perfect pet matches.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-green-50 rounded-2xl">
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Verified Profiles
                            </h3>
                            <p className="text-gray-600">
                                Every pet and breeder is thoroughly verified.
                                Trust scores ensure safe and reliable adoptions.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-purple-50 rounded-2xl">
                            <div className="text-5xl mb-4">💬</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Real-Time Chat
                            </h3>
                            <p className="text-gray-600">
                                Connect instantly with pet owners. Share photos,
                                ask questions, and build trust before meeting.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-8 bg-yellow-50 rounded-2xl">
                            <div className="text-5xl mb-4">🏥</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Health Records
                            </h3>
                            <p className="text-gray-600">
                                Access complete medical history, vaccination
                                records, and genetic information for informed
                                decisions.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-8 bg-red-50 rounded-2xl">
                            <div className="text-5xl mb-4">🛡️</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Fraud Protection
                            </h3>
                            <p className="text-gray-600">
                                Advanced fraud detection and reporting system
                                keeps the community safe from scams and fake
                                listings.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-8 bg-indigo-50 rounded-2xl">
                            <div className="text-5xl mb-4">🏪</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Pet Services
                            </h3>
                            <p className="text-gray-600">
                                Find veterinarians, groomers, trainers, and
                                boarding services all in one convenient
                                marketplace.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section
                id="how-it-works"
                className="py-20 bg-gradient-to-b from-white to-blue-50"
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                        Finding your perfect pet companion is as easy as 1-2-3!
                    </p>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            {/* Step 1 */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Create Profile
                                </h3>
                                <p className="text-gray-600">
                                    Sign up and tell us about your lifestyle and
                                    pet preferences
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Swipe & Match
                                </h3>
                                <p className="text-gray-600">
                                    Browse AI-recommended pets and swipe right
                                    on your favorites
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Connect & Chat
                                </h3>
                                <p className="text-gray-600">
                                    When you match, start chatting with the pet
                                    owner instantly
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                    4
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Meet & Adopt
                                </h3>
                                <p className="text-gray-600">
                                    Arrange a meeting and welcome your new
                                    family member home
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                        What Our Users Say
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="flex mb-4">
                                <span className="text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Found our perfect Golden Retriever in just 2
                                days! The matching algorithm really works. Max
                                is now part of our family."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        Sarah Johnson
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Bangkok, Thailand
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="flex mb-4">
                                <span className="text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4">
                                "As a breeder, this platform helped me find
                                responsible owners for my puppies. The
                                verification system is excellent."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        Michael Chen
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Certified Breeder
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="flex mb-4">
                                <span className="text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Rescued a stray cat through this platform. The
                                whole process was smooth and the support team
                                was amazing!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        Emma Wilson
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Chiang Mai, Thailand
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Find Your Perfect Pet?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
                        Join thousands of happy pet parents who found their
                        companions through PetPlatform
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition text-lg font-semibold shadow-lg"
                    >
                        Get Started Free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-3xl">🐾</span>
                                <span className="text-xl font-bold text-white">
                                    PetPlatform
                                </span>
                            </div>
                            <p className="text-sm">
                                Connecting pets with loving homes through
                                AI-powered matching.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                Platform
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/adopt"
                                        className="hover:text-white transition"
                                    >
                                        Adopt a Pet
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/list-pet"
                                        className="hover:text-white transition"
                                    >
                                        List a Pet
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/marketplace"
                                        className="hover:text-white transition"
                                    >
                                        Pet Services
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/breeding"
                                        className="hover:text-white transition"
                                    >
                                        Breeding
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/about"
                                        className="hover:text-white transition"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-white transition"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/careers"
                                        className="hover:text-white transition"
                                    >
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="hover:text-white transition"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">
                                Legal
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="hover:text-white transition"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="hover:text-white transition"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/safety"
                                        className="hover:text-white transition"
                                    >
                                        Safety Guidelines
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                        <p>
                            &copy; 2024 PetPlatform. All rights reserved. Built
                            with ❤️ for pets.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
