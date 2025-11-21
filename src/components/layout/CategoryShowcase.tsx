"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Loader from "@/components/ui/Loader";

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  _count?: {
    products: number;
  };
}

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loader text="Loading categories..." />
        </div>
      </section>
    );
  }

  const categoryImages: Record<string, string> = {
    Gifts:
      "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?w=600&q=80",
    Groceries:
      "https://images.unsplash.com/photo-1502740479091-635887520276?w=600&q=80",
    "Home & Living":
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
    Electronics:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
  };

  const categoryAccents: Record<string, string> = {
    Gifts: "from-rose-100 via-pink-50 to-white",
    Groceries: "from-green-50 via-emerald-50 to-white",
    "Home & Living": "from-sky-50 via-blue-50 to-white",
    Electronics: "from-purple-50 via-indigo-50 to-white",
  };

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
              Jump into curated selections built around how you actually
              live—from pantry restocks to premium gifting.
            </p>
          </div>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
          >
            See all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
              >
                <div
                  className={`h-36 bg-linear-to-br ${
                    categoryAccents[category.name] || "from-gray-100 to-white"
                  } flex items-center justify-center`}
                >
                  <img
                    src={
                      categoryImages[category.name] ||
                      "https://images.unsplash.com/photo-1478181912261-a4ec2e6a94b6?w=600&q=80"
                    }
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
                  <p className="text-sm text-gray-600">
                    {category._count?.products || 0} items
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No categories available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
