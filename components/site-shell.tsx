"use client"

import SiteHeader from "./site-header"
import SiteFooter from "./site-footer"
import { CartProvider } from "./cart-context"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </CartProvider>
  )
}
