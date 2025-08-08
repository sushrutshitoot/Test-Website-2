"use client"

import Image from "next/image"
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from "./cart-context"
import { formatCurrency } from "@/lib/currency"

export default function CartDrawer() {
  const { items, setQty, remove, subtotal, clear } = useCart()

  return (
    <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
      <SheetHeader className="border-b pb-4">
        <SheetTitle>Cart ({items.length})</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="grid h-full place-content-center text-center text-muted-foreground">
            Your cart is empty.
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((i) => (
              <li key={i.id} className="flex gap-3 py-4">
                <div className="relative h-20 w-20 overflow-hidden rounded border">
                  <Image src={i.image || "/placeholder.svg"} alt={i.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{i.title}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(i.price)}</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label={`Remove ${i.title}`} onClick={() => remove(i.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(i.id, Math.max(0, i.quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      className="w-14 text-center"
                      inputMode="numeric"
                      value={i.quantity}
                      onChange={(e) => {
                        const v = parseInt(e.target.value || "0", 10)
                        if (Number.isFinite(v)) setQty(i.id, Math.max(0, v))
                      }}
                      aria-label="Quantity"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Increase quantity"
                      onClick={() => setQty(i.id, i.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <SheetFooter className="border-t pt-4">
        <div className="mt-2 w-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={clear}>
              Clear
            </Button>
            <Button className="flex-1 bg-amber-900 hover:bg-amber-800">Checkout</Button>
          </div>
        </div>
      </SheetFooter>
    </SheetContent>
  )
}
