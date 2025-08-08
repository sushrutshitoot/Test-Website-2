import Hero from "@/components/hero"
import CategoryGrid from "@/components/category-grid"
import ProductGrid from "@/components/product-grid"
import ProductCardSkeleton from "@/components/product-card-skeleton"
import SiteShell from "@/components/site-shell"
import { getFeaturedProducts } from "@/lib/products"
import { Suspense } from "react"

async function Featured() {
  const featured = await getFeaturedProducts()
  return <ProductGrid products={featured} />
}

export const metadata = {
  title: "Three Cats — Thoughtful essentials for happy cats",
  description: "Modern cat bowls, toys, beds, and more.",
}

export default function HomePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-8 sm:px-6 md:py-12">
        <Hero />
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
              <p className="text-muted-foreground">Find the perfect essentials for your cats.</p>
            </div>
          </div>
          <CategoryGrid />
        </section>
        <section id="featured" className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
              <p className="text-muted-foreground">Editor’s picks and customer favorites.</p>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            {/* Server component */}
            <Featured />
          </Suspense>
        </section>

        <section id="about" className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">About Three Cats</h2>
          <p className="max-w-prose text-muted-foreground">
            We design cat essentials that balance comfort, function, and timeless style. Our collections are
            whisker-friendly, durable, and made to look good in your home.
          </p>
        </section>
        <section id="contact" className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
          <p className="max-w-prose text-muted-foreground">
            Questions or wholesale inquiries? Email us at hello@threecats.example.
          </p>
        </section>
      </div>
    </SiteShell>
  )
}
