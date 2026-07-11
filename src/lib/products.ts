export type Category = "panjabi" | "tshirt";

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
  { id: "panjabi", label: "Panjabi" },
  { id: "tshirt", label: "T-Shirt" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Designer Panjabi",
    slug: "designer-panjabi",
    price: 1500,
    category: "panjabi",
    image: "/images/panjabi-1-1.jpg",
    images: ["/images/panjabi-1-1.jpg", "/images/panjabi-1-2.jpg", "/images/panjabi-1-3.jpg"],
    description:
      "Elegant designer panjabi crafted with premium fabric. A refined look perfect for festive and special occasions.",
    details: [
      "Premium quality fabric",
      "Comfortable regular fit",
      "Fine stitching & finish",
      "Perfect for festive wear",
    ],
    sizes: ["38", "40", "42", "44"],
    badge: "New",
    featured: true,
  },
  {
    id: "2",
    name: "Premium Panjabi",
    slug: "premium-panjabi",
    price: 2000,
    category: "panjabi",
    image: "/images/panjabi-2-1.jpg",
    images: [
      "/images/panjabi-2-1.jpg",
      "/images/panjabi-2-2.jpg",
      "/images/panjabi-2-3.jpg",
    ],
    description:
      "Our most luxurious panjabi. Rich fabric with an elegant drape — designed to make a statement.",
    details: [
      "Luxury-grade fabric",
      "Elegant drape & fall",
      "Reinforced stitching",
      "Ideal for weddings & Eid",
    ],
    sizes: ["38", "40", "42", "44"],
    badge: "Bestseller",
    featured: true,
  },
  {
    id: "3",
    name: "Classic Panjabi",
    slug: "classic-panjabi",
    price: 1200,
    category: "panjabi",
    image: "/images/panjabi-3-1.jpg",
    images: ["/images/panjabi-3-1.jpg", "/images/panjabi-3-2.jpg"],
    description:
      "A timeless classic panjabi for everyday elegance. Simple, comfortable, and effortlessly stylish.",
    details: [
      "Soft breathable fabric",
      "Classic regular fit",
      "Easy-care material",
      "Great for daily wear",
    ],
    sizes: ["38", "40", "42", "44"],
    featured: true,
  },
  {
    id: "4",
    name: "Stylish Panjabi",
    slug: "stylish-panjabi",
    price: 1400,
    category: "panjabi",
    image: "/images/panjabi-4-1.jpg",
    images: ["/images/panjabi-4-1.jpg", "/images/panjabi-4-2.jpg", "/images/panjabi-4-3.jpg"],
    description:
      "A modern stylish panjabi with a contemporary cut. Stand out with a sleek, fashionable look.",
    details: [
      "Modern contemporary cut",
      "Soft premium fabric",
      "Tailored fit",
      "Perfect for casual & semi-formal",
    ],
    sizes: ["38", "40", "42", "44"],
    featured: true,
  },
  {
    id: "5",
    name: "Essential Panjabi",
    slug: "essential-panjabi",
    price: 1200,
    category: "panjabi",
    image: "/images/panjabi-5-1.jpg",
    images: ["/images/panjabi-5-1.jpg"],
    description:
      "The essential everyday panjabi. Clean design, comfortable fit, and great value.",
    details: [
      "Everyday comfort fabric",
      "Regular fit",
      "Durable & long-lasting",
      "Excellent value",
    ],
    sizes: ["38", "40", "42", "44"],
    featured: true,
  },
  {
    id: "6",
    name: "Drop Shoulder T-Shirt",
    slug: "drop-shoulder-t-shirt",
    price: 650,
    category: "tshirt",
    image: "/images/tshirt-1-1.jpg",
    images: ["/images/tshirt-1-1.jpg", "/images/tshirt-1-2.jpg"],
    description:
      "Premium drop shoulder t-shirt - relaxed fit, soft breathable fabric, perfect for everyday streetwear. Minimal, comfortable, and effortlessly stylish.",
    details: [
      "Premium 180 GSM cotton",
      "Drop shoulder relaxed fit",
      "Soft & breathable fabric",
      "Durable stitching",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    featured: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return "৳" + amount.toLocaleString("en-US");
}
