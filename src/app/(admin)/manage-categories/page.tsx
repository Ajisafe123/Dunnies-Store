"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, Tag } from "lucide-react";
import Loader from "@/components/ui/Loader";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";

interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl?: string;
  _count?: {
    products: number;
  };
  createdAt: string;
}

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.categories || []);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Categories
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Organize products into categories
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader text="Loading categories..." />
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-purple-200 bg-purple-50/50 text-center p-12">
          <Tag className="w-16 h-16 text-purple-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4 text-lg font-semibold">No categories yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            <Plus className="w-5 h-5" />
            Create your first category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-3xl bg-white border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-linear-to-br from-purple-100 to-pink-100 overflow-hidden">
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tag className="w-12 h-12 text-purple-300" />
                  </div>
                )}
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {category._count?.products ?? 0}{" "}
                    {category._count?.products === 1 ? "product" : "products"}
                  </p>
                </div>

                {category.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-purple-200 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-red-200 text-red-600 rounded-full font-semibold hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCategories}
      />
    </div>
  );
}
