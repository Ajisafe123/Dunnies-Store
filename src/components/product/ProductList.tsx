import ProductCard from "./ProductCard";

interface Product {
  id: number;
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
  cols?: 2 | 3 | 4 | 5 | 6;
  gap?: 4 | 6 | 8 | 10 | 12;
}

const colsMap = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

const gapMap = {
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

export default function ProductList({
  products,
  cols = 4,
  gap = 6,
}: ProductListProps) {
  return (
    <div className={`grid ${colsMap[cols]} ${gapMap[gap]}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          originalPrice={product.originalPrice}
          rating={product.rating}
          reviews={product.reviews}
          image={product.image}
          tag={product.tag}
          discount={product.discount}
          href={product.href}
        />
      ))}
    </div>
  );
}
