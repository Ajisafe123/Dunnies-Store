import type { Metadata } from "next";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { type ProductRecord } from "@/Data/products";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Groceries – Dunnis Stores",
  description: "Shop fresh groceries, pantry items, and everyday essentials",
};

type ApiProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageUrls?: string[];
  category?: string | null;
};

const adaptProductRecord = (
  product: ApiProduct,
  tag?: string
): ProductRecord => {
  // Prioritize imageUrls array, fallback to imageUrl, then default
  const imageUrls =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : product.imageUrl
      ? [product.imageUrl]
      : [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        ];

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    longDescription: product.description,
    price: product.price,
    originalPrice: undefined,
    rating: 0,
    reviewsCount: 0,
    image: imageUrls[0],
    images: imageUrls,
    tag: tag ?? product.category ?? "Grocery",
    category: product.category ?? "Grocery",
    href: `/product/${product.id}`,
    stockStatus: "in-stock",
    highlights: [],
    specs: [],
    reviews: [],
  };
};

async function fetchGroceries(): Promise<ProductRecord[]> {
  try {
    const groceries = await prisma.grocery.findMany({
      orderBy: { createdAt: "desc" },
    });

    return groceries.map((grocery: any) =>
      adaptProductRecord(
        {
          id: grocery.id,
          name: grocery.name,
          description: grocery.description || "",
          price: grocery.price,
          imageUrl: grocery.imageUrl || "",
          imageUrls:
            grocery.imageUrls && grocery.imageUrls.length > 0
              ? grocery.imageUrls
              : undefined,
          category: "Grocery",
        },
        "Grocery"
      )
    );
  } catch (error) {
    console.error("Failed to fetch groceries:", error);
    return [];
  }
}

export default async function GroceriesPage() {
  const catalog = await fetchGroceries();

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
            Fresh & Quality
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-1">
            Groceries & Pantry Essentials
          </h1>
          <p className="text-slate-600 mt-2">
            Shop fresh produce, dairy, meat, and pantry staples delivered to
            your doorstep.
          </p>
        </div>
        {catalog.length > 0 ? (
          <ProductsCatalog products={catalog} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No groceries available yet. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
