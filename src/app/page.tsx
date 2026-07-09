import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, CATEGORIES, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-bottle-950">
          <Image
            src="/images/hero-banner.jpg"
            alt="Maison collection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bottle-950/85 via-bottle-950/40 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-bottle-200">
                Emerald Season · 2026
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                Modern essentials,
                <br />
                <span className="text-bottle-300">redefined.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
                Premium clothing in bottle green, white & black. Crafted with
                intention, designed for everyday life.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bottle-300"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-ink/50">
            <span className="text-bottle-700">Shop by category</span>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/shop?category=${c.id}`}
                className="transition-colors hover:text-bottle-700"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-bottle-700">
                Curated
              </p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 hover:text-bottle-700 sm:block"
            >
              View all →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BRAND STORY STRIP */}
      <section className="bg-bottle-900 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-bottle-300">
              The Maison Standard
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Built around three colors.
              <br />
              Zero compromise.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/70">
              Every piece is designed in a disciplined palette of bottle green,
              crisp white, and deep black — so everything you own works together.
              Premium fabrics, honest pricing, made to last.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-white/10"
            >
              Read More
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "100%", v: "Premium cotton" },
                { k: "3", v: "Core colors" },
                { k: "COD", v: "All of Bangladesh" },
                { k: "48h", v: "Fast dispatch" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
                >
                  <p className="text-3xl font-bold text-bottle-300">{s.k}</p>
                  <p className="mt-2 text-sm text-white/60">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BESTSELLER SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-bottle-50">
            <div className="grid items-center gap-0 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:h-full md:min-h-[440px]">
                <Image
                  src="/images/green-hoodie.jpg"
                  alt="Bottle Green Hoodie"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-10 sm:p-14">
                <span className="rounded-full bg-bottle-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  Bestseller
                </span>
                <h2 className="mt-5 text-3xl font-bold">Bottle Green Hoodie</h2>
                <p className="mt-4 leading-relaxed text-ink/70">
                  Our most-loved piece. Heavyweight 400 GSM brushed fleece in
                  deep bottle green — soft, structured, and made to be lived in.
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-2xl font-bold">
                    {formatPrice(2490)}
                  </span>
                  <span className="text-sm text-ink/40 line-through">
                    {formatPrice(2990)}
                  </span>
                </div>
                <Link
                  href="/product/bottle-green-hoodie"
                  className="mt-8 inline-block rounded-full bg-bottle-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal>
          <Newsletter />
        </Reveal>
      </section>
    </>
  );
}
