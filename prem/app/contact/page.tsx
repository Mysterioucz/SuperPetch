import ContactHero from "./components/ContactHero";
import ContactInfoCards from "./components/ContactInfoCards";
import ContactForm from "./components/ContactForm";
import ContactFAQ from "./components/ContactFAQ";
import ContactSocial from "./components/ContactSocial";
import ContactHours from "./components/ContactHours";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ContactHero />
        <ContactInfoCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <div>
            <ContactFAQ />
            <ContactSocial />
          </div>
        </div>

        <ContactHours />
      </div>
    </div>
  );
}
