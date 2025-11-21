import type { Metadata } from "next";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { productsCatalog, type ProductRecord } from "@/Data/products";
import { getBaseUrl } from "@/utils/url";
import Loader from "@/components/ui/Loader";

export const metadata: Metadata = {
  title: "Gifts – Dunnis Stores",
  description: "Browse our collection of unique gift items for every occasion",
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
  tag: "Gift",
  category: product.category ?? "Gift",
  href: `/product/${product.id}`,
  stockStatus: "in-stock",
  highlights: [],
  specs: [],
  reviews: [],
});

async function fetchGifts(): Promise<ProductRecord[] | null> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/gifts`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!Array.isArray(data.gifts)) {
      return null;
    }

    return data.gifts.map(adaptProductRecord);
  } catch {
    return null;
  }
}

export default async function GiftPage() {
  const gifts = await fetchGifts();
  const catalog = gifts && gifts.length > 0 ? gifts : productsCatalog;

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
            Special Gifts
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-1">
            Thoughtful Gifts for Every Occasion
          </h1>
          <p className="text-slate-600 mt-2">
            Discover the perfect gift for your loved ones with our curated
            collection of unique and meaningful items.
          </p>
        </div>
        <ProductsCatalog products={catalog} />
      </div>
    </section>
  );
}
