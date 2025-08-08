"use client"

import { createContext, useContext, useEffect, useMemo, useReducer } from "react"
import type { Product } from "@/lib/types"

export type CartItem = {
  id: string
  handle: string
  title: string
  price: number
  image: string
  quantity: number
}

type State = { items: CartItem[] }
type Action =
  | { type: "ADD"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "SET_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const qty = action.payload.quantity ?? 1
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + qty } : i
          ),
        }
      }
      return { items: [...state.items, { ...action.payload, quantity: qty }] }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload.id) }
    case "SET_QTY":
      return {
        items: state.items
          .map((i) => (i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i))
          .filter((i) => i.quantity > 0),
      }
    case "CLEAR":
      return { items: [] }
    default:
      return state
  }
}

const CartContext = createContext<
  | (State & {
      add: (p: Omit<CartItem, "quantity">, quantity?: number) => void
      remove: (id: string) => void
      setQty: (id: string, quantity: number) => void
      clear: () => void
      subtotal: number
      count: number
    })
  | null
>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  // Persist to localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("three-cats:cart")
      if (raw) {
        const parsed = JSON.parse(raw) as State
        if (Array.isArray(parsed.items)) {
          parsed.items.forEach((i) => {
            // hydrate
            dispatch({ type: "ADD", payload: { ...i } })
            dispatch({ type: "SET_QTY", payload: { id: i.id, quantity: i.quantity } })
          })
        }
      }
    } catch {
      // ignore parse errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("three-cats:cart", JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const api = useMemo(() => {
    const add = (p: Omit<CartItem, "quantity">, quantity?: number) =>
      dispatch({ type: "ADD", payload: { ...p, quantity } })
    const remove = (id: string) => dispatch({ type: "REMOVE", payload: { id } })
    const setQty = (id: string, quantity: number) =>
      dispatch({ type: "SET_QTY", payload: { id, quantity } })
    const clear = () => dispatch({ type: "CLEAR" })
    const subtotal = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
    const count = state.items.reduce((acc, i) => acc + i.quantity, 0)
    return { ...state, add, remove, setQty, clear, subtotal, count }
  }, [state])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

// Helper to convert a Product to a cart item payload
export function productToCartItem(p: Product) {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    price: p.price,
    image: p.image,
  }
}
