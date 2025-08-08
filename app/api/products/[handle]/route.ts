import { NextResponse } from "next/server"
import { getProductByHandle } from "@/lib/products"

export async function GET(
  _req: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const product = await getProductByHandle(params.handle)
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
