"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types";

type WishlistState = {
  items: Product[];
  toggle: (product: Product) => void;
  isSaved: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set({
          items: exists
            ? get().items.filter((p) => p.id !== product.id)
            : [...get().items, product],
        });
      },
      isSaved: (productId) => get().items.some((p) => p.id === productId),
    }),
    { name: "webshop-wishlist" }
  )
);
