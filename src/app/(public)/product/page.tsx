import type { Metadata } from "next";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { type ProductRecord } from "@/Data/products";
import { getBaseUrl } from "@/utils/url";

export const metadata: Metadata = {
  title: "All Products – Dunnis Stores",
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
  tag: product.category ?? "New",
  category: product.category ?? "General",
  href: `/product/${product.id}`,
  stockStatus: "in-stock",
  highlights: [],
  specs: [],
  reviews: [],
});

async function fetchLiveProducts(): Promise<ProductRecord[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data.products)) {
      return [];
    }

    return data.products.map(adaptProductRecord);
  } catch {
    return [];
  }
}

export default async function ProductListingPage() {
  const catalog = await fetchLiveProducts();

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {catalog.length > 0 ? (
          <ProductsCatalog products={catalog} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products available yet. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
