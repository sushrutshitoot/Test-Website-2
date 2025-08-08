import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "p-001",
    handle: "whisker-ceramic-bowl",
    title: "Whisker Ceramic Bowl",
    description:
      "Ergonomic, whisker-friendly ceramic bowl designed to reduce stress and improve posture during mealtime.",
    price: 24.0,
    image:
      "/placeholder-egej4.png",
    category: "Bowls",
    tags: ["dishwasher-safe", "non-slip"],
    featured: true,
  },
  {
    id: "p-002",
    handle: "triple-paw-feeder",
    title: "Triple Paw Elevated Feeder",
    description:
      "Adjustable elevated feeder for multi-cat households. Includes anti-slip pads and removable bowls.",
    price: 69.0,
    image:
      "/elevated-cat-feeder.png",
    category: "Bowls",
    tags: ["elevated", "multi-cat"],
    featured: true,
  },
  {
    id: "p-003",
    handle: "midnight-pounce-teaser",
    title: "Midnight Pounce Teaser",
    description:
      "Feather teaser with carbon-flex rod for irresistible bounce and durability.",
    price: 16.0,
    image:
      "/placeholder-2okxe.png",
    category: "Toys",
    tags: ["interactive", "exercise"],
    featured: true,
  },
  {
    id: "p-004",
    handle: "cosmic-catnip-comets",
    title: "Cosmic Catnip Comets",
    description:
      "Premium catnip-stuffed plush set with soft cotton and embroidered details.",
    price: 14.0,
    image:
      "/placeholder-x8iws.png",
    category: "Toys",
    tags: ["plush", "catnip"],
  },
  {
    id: "p-005",
    handle: "three-cats-knit-sweater",
    title: "Three Cats Knit Sweater",
    description:
      "Soft knit sweater with breathable weave and stretch cuffs. Cozy and adorable.",
    price: 39.0,
    image:
      "/cat-sweater-flatlay.png",
    category: "Apparel",
    tags: ["cozy", "seasonal"],
    featured: true,
  },
  {
    id: "p-006",
    handle: "velvet-nap-bed",
    title: "Velvet Nap Bed",
    description:
      "Memory foam cushion with washable velvet cover—luxury comfort for daily naps.",
    price: 89.0,
    image:
      "/velvet-cat-bed.png",
    category: "Bedding",
    tags: ["washable", "memory-foam"],
    featured: true,
  },
  {
    id: "p-007",
    handle: "salmon-crunch-treats",
    title: "Salmon Crunch Treats",
    description:
      "High-protein, oven-baked treats with responsibly sourced salmon.",
    price: 12.0,
    image:
      "/cat-treats-salmon-minimal-bag.png",
    category: "Treats",
    tags: ["grain-free", "single-ingredient"],
  },
  {
    id: "p-008",
    handle: "silhouette-laser-pointer",
    title: "Silhouette Laser Pointer",
    description:
      "USB-C rechargeable laser pointer with soft grip and safety lock.",
    price: 22.0,
    image:
      "/placeholder-02ipd.png",
    category: "Toys",
    tags: ["usb-c", "interactive"],
  },
  {
    id: "p-009",
    handle: "whisker-safe-harness",
    title: "Whisker-Safe Harness",
    description:
      "Escape-resistant adjustable harness with breathable mesh and reflective accents.",
    price: 35.0,
    image:
      "/placeholder-cyzvz.png",
    category: "Apparel",
  },
  {
    id: "p-010",
    handle: "porch-sun-mat",
    title: "Porch Sun Mat",
    description:
      "Low-profile mat with cooling fibers—perfect for sunbeam lounging.",
    price: 28.0,
    image:
      "/minimal-woven-mat.png",
    category: "Bedding",
  },
  {
    id: "p-011",
    handle: "charmer-feather-pack",
    title: "Charmer Feather 3-Pack",
    description:
      "Replaceable feather heads compatible with our teaser rods.",
    price: 9.0,
    image:
      "/placeholder.svg?height=900&width=1200",
    category: "Accessories",
  },
  {
    id: "p-012",
    handle: "treat-pouch-crossbody",
    title: "Treat Pouch Crossbody",
    description:
      "Water-resistant crossbody with treat pocket and waste-bag dispenser.",
    price: 32.0,
    image:
      "/placeholder.svg?height=900&width=1200",
    category: "Accessories",
  },
]

export async function getAllProducts() {
  // Simulate server data fetching; in real projects, fetch from a DB or API.
  return products
}

export async function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}

export async function getProductByHandle(handle: string) {
  return products.find((p) => p.handle === handle) || null
}

export async function searchProducts(query: string) {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  )
}

export async function getByCategory(category: Product["category"]) {
  return products.filter((p) => p.category === category)
}

export const categories: Product["category"][] = [
  "Bowls",
  "Toys",
  "Apparel",
  "Treats",
  "Bedding",
  "Accessories",
]
