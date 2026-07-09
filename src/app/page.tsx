import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-white ring-1 ring-black/5">
            <Image
              src="/images/hero-main.jpg"
              alt="Maisor collection"
              fill
              priority
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-contain"
            />
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold uppercase tracking-[0.3em] text-ink sm:text-3xl">
              New Collection
            </h1>
            <p className="mt-2 text-base uppercase tracking-[0.4em] text-bottle-500 sm:text-lg">
              Coming Soon
            </p>
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
              The Maisor Standard
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Built around three colors.
              <br />
              Zero compromise.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/70">
              Every panjabi is crafted from premium fabric with a focus on
              comfort, fit, and finish. Honest pricing, made to last — for
              everyday elegance and special occasions alike.
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
                { k: "100%", v: "Premium fabric" },
                { k: "5", v: "Curated designs" },
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
              <div className="relative aspect-[3/4] bg-white md:aspect-auto md:h-full md:min-h-[440px]">
                <Image
                  src="/images/panjabi-2-1.jpg"
                  alt="Premium Panjabi"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <div className="p-10 sm:p-14">
                <span className="rounded-full bg-bottle-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  Bestseller
                </span>
                <h2 className="mt-5 text-3xl font-bold">Premium Panjabi</h2>
                <p className="mt-4 leading-relaxed text-ink/70">
                  Our most luxurious panjabi. Rich fabric with an elegant drape
                  — designed to make a statement at any occasion.
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-2xl font-bold">
                    {formatPrice(2000)}
                  </span>
                  <span className="text-sm text-ink/40 line-through">
                    {formatPrice(2400)}
                  </span>
                </div>
                <Link
                  href="/product/premium-panjabi"
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
