import useCart from "../../interfaces/customhooks/useCart";
import CartItemComp from "./CartItemComp";

const CartSidebar: React.FC<{isOpen: boolean; onClose: () => void}> =({isOpen, onClose}) => {
    const {items, clearCart, totalPrice, totalItems} = useCart()
    if (!isOpen) return null;
    return (
        <div>
            {isOpen && <h1>CartSidebar</h1>}
            {isOpen && <p>Total Items: {totalItems}</p>}
            {isOpen && <p>Total Price: {totalPrice}</p>}
            {isOpen && <button onClick={clearCart}>Clear Cart</button>}
            {isOpen && <button onClick={onClose}>Close</button>}
            {isOpen && items.length > 0 ? (<div>
                {items.map(item => (
                    <CartItemComp key={item.id} item={item} />
                ))}
            </div>) : <p>No items in cart</p>}
        </div>
    )
}

export default CartSidebar
