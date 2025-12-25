export default function ContactHours() {
  return (
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
  );
}
