export type Product = {
  id: string
  handle: string
  title: string
  description: string
  price: number
  image: string
  category: "Bowls" | "Toys" | "Apparel" | "Treats" | "Bedding" | "Accessories"
  tags?: string[]
  featured?: boolean
}
