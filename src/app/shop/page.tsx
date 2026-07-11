import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, CATEGORIES, Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const active = params.category as Category | undefined;
  const products = active
    ? PRODUCTS.filter((p) => p.category === active)
    : PRODUCTS;

  return (
    <>
      {/* Header with hero image background */}
      <section className="relative overflow-hidden bg-bottle-900 text-white">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-main.jpg"
            alt="Maisor Collection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Collection
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            {active
              ? CATEGORIES.find((c) => c.id === active)?.label
              : "All Products"}
          </h1>
          <p className="mt-4 max-w-md text-white/70">
            {products.length} {products.length === 1 ? "piece" : "pieces"} —
            curated for everyday elegance.
          </p>
        </div>
      </section>

      {/* Filter bar (only shows when categories exist) */}
      {CATEGORIES.length > 0 && (
        <div className="sticky top-16 z-30 border-b border-black/5 bg-cream/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-4 no-scrollbar sm:px-6 lg:px-8">
            <Link
              href="/shop"
              className={`shrink-0 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                !active
                  ? "bg-bottle-900 text-white"
                  : "border border-black/15 text-ink/60 hover:border-bottle-500"
              }`}
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/shop?category=${c.id}`}
                className={`shrink-0 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                  active === c.id
                    ? "bg-bottle-900 text-white"
                    : "border border-black/15 text-ink/60 hover:border-bottle-500"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <p className="py-20 text-center text-ink/50">
            No products in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
