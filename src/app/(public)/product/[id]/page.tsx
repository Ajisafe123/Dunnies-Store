import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import ProductDetailWrapper from "@/components/product/ProductDetailWrapper";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getProductById(id: string) {
  try {
    const response = await fetch(
      new URL(
        `/api/products/${id}`,
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      ).toString(),
      {
        cache: "no-store",
      }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

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
