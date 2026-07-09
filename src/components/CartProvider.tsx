"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "maisor-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  };

  const removeItem: CartContextValue["removeItem"] = (id, size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQty: CartContextValue["updateQty"] = (id, size, qty) => {
    if (qty <= 0) return removeItem(id, size);
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size ? { ...i, qty } : i
      )
    );
  };

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQty,
    clear,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
