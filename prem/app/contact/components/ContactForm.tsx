import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

export default function ContactForm() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Send us a Message
      </h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            required
            placeholder="John"
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            required
            placeholder="Doe"
          />
        </div>

        <Input
          id="email"
          label="Email Address"
          type="email"
          required
          placeholder="you@example.com"
        />

        <Input
          id="phone"
          label="Phone Number (Optional)"
          type="tel"
          placeholder="(555) 123-4567"
        />

        <Select
          id="subject"
          label="Subject"
          placeholder="Select a subject"
          options={[
            { value: "general", label: "General Inquiry" },
            { value: "adoption", label: "Adoption Questions" },
            { value: "listing", label: "Listing Help" },
            { value: "technical", label: "Technical Support" },
            { value: "partnership", label: "Partnership Opportunities" },
            { value: "other", label: "Other" },
          ]}
        />

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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition resize-none"
            placeholder="Tell us how we can help..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
