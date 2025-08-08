import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-100 via-rose-50 to-white">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
              New arrivals
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Three Cats
              <span className="block font-medium text-muted-foreground">
                Thoughtful essentials for happy cats.
              </span>
            </h1>
            <p className="max-w-prose text-muted-foreground">
              Elevated feeders, cozy beds, and playful toys—curated for multi-cat homes. Built with comfort, quality,
              and style in mind.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-amber-900 hover:bg-amber-800">
                <Link href="/#featured">Shop featured</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/search?q=toy">Explore toys</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-tr from-amber-50 to-rose-50 ring-1 ring-border">
            {/* Decorative product collage using placeholders */}
            <img
              src={
                "/placeholder.svg?height=900&width=900&query=cat%20products%20collage%20minimal%20styled%20scene"
               || "/placeholder.svg"}
              alt="Collage of Three Cats products"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
