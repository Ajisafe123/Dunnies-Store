'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'

interface ProductProps {
  name: string
  price?: number
  originalPrice?: number
  rating?: number
  reviews?: number
  image?: string
  tag?: string
  discount?: number
  href?: string          
}

export default function ProductCard({
  name = "Unnamed Product",
  price = 0,
  originalPrice,
  rating = 0,
  reviews = 0,
  image = "/placeholder.jpg",
  tag = "New",
  discount = 0,
  href = "#",            
}: ProductProps) {
  const formattedPrice = price ? `₦${Number(price).toLocaleString()}` : '₦0'
  const formattedOriginal = originalPrice ? `₦${Number(originalPrice).toLocaleString()}` : null

  
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!href || href === '#') {
      return <div className="cursor-default">{children}</div>
    }
    return <Link href={href}>{children}</Link>
  }

  return (
    <CardWrapper>
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discount}%
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
            {tag}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-purple-600 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:text-white shadow-lg"
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">({reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">{formattedPrice}</span>
              {formattedOriginal && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  {formattedOriginal}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => e.preventDefault()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </CardWrapper>
  )
}