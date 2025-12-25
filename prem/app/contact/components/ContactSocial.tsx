export default function ContactSocial() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
      <div className="grid grid-cols-2 gap-4">
        <a
          href="#"
          className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition"
        >
          <span className="text-2xl mr-2">📘</span>
          <span className="font-semibold text-gray-700">Facebook</span>
        </a>
        <a
          href="#"
          className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition"
        >
          <span className="text-2xl mr-2">🐦</span>
          <span className="font-semibold text-gray-700">Twitter</span>
        </a>
        <a
          href="#"
          className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition"
        >
          <span className="text-2xl mr-2">📸</span>
          <span className="font-semibold text-gray-700">Instagram</span>
        </a>
        <a
          href="#"
          className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition"
        >
          <span className="text-2xl mr-2">💼</span>
          <span className="font-semibold text-gray-700">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
