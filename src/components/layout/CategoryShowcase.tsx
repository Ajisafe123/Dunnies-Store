"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Gifts & Surprises",
    description: "Curated finds for every celebration.",
    image:
      "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?w=600&q=80",
    href: "/gifts",
    accent: "from-rose-100 via-pink-50 to-white",
  },
  {
    name: "Groceries & Fresh",
    description: "Daily essentials delivered in hours.",
    image:
      "https://images.unsplash.com/photo-1502740479091-635887520276?w=600&q=80",
    href: "/groceries/produce",
    accent: "from-green-50 via-emerald-50 to-white",
  },
  {
    name: "Home & Living",
    description: "Decor, organizers, and cozy must-haves.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
    href: "/categories/decor",
    accent: "from-sky-50 via-blue-50 to-white",
  },
  {
    name: "Beauty & Fashion",
    description: "Style statements and glow-up kits.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    href: "/categories/fashion",
    accent: "from-purple-50 via-indigo-50 to-white",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
              Explore Dunnis
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
              Shop by category
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Jump into curated selections built around how you actually live—from
              pantry restocks to premium gifting.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
          >
            See all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
            >
              <div
                className={`h-36 bg-linear-to-br ${category.accent} flex items-center justify-center`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

