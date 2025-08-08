import SiteShell from "@/components/site-shell"
import ProductGrid from "@/components/product-grid"
import ProductCardSkeleton from "@/components/product-card-skeleton"
import { getAllProducts, getByCategory, searchProducts } from "@/lib/products"

export const metadata = {
  title: "Shop — Three Cats",
  description: "Browse the full Three Cats collection.",
}

async function getResults(searchParams: { q?: string; category?: string }) {
  const { q, category } = searchParams
  if (q) return searchProducts(q)
  if (category) return getByCategory(category as any)
  return getAllProducts()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string }
}) {
  const products = await getResults(searchParams)

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Shop</h1>
          <p className="text-muted-foreground">
            {searchParams.q
              ? `Showing results for “${searchParams.q}”`
              : searchParams.category
              ? `Category: ${searchParams.category}`
              : "All products"}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.length === 0 ? (
            <div className="col-span-full grid place-content-center rounded-lg border p-10 text-center text-muted-foreground">
              No products found.
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </SiteShell>
  )
}

export function Loading() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
