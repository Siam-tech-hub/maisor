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
            A modern clothing brand built on restraint.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/black-shirt.jpg"
                alt="Maison craftsmanship"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-bold">Three colors. Done right.</h2>
            <p className="mt-5 leading-relaxed text-ink/70">
              Maison was founded on a simple idea: a wardrobe should be
              effortless. We design every piece in a disciplined palette of
              bottle green, white, and black — so everything mixes, matches, and
              just works.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              No fast-fashion noise. Just premium fabrics, honest pricing, and
              silhouettes built to outlast trends. From heavyweight tees to
              structured hoodies, each piece is made to be worn again and again.
            </p>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Premium Fabric",
              d: "Heavyweight cottons and brushed fleece, chosen for feel and durability.",
            },
            {
              t: "Honest Pricing",
              d: "No middlemen markups. Direct-to-you pricing on every piece.",
            },
            {
              t: "Made to Last",
              d: "Reinforced seams and pre-shrunk fabric, so it keeps its shape.",
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
