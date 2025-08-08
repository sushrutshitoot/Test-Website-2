import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/currency"
import type { Product } from "@/lib/types"
import AddToCartButton from "./add-to-cart-button"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden border-muted/60 hover:shadow-md transition-shadow">
      <Link href={`/products/${product.handle}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-tr from-amber-50 to-rose-50">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              priority={product.featured}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="space-y-2 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium truncate">{product.title}</h3>
          <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full px-2">
            {product.category}
          </Badge>
          {product.featured ? <Badge className="rounded-full px-2">Featured</Badge> : null}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {/* AddToCart is a client component; card itself is a server component */}
        <AddToCartButton product={product} variant="secondary" />
      </CardFooter>
    </Card>
  )
}
