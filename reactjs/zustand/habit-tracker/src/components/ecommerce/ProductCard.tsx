import type React from "react"
import type { Product } from "../../store/types"
import useCartStore from "../../store/cartStore"

const ProductCard: React.FC<{product: Product}> = ({product}) => {
    // const items = useCartStore((state) => state.items);
    // or
    const {addItem, items} = useCartStore();
    const cartItem = items.find(item => item.id == product.id);
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <img src={product.image} alt={product.name} />
            <p>{product.category}</p>
            <button onClick={() => addItem(product)}>
                {cartItem ? `In cart ${cartItem.quantity}` : "Add to Cart"}
            </button>
        </div>
    )
}

export default ProductCard