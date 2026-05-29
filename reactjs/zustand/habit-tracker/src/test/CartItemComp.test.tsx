import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CartItemComp from "../components/ecommerce/CartItemComp"
import type { CartItem } from '../store/types'
// import useCart from "../interfaces/customhooks/useCart";

// 1. Create mock functions to track executions (spies)
const mockRemoveItem = vi.fn();
const mockUpdateQuantity = vi.fn();

// 2. Mock the custom hook to return our spy functions
vi.mock('../interfaces/customhooks/useCart', () => ({
    default: () => ({
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
    })
}))

const mockCartItem: CartItem = {
  id: 'cart-123',
  name: 'Mechanical Keyboard',
  price: 129.99,
  image: 'https://via.placeholder.com/150',
  category: 'Electronics',
  quantity: 2,
} 

describe('CartItemComp Unit Test', () => {
  beforeEach(() => {
    // Clear mock execution data between individual tests
    vi.clearAllMocks();
  });

  it('renders all cart item values correctly from props', () => {
    render(<CartItemComp item={mockCartItem} />);

    expect(screen.getByRole('heading', {name: 'Mechanical Keyboard', level: 1})).toBeInTheDocument();
    expect(screen.getByText('129.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Displays current quantity

    const image = screen.getByRole('img', {name: 'Mechanical Keyboard'});
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCartItem.image);
  });

  it('calls removeItem with correct ID when the Remove button is clicked', async() => {
    render(<CartItemComp item={mockCartItem}/>);

    const user = userEvent.setup();
    const removeButton = screen.getByRole('button', {name: /remove/i });

    await user.click(removeButton);

    // Asserts that the hook handler was invoked with the items specific ID
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith(mockCartItem.id);    
  });

  it('calls updateQuantity with incremented quantity value when clicking the + button', async() => {
    render(<CartItemComp item={mockCartItem}/>);

    const user = userEvent.setup();
    const incrementButton = screen.getByRole('button', {name: '+'});

    await user.click(incrementButton);

    expect(mockUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem.id, mockCartItem.quantity + 1);
  });
  
  it('calls updateQuantity with decremented quantity value when clicking the - button', async() => {
    render(<CartItemComp item={mockCartItem}/>);

    const user = userEvent.setup();
    const decrementButton = screen.getByRole('button', {name: '-'});

    await user.click(decrementButton);

    expect(mockUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem.id, mockCartItem.quantity - 1);
  });

});