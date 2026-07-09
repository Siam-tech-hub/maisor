import Link from "next/link";
import Image from "next/image";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/maisor_official" },
  { label: "Facebook", href: "https://www.facebook.com/share/1HZmCaEBZk/" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-bottle-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="md:col-span-2">
          {/* Logo */}
          <div className="inline-flex items-center rounded-2xl bg-white p-3">
            <Image
              src="/images/logo.png"
              alt="Maisor"
              width={56}
              height={120}
              className="h-28 w-auto object-contain"
              priority
            />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Premium panjabis crafted with care. Elegant, comfortable, and
            perfect for every occasion.
          </p>
          <div className="mt-6 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
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
            <li><Link href="/shop?category=panjabi" className="hover:text-white">Panjabi</Link></li>
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
          <p>© {new Date().getFullYear()} Maisor. All rights reserved.</p>
          <p>Cash on delivery · bKash · Nagad</p>
        </div>
      </div>
    </footer>
  );
}
