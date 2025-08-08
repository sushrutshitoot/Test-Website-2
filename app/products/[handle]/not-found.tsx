import SiteShell from "@/components/site-shell"

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">The product you are looking for may be unavailable.</p>
        <a href="/search" className="mt-6 inline-flex items-center rounded-md border px-4 py-2 text-sm">
          Browse products
        </a>
      </div>
    </SiteShell>
  )
}
