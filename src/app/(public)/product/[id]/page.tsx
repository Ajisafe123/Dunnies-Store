import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById } from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ProductDetail product={product} />
      </div>
    </section>
  );
}
