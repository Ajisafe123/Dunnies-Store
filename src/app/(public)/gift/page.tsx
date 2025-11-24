import type { Metadata } from "next";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { type ProductRecord } from "@/Data/products";
import { prisma } from "@/lib/prisma";

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
    tag: tag ?? product.category ?? "Gift",
    category: product.category ?? "Gift",
    href: `/product/${product.id}`,
    stockStatus: "in-stock",
    highlights: [],
    specs: [],
    reviews: [],
  };
};

async function fetchGifts(): Promise<ProductRecord[]> {
  try {
    const gifts = await prisma.gift.findMany({
      orderBy: { createdAt: "desc" },
    });

    return gifts.map((gift: any) =>
      adaptProductRecord(
        {
          id: gift.id,
          name: gift.name,
          description: gift.description || "",
          price: gift.price,
          imageUrl: gift.imageUrl || "",
          imageUrls:
            gift.imageUrls && gift.imageUrls.length > 0
              ? gift.imageUrls
              : undefined,
          category: "Gift",
        },
        "Gift"
      )
    );
  } catch (error) {
    console.error("Failed to fetch gifts:", error);
    return [];
  }
}

export default async function GiftPage() {
  const catalog = await fetchGifts();

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
        {catalog.length > 0 ? (
          <ProductsCatalog products={catalog} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No gifts available yet. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
