import { useState } from "react";
import useCart from "../interfaces/customhooks/useCart";
import CartSidebar from "./ecommerce/CartSidebar";
import ProductCard from "./ecommerce/ProductCard";
import type { Product } from "../store/types";


const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    image: '🎧',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: '⌚',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 49.99,
    image: '💻',
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Coffee Mug',
    price: 14.99,
    image: '☕',
    category: 'Home',
  },
  {
    id: '5',
    name: 'Desk Lamp',
    price: 34.99,
    image: '💡',
    category: 'Home',
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: '⌨️',
    category: 'Electronics',
  },
];


const ShoppingCart: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems, totalPrice } = useCart();
    return (
        <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">ShopZustand</h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {/* <ShoppingCart size={20} /> */}
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
    )
}

export default ShoppingCart