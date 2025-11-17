import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-white text-3xl font-black mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Dunni Stores
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Your trusted online marketplace for premium products, fresh
                groceries, and everything you need delivered right to your
                doorstep across Nigeria.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm">123 Abuja, Nigeria</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <p className="text-sm">+234 800 123 4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <p className="text-sm">hello@dunnistores.ng</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Shop
              <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/groceries"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Fresh Groceries
                </Link>
              </li>
              <li>
                <Link
                  href="/electronics"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/fashion"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 mb-10 backdrop-blur-sm border border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-white font-bold text-lg mb-1">
                Subscribe to Our Newsletter
              </h5>
              <p className="text-sm text-gray-400">
                Get exclusive deals and updates delivered to your inbox
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-400">
              © 2025 Dunni Stores Nigeria. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="text-sm text-gray-500">Secured Payment:</span>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="bg-white px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-bold text-gray-900">
                    PAYSTACK
                  </span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-bold text-gray-900">
                    FLUTTERWAVE
                  </span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-bold text-blue-900">VISA</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-bold text-red-600">
                    MASTERCARD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
