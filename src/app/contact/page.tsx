import Reveal from "@/components/Reveal";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Inside Dhaka: 1–2 days. Outside Dhaka: 2–4 days. Orders are dispatched within 48 hours.",
    },
    {
      q: "Do you offer Cash on Delivery?",
      a: "Yes — COD is available across all of Bangladesh. bKash and Nagad are also accepted.",
    },
    {
      q: "What is your exchange policy?",
      a: "Easy 7-day exchange on unworn items in original condition. Size swaps are free.",
    },
    {
      q: "How do I find my size?",
      a: "Each product page lists available sizes. If you're between sizes, we recommend sizing up for a relaxed fit.",
    },
  ];

  return (
    <>
      <section className="bg-bottle-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-bottle-300">
            We're here to help
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Get in touch</h1>
          <p className="mt-4 max-w-md text-white/70">
            Questions about an order, sizing, or anything else? Reach out and
            we'll get back to you quickly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold">Contact details</h2>
              <div className="mt-6 space-y-5">
                {[
                  { l: "Email", v: "hello@maison.store" },
                  { l: "Phone / WhatsApp", v: "+880 1XXX-XXXXXX" },
                  { l: "Hours", v: "Sat–Thu, 10am – 8pm" },
                ].map((c) => (
                  <div key={c.l} className="border-l-2 border-bottle-500 pl-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/40">
                      {c.l}
                    </p>
                    <p className="mt-1 font-medium">{c.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                {["Instagram", "Facebook", "TikTok"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-full border border-black/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink/70 hover:border-bottle-500 hover:text-bottle-700"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <form
              className="rounded-3xl border border-black/10 bg-white p-8"
              action="#"
              method="post"
            >
              <h2 className="text-xl font-bold">Send a message</h2>
              <div className="mt-6 space-y-4">
                <input
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-black/15 bg-cream px-4 py-3 text-sm outline-none focus:border-bottle-500"
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-xl border border-black/15 bg-cream px-4 py-3 text-sm outline-none focus:border-bottle-500"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Your message"
                  className="w-full rounded-xl border border-black/15 bg-cream px-4 py-3 text-sm outline-none focus:border-bottle-500"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-bottle-900 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold">Frequently asked</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div className="rounded-2xl border border-black/10 bg-white p-6">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
