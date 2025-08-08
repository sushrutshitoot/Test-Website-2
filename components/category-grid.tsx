import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const cats = [
  {
    name: "Bowls",
    href: "/search?category=Bowls",
    image:
      "/placeholder.svg?height=800&width=1200",
  },
  {
    name: "Toys",
    href: "/search?category=Toys",
    image:
      "/placeholder.svg?height=800&width=1200",
  },
  {
    name: "Apparel",
    href: "/search?category=Apparel",
    image:
      "/placeholder.svg?height=800&width=1200",
  },
  {
    name: "Bedding",
    href: "/search?category=Bedding",
    image:
      "/placeholder.svg?height=800&width=1200",
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cats.map((c) => (
        <Link key={c.name} href={c.href}>
          <Card className="overflow-hidden border-muted/60 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={c.image || "/placeholder.svg"}
                  alt={`${c.name} category`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="font-medium">{c.name}</h3>
                <span aria-hidden className="text-muted-foreground">→</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
