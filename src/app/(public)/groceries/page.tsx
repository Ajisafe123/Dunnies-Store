import type { Metadata } from "next";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { productsCatalog, type ProductRecord } from "@/Data/products";
import { getBaseUrl } from "@/utils/url";

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
  category?: string | null;
};

const adaptProductRecord = (product: ApiProduct): ProductRecord => ({
  id: product.id,
  name: product.name,
  description: product.description,
  longDescription: product.description,
  price: product.price,
  originalPrice: undefined,
  rating: 0,
  reviewsCount: 0,
  image: product.imageUrl,
  images: [product.imageUrl],
  tag: "Grocery",
  category: product.category ?? "Grocery",
  href: `/product/${product.id}`,
  stockStatus: "in-stock",
  highlights: [],
  specs: [],
  reviews: [],
});

async function fetchGroceries(): Promise<ProductRecord[] | null> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/groceries`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!Array.isArray(data.groceries)) {
      return null;
    }

    return data.groceries.map(adaptProductRecord);
  } catch {
    return null;
  }
}

export default async function GroceriesPage() {
  const groceries = await fetchGroceries();
  const catalog =
    groceries && groceries.length > 0 ? groceries : productsCatalog;

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
        <ProductsCatalog products={catalog} />
      </div>
    </section>
  );
}
