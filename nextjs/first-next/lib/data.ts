// # Mock data

import {Product, CartItem} from "@/types"

export const products: Product[] = [
    { id: '1', name: 'Laptop', price: 999, stock: 5 },
    { id: '2', name: 'Mouse', price: 29, stock: 15 },
    { id: '3', name: 'Keyboard', price: 79, stock: 10 },
]

// In-memory cart storage (resets on server restart)
export const cart: CartItem[] = [];

export function getProducts() {
    return products;
}

export function getProductById (id: string) {
    return products.find(p => p.id === id);
}

export function getCart() {
  return cart;
}

