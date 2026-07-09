export type Category = "tees" | "shirts" | "hoodies" | "jackets" | "pants";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: Category;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
  badge?: string;
  featured?: boolean;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "tees", label: "Tees" },
  { id: "shirts", label: "Shirts" },
  { id: "hoodies", label: "Hoodies" },
  { id: "jackets", label: "Jackets" },
  { id: "pants", label: "Pants" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Emerald Oversized Tee",
    slug: "emerald-oversized-tee",
    price: 1290,
    category: "tees",
    image: "/images/emerald-tee.jpg",
    images: ["/images/emerald-tee.jpg"],
    description:
      "A relaxed, heavyweight oversized tee in rich emerald green. Cut from breathable premium cotton with a dropped shoulder and a clean modern drape.",
    details: [
      "240 GSM heavyweight cotton",
      "Relaxed oversized fit",
      "Dropped shoulder seams",
      "Pre-shrunk fabric",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    featured: true,
  },
  {
    id: "2",
    name: "Classic Black Shirt",
    slug: "classic-black-shirt",
    price: 1890,
    category: "shirts",
    image: "/images/black-shirt.jpg",
    images: ["/images/black-shirt.jpg"],
    description:
      "A timeless black button-up with a sharp, tailored silhouette. The everyday essential that works from desk to dinner.",
    details: [
      "Soft brushed cotton blend",
      "Tailored regular fit",
      "Mother-of-pearl buttons",
      "Reinforced collar",
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "3",
    name: "Bottle Green Hoodie",
    slug: "bottle-green-hoodie",
    price: 2490,
    category: "hoodies",
    image: "/images/green-hoodie.jpg",
    images: ["/images/green-hoodie.jpg"],
    description:
      "Our signature hoodie in deep bottle green. Heavyweight fleece with a brushed-back interior for an ultra-soft, structured feel.",
    details: [
      "400 GSM brushed fleece",
      "Boxy, comfortable fit",
      "Double-lined hood",
      "Ribbed cuffs & hem",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Bestseller",
    featured: true,
  },
  {
    id: "4",
    name: "Minimal White Tee",
    slug: "minimal-white-tee",
    price: 990,
    category: "tees",
    image: "/images/white-tee.jpg",
    images: ["/images/white-tee.jpg"],
    description:
      "The perfect plain white tee. Clean, crisp, and built to last from smooth combed cotton with a classic crew neck.",
    details: [
      "200 GSM combed cotton",
      "Classic regular fit",
      "Ribbed crew neck",
      "Tagless comfort",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
  },
  {
    id: "5",
    name: "Premium Black Bomber",
    slug: "premium-black-bomber",
    price: 3290,
    category: "jackets",
    image: "/images/black-jacket.jpg",
    images: ["/images/black-jacket.jpg"],
    description:
      "A sleek black bomber jacket with a matte finish and ribbed trims. Lightweight, wind-resistant, and effortlessly cool.",
    details: [
      "Water-repellent outer shell",
      "Quilted lining",
      "YKK metal zipper",
      "Ribbed cuffs & waistband",
    ],
    sizes: ["S", "M", "L", "XL"],
    badge: "New",
    featured: true,
  },
  {
    id: "6",
    name: "Olive Cargo Pants",
    slug: "olive-cargo-pants",
    price: 1750,
    category: "pants",
    image: "/images/olive-cargo.jpg",
    images: ["/images/olive-cargo.jpg"],
    description:
      "Utility meets style. These olive cargo pants feature a tapered leg, six pockets, and a sturdy cotton-twill build.",
    details: [
      "Cotton twill, mid-weight",
      "Tapered utility fit",
      "Six functional pockets",
      "Adjustable ankle cuff",
    ],
    sizes: ["30", "32", "34", "36", "38"],
    featured: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return "৳" + amount.toLocaleString("en-US");
}
