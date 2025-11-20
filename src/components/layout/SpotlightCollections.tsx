"use client";

import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import ProductList from "@/components/product/ProductList";
import { productsCatalog } from "@/Data/products";

const bestSellerCards = [...productsCatalog]
  .sort((a, b) => b.reviewsCount - a.reviewsCount)
  .slice(0, 4)
  .map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating,
    reviews: product.reviewsCount,
    image: product.image,
    tag: product.tag,
    href: product.href,
  }));

const signatureHighlights = [...productsCatalog]
  .filter((product) =>
    ["Gifts", "Fashion", "Home"].includes(product.category || product.tag)
  )
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3);

export default function SpotlightCollections() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 via-white to-purple-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col gap-4 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-purple-500">
            <Flame className="w-4 h-4 text-amber-500" />
            Spotlight
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What&apos;s hot right now
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Crowd favorites meet our signature concierge picks. Hand off your
            gifting decisions with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 lg:gap-12">
          <div className="rounded-3xl bg-white/95 backdrop-blur border border-purple-100 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-4 py-1 self-start">
                <Flame className="w-4 h-4" />
                Best sellers
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Loved by thousands
              </h3>
              <p className="text-gray-600">
                These products ship out the fastest—perfect for when you need a
                guaranteed hit.
              </p>
            </div>
            <ProductList products={bestSellerCards} cols={4} gap={6} />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-gray-500">
                Updated daily based on verified reviews and repeat orders.
              </p>
              <Link
                href="/best-sellers"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
              >
                Shop all best sellers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 text-white p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-200 bg-white/10 rounded-full px-4 py-1 self-start">
              <Sparkles className="w-4 h-4 text-purple-200" />
              Signature experiences
            </div>
            <div>
              <h3 className="text-2xl font-bold">Concierge curated</h3>
              <p className="text-purple-100 mt-2">
                For when you need the gift to feel personal, immersive, and far
                from basic. Each pick pairs premium packaging with a story to
                tell.
              </p>
            </div>

            <ul className="space-y-4">
              {signatureHighlights.map((product) => (
                <li
                  key={product.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4"
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-purple-300 mb-1">
                    {product.category}
                  </p>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-sm text-purple-100 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href="/signature-experiences"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-gray-900 font-semibold py-3 hover:bg-purple-50 transition"
            >
              Explore concierge picks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

