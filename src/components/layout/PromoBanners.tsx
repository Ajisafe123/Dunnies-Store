import Link from "next/link";
import { ArrowRight, ShoppingBag, GiftIcon } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link
            href="/gifts/premium"
            className="relative h-96 rounded-3xl overflow-hidden group block shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
              alt="Premium Gifts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/95 via-purple-900/90 to-transparent">
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <div className="flex items-center gap-2">
                  <GiftIcon className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-sm font-bold">
                    SPECIAL COLLECTION
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <h3 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
                  Premium Gifts
                </h3>
                <p className="text-white/90 text-lg mb-6 font-medium">
                  Up to 40% off selected items
                </p>
                <div className="bg-white text-violet-600 px-8 py-4 rounded-2xl font-bold hover:bg-violet-50 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-lg">Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-xl transform rotate-3">
                40% OFF
              </div>
            </div>
          </Link>

          <Link
            href="/groceries/organic"
            className="relative h-96 rounded-3xl overflow-hidden group block shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80"
              alt="Organic Groceries"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-900/90 to-transparent">
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-green-300" />
                  <span className="text-white text-sm font-bold">
                    FRESH DAILY
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <h3 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
                  Organic Groceries
                </h3>
                <p className="text-white/90 text-lg mb-6 font-medium">
                  Farm fresh produce delivered today
                </p>
                <div className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-lg">Order Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-xl transform -rotate-3">
                FRESH
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
