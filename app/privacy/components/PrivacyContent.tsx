import Link from "next/link";

export default function PrivacyContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition"
        >
          <span className="text-3xl">🐾</span>
          <span className="text-xl font-bold text-pink-600">Paw Home</span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mt-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mt-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Paw Home. We respect your privacy and are committed to
            protecting your personal data. This privacy policy will inform you
            about how we look after your personal data when you visit our
            platform and tell you about your privacy rights and how the law
            protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We may collect, use, store and transfer different kinds of personal
            data about you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              <strong>Identity Data:</strong> Name, username, date of birth
            </li>
            <li>
              <strong>Contact Data:</strong> Email address, telephone numbers,
              billing address
            </li>
            <li>
              <strong>Profile Data:</strong> Your interests, preferences,
              feedback, and survey responses
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device
              information
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              platform
            </li>
            <li>
              <strong>Pet Data:</strong> Information about pets you list or
              adopt
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use your personal data for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>To register you as a new user and manage your account</li>
            <li>To facilitate pet adoption and rehoming processes</li>
            <li>To process payments and manage transactions</li>
            <li>To communicate with you about your account and services</li>
            <li>To improve our platform and user experience</li>
            <li>To detect and prevent fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We have implemented appropriate security measures to prevent your
            personal data from being accidentally lost, used, or accessed in an
            unauthorized way. We limit access to your personal data to those
            employees, agents, contractors, and other third parties who have a
            business need to know.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Data Retention
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We will only retain your personal data for as long as necessary to
            fulfill the purposes for which we collected it, including for the
            purposes of satisfying any legal, accounting, or reporting
            requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Your Legal Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to track activity
            on our platform and store certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Third-Party Links
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our platform may include links to third-party websites, plug-ins,
            and applications. Clicking on those links may allow third parties to
            collect or share data about you. We do not control these third-party
            websites and are not responsible for their privacy statements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update our privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            10. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at:
          </p>
          <div className="mt-4 p-4 bg-pink-50 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong> privacy@pawhome.com
              <br />
              <strong>Address:</strong> 123 Pet Street, Animal City, PC 12345
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
