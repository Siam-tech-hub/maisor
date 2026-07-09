"use client";

import { useCart, CartItem } from "./CartProvider";
import Link from "next/link";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em]">
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-ink/60 hover:text-ink"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-ink/50">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-full bg-bottle-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item: CartItem) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 border-b border-black/5 py-4"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden bg-white ring-1 ring-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-medium">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-xs text-ink/40 hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-ink/50">
                      Size {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-black/15">
                        <button
                          onClick={() =>
                            updateQty(item.id, item.size, item.qty - 1)
                          }
                          className="px-2.5 py-1 text-sm hover:bg-black/5"
                        >
                          –
                        </button>
                        <span className="px-3 text-sm">{item.qty}</span>
                        <button
                          onClick={() =>
                            updateQty(item.id, item.size, item.qty + 1)
                          }
                          className="px-2.5 py-1 text-sm hover:bg-black/5"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.18em] text-ink/60">
                  Subtotal
                </span>
                <span className="text-lg font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block rounded-full bg-bottle-900 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
              >
                Checkout
              </Link>
              <p className="mt-3 text-center text-xs text-ink/40">
                Taxes & shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
