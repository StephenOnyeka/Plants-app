import { useEffect, useRef, useState } from "react";
import plantData, { CartItem, Plant } from "@/constants/plantData";
import { getJSON, setJSON } from "@/utils/storage";

const STORAGE_KEY = "@cart";

type StoredCartItem = { id: number; quantity: number };

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const hydrated = useRef(false);

  // Load persisted {id, quantity} pairs and rehydrate full plant objects.
  useEffect(() => {
    (async () => {
      const stored = await getJSON<StoredCartItem[]>(STORAGE_KEY, []);
      const restored = stored
        .map(({ id, quantity }) => {
          const plant = plantData.find((p) => p.id === id);
          return plant ? { ...plant, quantity } : null;
        })
        .filter((item): item is CartItem => item != null);
      setCart(restored);
      hydrated.current = true;
    })();
  }, []);

  // Persist ids + quantities after hydration completes.
  useEffect(() => {
    if (!hydrated.current) return;
    setJSON(
      STORAGE_KEY,
      cart.map(({ id, quantity }) => ({ id, quantity }))
    );
  }, [cart]);

  const addToCart = (item: Plant) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c))
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };
}
