import ProductCard from "./ProductCard";

interface Product {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image?: string;
  tag?: string;
  discount?: number;
  href?: string;
}

interface ProductListProps {
  products: Product[];
  cols?: 1 | 3 | 4 | 5 | 6;
  gap?: 4 | 6 | 8;
}

export default function ProductList({
  products,
  cols = 4,
  gap = 6,
}: ProductListProps) {
  const gapClass = gap === 4 ? "gap-4" : gap === 8 ? "gap-8" : "gap-6";

  const gridCols = {
    1: "grid-cols-1",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
  }[cols];

  return (
    <div className={`grid ${gridCols} ${gapClass} w-full`}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} className="w-full" />
      ))}
    </div>
  );
}
