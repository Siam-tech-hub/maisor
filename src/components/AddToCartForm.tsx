"use client";

import { useState } from "react";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!size) {
      setError("Please select a size");
      return;
    }
    setError("");
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
      },
      qty
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
        <span className="text-xs uppercase tracking-[0.15em] text-ink/40">
          Incl. all taxes
        </span>
      </div>

      {/* Sizes */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">
            Select Size
          </span>
          <span className="text-xs text-ink/40">Size guide</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setError("");
              }}
              className={`min-w-[3rem] rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                size === s
                  ? "border-bottle-900 bg-bottle-900 text-white"
                  : "border-black/15 text-ink/70 hover:border-bottle-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </div>

      {/* Quantity */}
      <div className="mt-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
          Quantity
        </span>
        <div className="mt-3 inline-flex items-center border border-black/15">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 text-sm hover:bg-black/5"
          >
            –
          </button>
          <span className="px-5 text-sm font-medium">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2.5 text-sm hover:bg-black/5"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-bottle-900 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
      >
        Add to Cart — {formatPrice(product.price * qty)}
      </button>

      {/* Trust */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px] text-ink/50">
        <div>
          <p className="font-semibold text-ink/70">Free over ৳3000</p>
          <p>Delivery</p>
        </div>
        <div>
          <p className="font-semibold text-ink/70">7-day</p>
          <p>Easy exchange</p>
        </div>
        <div>
          <p className="font-semibold text-ink/70">COD</p>
          <p>Available</p>
        </div>
      </div>
    </form>
  );
}
