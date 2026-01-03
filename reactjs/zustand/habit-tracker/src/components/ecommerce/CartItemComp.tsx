import useCart from "../../interfaces/customhooks/useCart";
import type { CartItem } from "../../store/types";

const CartItemComp: React.FC<{item: CartItem}> = ({item}) => {
    const {removeItem, updateQuantity} = useCart()
    return (
        <div>
            <h1>{item.name}</h1>
            <p>{item.price}</p>
            <img src={item.image} alt={item.name} />
            <p>{item.category}</p>
            <p>{item.quantity}</p>
            <button onClick={() => removeItem(item.id)}>Remove</button>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        </div>
    )
}

export default CartItemComp