import Link from "next/link";

export default function TermsContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition"
        >
          <span className="text-3xl">🐾</span>
          <span className="text-xl font-bold text-blue-600">PetPlatform</span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mt-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mt-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using PetPlatform, you accept and agree to be bound
            by the terms and provisions of this agreement. If you do not agree
            to these terms, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Use License
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Permission is granted to temporarily access the materials on
            PetPlatform for personal, non-commercial transitory viewing only.
            This is the grant of a license, not a transfer of title, and under
            this license you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or public display
            </li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>
              Remove any copyright or proprietary notations from the materials
            </li>
            <li>
              Transfer the materials to another person or mirror the materials
              on another server
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. User Accounts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            When you create an account with us, you must provide accurate,
            complete, and current information. You are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              Maintaining the confidentiality of your account and password
            </li>
            <li>Restricting access to your computer and account</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Pet Listings and Adoptions
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            When listing pets for adoption, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Provide accurate and truthful information about the pet</li>
            <li>Have legal ownership or authority to rehome the pet</li>
            <li>
              Comply with all local, state, and federal laws regarding pet
              ownership and transfer
            </li>
            <li>Not use the platform for commercial breeding operations</li>
            <li>Ensure the pet's welfare and health standards are met</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            Adopters agree to provide a safe and loving home for any pet adopted
            through our platform and comply with all applicable pet ownership
            laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Prohibited Activities
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            You may not use PetPlatform to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Engage in any unlawful or fraudulent activity</li>
            <li>Harass, abuse, or harm another person or animal</li>
            <li>Post false, misleading, or deceptive content</li>
            <li>Violate any intellectual property rights</li>
            <li>Transmit viruses or malicious code</li>
            <li>Collect user information without consent</li>
            <li>Engage in commercial breeding or pet mill operations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Content Ownership
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You retain all rights to the content you post on PetPlatform.
            However, by posting content, you grant us a worldwide,
            non-exclusive, royalty-free license to use, reproduce, modify, and
            display your content in connection with operating and promoting the
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Payment Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Certain features of PetPlatform may require payment. You agree to
            provide accurate billing information and authorize us to charge your
            payment method. All fees are non-refundable unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Disclaimer of Warranties
          </h2>
          <p className="text-gray-700 leading-relaxed">
            PetPlatform is provided "as is" without warranties of any kind,
            either express or implied. We do not guarantee that the platform
            will be uninterrupted, secure, or error-free. We are not responsible
            for the accuracy of user-generated content or the conduct of users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            In no event shall PetPlatform or its suppliers be liable for any
            damages arising out of the use or inability to use our platform.
            This includes damages related to pet adoptions, transactions between
            users, or any other user interactions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            10. Indemnification
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify and hold PetPlatform harmless from any
            claims, losses, damages, liabilities, and expenses arising from your
            use of the platform, violation of these terms, or infringement of
            any rights of another party.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            11. Termination
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may terminate or suspend your account immediately, without prior
            notice, for any reason, including breach of these terms. Upon
            termination, your right to use the platform will immediately cease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            12. Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which PetPlatform operates, without
            regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            13. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these terms at any time. We will
            notify users of any material changes by posting the new terms on
            this page and updating the "Last updated" date. Your continued use
            of the platform after changes constitutes acceptance of the new
            terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            14. Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these terms, please contact us:
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong> legal@petplatform.com
              <br />
              <strong>Address:</strong> 123 Pet Street, Animal City, PC 12345
              <br />
              <strong>Phone:</strong> (555) 123-4567
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
