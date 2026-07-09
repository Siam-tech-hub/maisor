"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-white p-3 ring-1 ring-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-bottle-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 flex items-end justify-center bg-black/0 p-3 transition-all duration-300 group-hover:bg-black/10">
          <span className="w-full translate-y-3 bg-white/95 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Product
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium text-ink">{product.name}</h3>
        <p className="shrink-0 text-sm font-semibold text-bottle-800">
          {formatPrice(product.price)}
        </p>
      </div>
      <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-ink/40">
        {product.sizes.length} sizes
      </p>
    </Link>
  );
}
