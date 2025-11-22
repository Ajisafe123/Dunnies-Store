import type { Metadata } from "next";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { type ProductRecord } from "@/Data/products";
import { prisma } from "@/lib/prisma";

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
    const products = await prisma.product.findMany({
      where: {
        category: {
          type: "product",
        },
      },
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return products.map((product) =>
      adaptProductRecord({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        imageUrl: product.imageUrl || "",
        category: product.category?.name,
      })
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductListingPage() {
  const catalog = await fetchLiveProducts();

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
            All Products
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-1">
            Browse Our Complete Collection
          </h1>
          <p className="text-slate-600 mt-2">
            Discover our full range of products curated for quality and value.
          </p>
        </div>
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
