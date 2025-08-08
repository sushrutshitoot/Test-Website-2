"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { useCart, productToCartItem } from "./cart-context"
import type { Product } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = "default",
}: {
  product: Product
  quantity?: number
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}) {
  const { add } = useCart()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  return (
    <Button
      variant={variant}
      className="gap-2"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          add(productToCartItem(product), quantity)
          toast({
            title: "Added to cart",
            description: `${product.title} ×${quantity}`,
          })
        })
      }
    >
      <ShoppingCart className="h-4 w-4" />
      {isPending ? "Adding..." : "Add to cart"}
    </Button>
  )
}
