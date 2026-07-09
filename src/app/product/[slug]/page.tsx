import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/lib/products";
import AddToCartForm from "@/components/AddToCartForm";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-ink/40">
        <Link href="/" className="hover:text-bottle-700">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-bottle-700">Shop</Link>
        <span>/</span>
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <Reveal>
          <div className="overflow-hidden bg-white ring-1 ring-black/5">
            <div className="relative aspect-square p-6">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-bottle-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  {product.badge}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* Info */}
        <Reveal delay={100}>
          <div className="lg:py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-bottle-700">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 leading-relaxed text-ink/70">
              {product.description}
            </p>

            <AddToCartForm product={product} />

            {/* Details */}
            <div className="mt-10 border-t border-black/10 pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
                Product Details
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1 text-bottle-700">✦</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-2xl font-bold">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
