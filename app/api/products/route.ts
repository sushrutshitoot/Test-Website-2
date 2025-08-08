import { NextResponse } from "next/server"
import { getAllProducts, searchProducts, getByCategory } from "@/lib/products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")
  const category = searchParams.get("category")

  try {
    if (q) {
      const results = await searchProducts(q)
      return NextResponse.json(results)
    }
    if (category) {
      const results = await getByCategory(category as any)
      return NextResponse.json(results)
    }
    const all = await getAllProducts()
    return NextResponse.json(all)
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
