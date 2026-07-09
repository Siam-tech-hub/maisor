import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-bottle-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-bottle-300">
            Our Story
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Premium panjabis, crafted with care.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-white ring-1 ring-black/5">
                <Image
                  src="/images/panjabi-3-1.jpg"
                  alt="Maisor craftsmanship"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-bold">Premium fabric. Done right.</h2>
            <p className="mt-5 leading-relaxed text-ink/70">
              Maisor was founded on a simple idea: a great panjabi should feel
              as good as it looks. We craft every piece from premium fabric with
              a focus on comfort, fit, and timeless elegance.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              No compromises on quality. Just premium fabrics, honest pricing,
              and designs made for everyday wear and special occasions alike.
            </p>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Premium Fabric",
              d: "Hand-picked fabrics chosen for comfort, drape, and durability.",
            },
            {
              t: "Honest Pricing",
              d: "No middlemen markups. Direct-to-you pricing on every panjabi.",
            },
            {
              t: "Made to Last",
              d: "Fine stitching and quality finish, so it wears beautifully.",
            },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 80}>
              <div className="rounded-2xl border border-black/10 bg-white p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bottle-900 text-white">
                  ✦
                </div>
                <h3 className="mt-5 text-lg font-bold">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
