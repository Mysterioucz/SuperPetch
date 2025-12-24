export default function ContactInfoCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📧</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
        <p className="text-gray-600 mb-4">Our team is here to help</p>
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
        <p className="text-gray-600 mb-4">Mon-Fri 9am to 6pm EST</p>
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
        <p className="text-gray-600">
          123 Pet Street
          <br />
          Animal City, PC 12345
          <br />
          United States
        </p>
      </div>
    </div>
  );
}
