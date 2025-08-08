"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PawPrint, ShoppingBag, Menu, SearchIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartDrawer from "./cart-drawer"
import { useCart } from "./cart-context"
import { cn } from "@/lib/utils"

export default function SiteHeader({
  className = "",
}: {
  className?: string
}) {
  const { count } = useCart()
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const q = params.get("q") || ""

  const onSearch = (formData: FormData) => {
    const query = String(formData.get("q") || "").trim()
    router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`)
  }

  return (
    <header className={cn("sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200">
            <PawPrint className="h-5 w-5 text-amber-900" />
          </div>
          <span>Three Cats</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 md:flex">
          <Link className={navClass(pathname === "/")} href="/">
            Home
          </Link>
          <Link className={navClass(pathname?.startsWith("/search"))} href="/search">
            Shop
          </Link>
          <Link className={navClass(false)} href="#about">
            About
          </Link>
          <Link className={navClass(false)} href="#contact">
            Contact
          </Link>
        </nav>

        <form action={onSearch} className="ml-auto hidden items-center gap-2 sm:flex">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input name="q" defaultValue={q} placeholder="Search products..." className="pl-8 w-[220px] md:w-[280px]" />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open cart">
                <ShoppingBag className="h-5 w-5" />
                {count > 0 ? (
                  <span className="sr-only">{`${count} items in cart`}</span>
                ) : (
                  <span className="sr-only">Cart</span>
                )}
              </Button>
            </SheetTrigger>
            <CartDrawer />
          </Sheet>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => router.push("/search")}
            aria-label="Open search"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

function navClass(active: boolean) {
  return cn(
    "text-sm transition-colors hover:text-foreground",
    active ? "text-foreground" : "text-muted-foreground"
  )
}
