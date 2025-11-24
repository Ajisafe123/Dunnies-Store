import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import ProductDetailWrapper from "@/components/product/ProductDetailWrapper";
import { type ProductRecord } from "@/Data/products";
import { prisma } from "@/lib/prisma";

type GroceryDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getGroceryFromDatabase(id: string) {
  try {
    const grocery = await prisma.grocery.findUnique({
      where: { id },
    });

    if (grocery) {
      // Fetch comments and likes separately
      const comments = await prisma.productComment.findMany({
        where: { productId: id },
      });
      const likes = await prisma.productLike.findMany({
        where: { productId: id },
      });

      return { ...grocery, comments, likes };
    }

    return null;
  } catch (error) {
    return null;
  }
}

function transformDatabaseGrocery(dbGrocery: any): ProductRecord {
  console.log(
    `[GroceryDetail] ${dbGrocery.name}: imageUrl="${
      dbGrocery.imageUrl
    }", imageUrls=${
      dbGrocery.imageUrls ? `[${dbGrocery.imageUrls.join(",")}]` : "[]"
    }`
  );

  // Calculate average rating from comments
  const ratings = (dbGrocery.comments as any[]).map((c: any) => c.rating);
  const averageRating =
    ratings.length > 0
      ? Math.round(
          (ratings.reduce((a: number, b: number) => a + b, 0) /
            ratings.length) *
            10
        ) / 10
      : 0;

  // Prioritize imageUrls array first, then imageUrl, then unsplash default
  let imageUrls = [];
  if (
    dbGrocery.imageUrls &&
    Array.isArray(dbGrocery.imageUrls) &&
    dbGrocery.imageUrls.length > 0
  ) {
    imageUrls = dbGrocery.imageUrls.filter((url: string) => url && url.trim());
  }
  if (
    imageUrls.length === 0 &&
    dbGrocery.imageUrl &&
    dbGrocery.imageUrl.trim()
  ) {
    imageUrls = [dbGrocery.imageUrl];
  }
  if (imageUrls.length === 0) {
    imageUrls = [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    ];
  }

  return {
    id: dbGrocery.id,
    name: dbGrocery.name,
    description: dbGrocery.description || "",
    longDescription: dbGrocery.description || "",
    price: dbGrocery.price,
    originalPrice: undefined,
    rating: averageRating,
    reviewsCount: dbGrocery.comments.length,
    image: imageUrls[0],
    images: imageUrls,
    tag: "Grocery",
    category: "Groceries",
    href: `/groceries/${dbGrocery.id}`,
    stockStatus: "in-stock" as const,
    highlights: ["Fresh quality", "Fast delivery", "Best prices"],
    specs: [
      { label: "SKU", value: dbGrocery.id },
      { label: "Category", value: "Groceries" },
    ],
    reviews: [],
  };
}

export default async function GroceryDetailPage({
  params,
}: GroceryDetailPageProps) {
  const { id } = await params;

  let dbGrocery = await getGroceryFromDatabase(id);
  let product: ProductRecord | null = null;

  if (dbGrocery) {
    product = transformDatabaseGrocery(dbGrocery);
  }

  if (!product) {
    return notFound();
  }

  return (
    <ProductDetailWrapper>
      <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ProductDetail product={product} />
        </div>
      </section>
    </ProductDetailWrapper>
  );
}
