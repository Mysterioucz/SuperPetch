import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-lg font-bold text-slate-900">
                Paw Home
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Making pet adoption simple, safe, and joyful for everyone.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/adopt" className="hover:text-pink-600">
                  Browse Pets
                </Link>
              </li>
              <li>
                <Link href="/list-pet" className="hover:text-pink-600">
                  List a Pet
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-pink-600">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/breeding" className="hover:text-pink-600">
                  Breeding
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-pink-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-pink-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-pink-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/privacy" className="hover:text-pink-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-pink-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-pink-600">
                  Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Paw Home. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
