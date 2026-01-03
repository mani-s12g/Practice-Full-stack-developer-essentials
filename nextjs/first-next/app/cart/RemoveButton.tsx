'use client'

import { removeFromCart } from "@/lib/actions"

export default function RemoveButton({productId}: {productId: string}) {
    async function handleRemove() {
        await removeFromCart(productId);
    }

    return (
        <button onClick={handleRemove}>
            Remove
        </button>
    )
}