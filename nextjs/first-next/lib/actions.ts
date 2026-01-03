// # Server Actions

'use server'

import {revalidatePath} from "next/cache"; // learn: revalidatePath is used to invalidate the cache
import {cart} from "./data"

export async function addToCart(productId: string) {
    const existingItem = cart.find(c => c.productId === productId);
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({productId, quantity: 1})
    }
    revalidatePath("/cart")
    return {success: true}
}

export async function removeFromCart(productId: string) {
    const index = cart.findIndex(c => c.productId === productId);
    if(index > -1){
        cart.splice(index, 1);
    }
    revalidatePath("/cart");
    return {success: true}
}

