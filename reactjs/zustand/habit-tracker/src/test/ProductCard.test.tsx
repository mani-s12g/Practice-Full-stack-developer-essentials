import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ProductCard from '../components/ecommerce/ProductCard'
import type { Product } from '../store/types'
import useCartStore from '../store/cartStore'

const mockProduct: Product = {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    image: '🎧',
    category: 'Electronics',
} as Product

describe('ProductCard Unit Test', () => {
    // Clear the Zustand store before each test run to ensure total isolation
    beforeEach(() => {
        const currentState = useCartStore.getState();

        // Check if your store has a clear/reset action, or manually reset items array
        if ('clearCart' in currentState && typeof currentState.clearCart === 'function') {
            currentState.clearCart();
        } else {
            // Direct state manipulation fallback if no clear method exists
            useCartStore.setState({ items: [] });
        }
    });

    it('renders all product structural elements correctly', () => {
        render(<ProductCard product={mockProduct}/>)
        
        expect(screen.getByRole('heading', {name: 'Wireless Headphones', level: 1 })).toBeInTheDocument();
        expect(screen.getByText('79.99')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();

        const image = screen.getByRole('img', { name: 'Wireless Headphones' });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockProduct.image);

        expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    it('updates the button text reactively when the add action is clicked', async() => {
        render(<ProductCard product={mockProduct}/>)

        const user = userEvent.setup();

        const actionButton = screen.getByRole('button', {name: /add to cart/i});

        // Click the button to trigger addItem(product)
        await user.click(actionButton);

        // The store updates, component rerenders, and finds 'cartItem'
        expect(screen.getByRole('button', {name: /in cart 1/i})).toBeInTheDocument();
    });

    it('reflects the correct quantity if the item is already present in the store on render', () => {
        // Seed the global store manually before mounting the component
        useCartStore.setState({
            items: [{...mockProduct, quantity: 3}],
        });

        render(<ProductCard product={mockProduct} />);
        
        // Verify it instantly maps to the current state quantity
        expect(screen.getByRole('button', {name: /in cart 3/i})).toBeInTheDocument();

    })

})  