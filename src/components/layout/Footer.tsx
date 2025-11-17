
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          
          <div className="space-y-5">
            <h3 className="text-white text-2xl font-bold">Gifts & Goodies</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Your one-stop shop for premium gifts, fresh groceries, and everything special in Nigeria.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://youtube.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/gifts" className="hover:text-white transition-colors">Gifts</Link></li>
              <li><Link href="/groceries" className="hover:text-white transition-colors">Fresh Groceries</Link></li>
              <li><Link href="/categories/jewelry" className="hover:text-white transition-colors">Jewelry</Link></li>
              <li><Link href="/categories/decor" className="hover:text-white transition-colors">Home Decor</Link></li>
              <li><Link href="/categories/corporate" className="hover:text-white transition-colors">Corporate Gifts</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
        </div>

        
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© 2025 Gifts & Goodies Nigeria. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="text-gray-500">Secured by:</span>
            <div className="flex space-x-3">
              <img src="/paystack.svg" alt="Paystack" className="h-8" />
              <img src="/flutterwave.svg" alt="Flutterwave" className="h-8" />
              <img src="/visa.svg" alt="Visa" className="h-6" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}