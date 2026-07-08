import { useEffect, useRef, useState } from "react";
import { CartItem } from "@/constants/plantData";
import { getJSON, setJSON } from "@/utils/storage";

const STORAGE_KEY = "@orders";

export type OrderLine = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  date: number;
  items: OrderLine[];
  total: number;
  bank: string;
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const hydrated = useRef(false);

  // Load persisted orders on mount.
  useEffect(() => {
    (async () => {
      const stored = await getJSON<Order[]>(STORAGE_KEY, []);
      setOrders(stored);
      hydrated.current = true;
    })();
  }, []);

  // Persist orders after hydration completes.
  useEffect(() => {
    if (!hydrated.current) return;
    setJSON(STORAGE_KEY, orders);
  }, [orders]);

  // Create an order from the current cart. Returns the new order so the
  // caller can route to a confirmation screen.
  const placeOrder = (cart: CartItem[], bank: string): Order => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const order: Order = {
      id: `ORD-${Date.now()}`,
      date: Date.now(),
      items: cart.map(({ id, title, price, quantity }) => ({
        id,
        title,
        price,
        quantity,
      })),
      total,
      bank,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  return { orders, placeOrder };
}
