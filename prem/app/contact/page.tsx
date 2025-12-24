import Link from "next/link";

export default function ContactPage() {
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
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and
                        we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Info Cards */}
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📧</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Email Us
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Our team is here to help
                        </p>
                        <a
                            href="mailto:support@petplatform.com"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            support@petplatform.com
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📞</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Call Us
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Mon-Fri 9am to 6pm EST
                        </p>
                        <a
                            href="tel:+15551234567"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            (555) 123-4567
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📍</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Visit Us
                        </h3>
                        <p className="text-gray-600">
                            123 Pet Street<br />
                            Animal City, PC 12345<br />
                            United States
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Send us a Message
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Phone Number (Optional)
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="(555) 123-4567"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="adoption">Adoption Questions</option>
                                    <option value="listing">Listing Help</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="partnership">Partnership Opportunities</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                    placeholder="Tell us how we can help..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white mb-8">
                            <h2 className="text-3xl font-bold mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        How do I adopt a pet?
                                    </h3>
                                    <p className="text-blue-100">
                                        Browse available pets, create an account, and contact the
                                        listing owner directly through our platform. We facilitate
                                        safe communication between adopters and owners.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        Is there a fee to list a pet?
                                    </h3>
                                    <p className="text-blue-100">
                                        Basic listings are free! We also offer premium features
                                        for enhanced visibility and additional tools.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        How do you verify listings?
                                    </h3>
                                    <p className="text-blue-100">
                                        All listings undergo verification to ensure authenticity.
                                        We check user credentials and require documentation for
                                        breeders and shelters.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        What payment methods do you accept?
                                    </h3>
                                    <p className="text-blue-100">
                                        We support all major credit cards, PayPal, and bank
                                        transfers for marketplace transactions and premium services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Connect With Us
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                                >
                                    <span className="text-2xl mr-2">📘</span>
                                    <span className="font-semibold text-gray-700">Facebook</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                                >
                                    <span className="text-2xl mr-2">🐦</span>
                                    <span className="font-semibold text-gray-700">Twitter</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                                >
                                    <span className="text-2xl mr-2">📸</span>
                                    <span className="font-semibold text-gray-700">Instagram</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                                >
                                    <span className="text-2xl mr-2">💼</span>
                                    <span className="font-semibold text-gray-700">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Business Hours
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="text-center">
                            <p className="font-semibold text-gray-900 mb-1">Monday - Friday</p>
                            <p className="text-gray-600">9:00 AM - 6:00 PM EST</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-gray-900 mb-1">Saturday</p>
                            <p className="text-gray-600">10:00 AM - 4:00 PM EST</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-gray-900 mb-1">Sunday</p>
                            <p className="text-gray-600">Closed</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-gray-900 mb-1">Holidays</p>
                            <p className="text-gray-600">Closed</p>
                        </div>
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
