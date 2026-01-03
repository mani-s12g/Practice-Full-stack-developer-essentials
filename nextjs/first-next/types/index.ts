// # TypeScript types

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    // image: string;
    // description: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}
