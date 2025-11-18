import type { Metadata } from "next";
import ProductsCatalog from "@/components/product/ProductsCatalog";
import { productsCatalog } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products – Dunnis Stores",
};

export default function ProductListingPage() {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <ProductsCatalog products={productsCatalog} />
      </div>
    </section>
  );
}

