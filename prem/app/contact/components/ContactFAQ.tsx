export default function ContactFAQ() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white mb-8">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2">How do I adopt a pet?</h3>
          <p className="text-blue-100">
            Browse available pets, create an account, and contact the listing
            owner directly through our platform. We facilitate safe
            communication between adopters and owners.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">
            Is there a fee to list a pet?
          </h3>
          <p className="text-blue-100">
            Basic listings are free! We also offer premium features for enhanced
            visibility and additional tools.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">
            How do you verify listings?
          </h3>
          <p className="text-blue-100">
            All listings undergo verification to ensure authenticity. We check
            user credentials and require documentation for breeders and
            shelters.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">
            What payment methods do you accept?
          </h3>
          <p className="text-blue-100">
            We support all major credit cards, PayPal, and bank transfers for
            marketplace transactions and premium services.
          </p>
        </div>
      </div>
    </div>
  );
}
