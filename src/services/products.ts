import { Product } from "@/types";

const API_URL = "/api/products";

type ProductPayload = Omit<Product, "id"> & { id?: string };

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products ?? [];
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id: ${id}`);
  }
  const data = await response.json();
  return data.product;
};

export const createProduct = async (
  product: ProductPayload
): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to create product");
  }
  const data = await response.json();
  return data.product;
};

export const updateProduct = async (
  id: string,
  product: Partial<ProductPayload>
): Promise<Product> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error || `Failed to update product with id: ${id}`);
  }
  const data = await response.json();
  return data.product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error || `Failed to delete product with id: ${id}`);
  }
};
  }
  const data = await response.json();
  return data.product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error || `Failed to delete product with id: ${id}`);
  }
};
export const createProduct = async (product: Product): Promise<Product> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return response.json();
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error(`Failed to update product with id: ${id}`);
    }
    return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete product with id: ${id}`);
    }
};