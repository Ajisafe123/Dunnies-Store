"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type WishlistItem = {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  href?: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: WishlistItem["id"]) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: WishlistItem["id"]) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "dunnies_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to persist wishlist", error);
    }
  }, [items]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((existing) => existing.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: WishlistItem["id"]) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((existing) => existing.id === item.id)) {
        return prev.filter((existing) => existing.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (id: WishlistItem["id"]) =>
    items.some((item) => item.id === id);

  const clearWishlist = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
    }),
    [items]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider"
    );
  }
  return context;
};

