"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductList from "@/components/product/ProductList";

const products = [
  {
    id: 1,
    name: "Organic Fruit Box",
    price: 34900,
    originalPrice: 44900,
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80",
    tag: "Fresh",
    discount: 22,
    href: "/product/organic-fruit-box",
  },
  {
    id: 2,
    name: "Luxury Jewelry Set",
    price: 199900,
    originalPrice: 299900,
    rating: 4.7,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    tag: "Premium",
    discount: 33,
    href: "/product/luxury-jewelry-set",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked items just for you
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center space-x-2 text-purple-600 font-semibold hover:text-purple-700 group"
          >
            <span>View All</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductList products={products} cols={4} gap={8} />
      </div>
    </section>
  );
}
