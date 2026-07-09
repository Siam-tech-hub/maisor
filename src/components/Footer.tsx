import Link from "next/link";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-bottle-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold uppercase tracking-[0.3em]">Maison</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Modern essentials in bottle green, white & black. Designed for
            everyday wear, built to last.
          </p>
          <div className="mt-6 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs uppercase tracking-[0.2em] text-white/70 underline-offset-4 hover:text-bottle-300 hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-bottle-300">
            Shop
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
            <li><Link href="/shop?category=tees" className="hover:text-white">Tees</Link></li>
            <li><Link href="/shop?category=hoodies" className="hover:text-white">Hoodies</Link></li>
            <li><Link href="/shop?category=jackets" className="hover:text-white">Jackets</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-bottle-300">
            Help
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/contact" className="hover:text-white">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-white">Size Guide</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Maison. All rights reserved.</p>
          <p>Cash on delivery · bKash · Nagad</p>
        </div>
      </div>
    </footer>
  );
}
