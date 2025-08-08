"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { PawPrint } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function SiteFooter() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      toast({ title: "Invalid email", description: "Please enter a valid email address." })
      return
    }
    toast({ title: "Subscribed", description: "Thanks for joining the Three Cats newsletter!" })
    setEmail("")
  }

  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200">
                <PawPrint className="h-5 w-5 text-amber-900" />
              </div>
              <span>Three Cats</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Thoughtful essentials for happy cats. Designed for comfort, crafted for homes.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/search">Shop</Link>
              </li>
              <li>
                <Link href="/#featured">Featured</Link>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Stay in the loop</h4>
            <form onSubmit={onSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <Button className="bg-amber-900 hover:bg-amber-800">Subscribe</Button>
            </form>
          </div>
        </div>

        <Separator className="my-6" />
        <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Three Cats. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Privacy Policy">
              Privacy
            </a>
            <a href="#" aria-label="Terms of Service">
              Terms
            </a>
            <a href="#" aria-label="Accessibility Statement">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
