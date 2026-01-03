// # Cart page

import {getCart, getProductById} from '@/lib/data';
import RemoveButton from './RemoveButton';

export default function CartPage() {
    const cartItems = getCart();
    
    if (cartItems.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  let total = 0;
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.map(item => {
        const product = getProductById(item.productId);
        if (!product) return null;
        
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        return (
          <div key={item.productId}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${itemTotal}</p>
            <RemoveButton productId={item.productId} />
            <hr />
          </div>
        );
      })}
      <h2>Total: ${total}</h2>
    </div>
  );

}