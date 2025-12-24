import Link from "next/link";

export default function AboutPage() {
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
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        About PetPlatform
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're on a mission to connect loving families with pets in need of homes,
                        making pet adoption simple, safe, and joyful.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                Every pet deserves a loving home, and every family deserves the joy
                                that comes with pet companionship. We believe that finding your
                                perfect pet match should be easy, transparent, and safe.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                PetPlatform was founded to bridge the gap between pets in need and
                                families ready to adopt, using technology to make the process
                                seamless and trustworthy for everyone involved.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-12 text-center">
                            <div className="text-6xl mb-4">🏠</div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                            <p className="text-gray-700 text-lg">Pets Found Homes</p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">❤️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Compassion First
                            </h3>
                            <p className="text-gray-600">
                                We prioritize the wellbeing of every pet and ensure they find
                                loving, responsible homes.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Safety & Trust
                            </h3>
                            <p className="text-gray-600">
                                We verify all listings and users to create a secure environment
                                for pet adoption.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Community Driven
                            </h3>
                            <p className="text-gray-600">
                                We build strong connections between adopters, breeders, and
                                shelters to support each other.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-12 mb-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                        <div className="space-y-4 text-lg leading-relaxed">
                            <p>
                                PetPlatform was born from a simple observation: finding the right
                                pet shouldn't be complicated. In 2024, our founders noticed how
                                fragmented the pet adoption process was—scattered listings,
                                unreliable information, and limited ways to connect with the right
                                match.
                            </p>
                            <p>
                                We set out to create a centralized platform that brings together
                                shelters, breeders, and families in one trusted space. Using
                                advanced matching algorithms, verified profiles, and secure
                                communication tools, we've made it easier than ever to find your
                                perfect pet companion.
                            </p>
                            <p>
                                Today, PetPlatform serves thousands of users across the country,
                                helping pets find their forever homes every single day. But we're
                                just getting started—our vision is to make pet adoption accessible,
                                transparent, and joyful for everyone, everywhere.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Impact by Numbers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                            <p className="text-gray-600">Successful Adoptions</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
                            <p className="text-gray-600">Active Users</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                            <p className="text-gray-600">Partner Shelters</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                            <p className="text-gray-600">Cities Served</p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-5xl text-white">👨‍💼</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                John Smith
                            </h3>
                            <p className="text-blue-600 mb-2">CEO & Founder</p>
                            <p className="text-gray-600 text-sm">
                                Passionate about animal welfare and technology innovation
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-5xl text-white">👩‍💻</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                Sarah Johnson
                            </h3>
                            <p className="text-blue-600 mb-2">CTO</p>
                            <p className="text-gray-600 text-sm">
                                Building scalable solutions to connect pets with families
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-5xl text-white">👨‍🏫</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                Dr. Mike Chen
                            </h3>
                            <p className="text-blue-600 mb-2">Head of Pet Welfare</p>
                            <p className="text-gray-600 text-sm">
                                Veterinarian ensuring best practices in pet care
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Join Our Mission
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Whether you're looking to adopt, list a pet, or partner with us,
                        we'd love to have you as part of the PetPlatform community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-lg font-semibold shadow-lg"
                        >
                            Get Started Today
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition text-lg font-semibold"
                        >
                            Contact Us
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
