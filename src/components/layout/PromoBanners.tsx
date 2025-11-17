import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PromoBanners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link href="/gifts/premium" className="relative h-80 rounded-3xl overflow-hidden group block">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80" alt="Premium Gifts" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-transparent flex items-center">
              <div className="p-8 sm:p-12">
                <p className="text-purple-200 font-semibold mb-2">SPECIAL COLLECTION</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Premium Gifts</h3>
                <p className="text-white/90 mb-6">Up to 40% off selected items</p>
                <div className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 inline-flex items-center space-x-2">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          <Link href="/groceries/organic" className="relative h-80 rounded-3xl overflow-hidden group block">
            <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80" alt="Organic Groceries" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-transparent flex items-center">
              <div className="p-8 sm:p-12">
                <p className="text-green-200 font-semibold mb-2">FRESH DAILY</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Organic Groceries</h3>
                <p className="text-white/90 mb-6">Farm fresh produce delivered today</p>
                <div className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 inline-flex items-center space-x-2">
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}