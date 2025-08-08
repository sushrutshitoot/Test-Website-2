import Image from "next/image"
import Link from "next/link"
import SiteShell from "@/components/site-shell"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductGrid from "@/components/product-grid"
import { getAllProducts, getProductByHandle } from "@/lib/products"
import { formatCurrency } from "@/lib/currency"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle)
  if (!product) return {}
  return {
    title: `${product.title} — Three Cats`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle)
  if (!product) notFound()

  const others = (await getAllProducts()).filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-tr from-amber-50 to-rose-50 ring-1 ring-border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Link href="/search" className="text-sm text-muted-foreground hover:underline">
                ← Back to shop
              </Link>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold">{formatCurrency(product.price)}</span>
                <Badge variant="secondary" className="rounded-full px-2">
                  {product.category}
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="flex gap-3">
              <AddToCartButton product={product} quantity={1} />
              <Link href="/search" className="inline-flex items-center rounded-md border px-4 py-2 text-sm">
                Continue shopping
              </Link>
            </div>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              <li>30-day returns</li>
              <li>Free shipping over $75</li>
              <li>Secure checkout</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 space-y-4">
          <h2 className="text-2xl font-bold">You might also like</h2>
          <ProductGrid products={others} />
        </div>
      </div>
    </SiteShell>
  )
}
