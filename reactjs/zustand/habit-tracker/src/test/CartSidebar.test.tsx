import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { CartItem } from '../store/types';
import CartSidebar from '../components/ecommerce/CartSidebar';

// 1. Create mock hook variables to spy on executions and seed data dynamically
const mockClearCart = vi.fn();
const mockItems = vi.fn<() => CartItem[]>(() => []);
const mockTotalPrice = vi.fn(() => 0);
const mockTotalItems = vi.fn(() => 0);

// 2. Mock the useCart custom hook
vi.mock('../interfaces/customhooks/useCart', () => ({
    default: () => ({
        items: mockItems(),
        clearCart: mockClearCart,
        totalPrice: mockTotalPrice(),
        totalItems: mockTotalItems(),
    })
}))

// Mock the child CartItemComp so we are strictly testing CartSidebar in isolation
vi.mock('../components/ecommerce/CartItemComp', () => ({
    default: ({item}: {item: CartItem}) => (
        <div data-testid="mock-cart-item">{item.name}</div>
    ),
}))

describe('CartSidebar component Unit Test', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('returns null and does not render anything when isOpen is false', () => {
        const { container } = render(<CartSidebar isOpen={false} onClose={vi.fn()} />);

        // An empty container proves that "if (!isOpen) return null;" fired perfectly
        expect(container.firstChild).toBeNull();
    })

    it('renders the empty state UI correctly when isOpen is true but cart is empty', () => {
    mockItems.mockReturnValue([]);
    mockTotalItems.mockReturnValue(0);
    mockTotalPrice.mockReturnValue(0);

    render(<CartSidebar isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'CartSidebar' })).toBeInTheDocument();
    expect(screen.getByText('Total Items: 0')).toBeInTheDocument();
    expect(screen.getByText('Total Price: 0')).toBeInTheDocument();
    expect(screen.getByText('No items in cart')).toBeInTheDocument();
  });

  it('renders list of child components correctly when cart contains items', () => {
    const fakeItems: CartItem[] = [
      { id: '1', name: 'Wireless Headphones', price: 79.99, image: '🎧', category: 'Electronics', quantity: 1 },
      { id: '2', name: 'Smart Watch', price: 199.99, image: '⌚', category: 'Electronics', quantity: 2 },
    ];
    
    mockItems.mockReturnValue(fakeItems);
    mockTotalItems.mockReturnValue(3);
    mockTotalPrice.mockReturnValue(479.97);

    render(<CartSidebar isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Total Items: 3')).toBeInTheDocument();
    expect(screen.getByText('Total Price: 479.97')).toBeInTheDocument();
    
    // Verify that it rendered exactly 2 mocked child components based on the array map
    const renderedItems = screen.getAllByTestId('mock-cart-item');
    expect(renderedItems).toHaveLength(2);
    expect(renderedItems[0]).toHaveTextContent('Wireless Headphones');
    expect(renderedItems[1]).toHaveTextContent('Smart Watch');
    expect(screen.queryByText('No items in cart')).not.toBeInTheDocument();
  });

  it('triggers clearCart handler callback when clear button is clicked', async () => {
    mockItems.mockReturnValue([]);
    render(<CartSidebar isOpen={true} onClose={vi.fn()} />);
    const user = userEvent.setup();

    const clearButton = screen.getByRole('button', { name: /clear cart/i });
    await user.click(clearButton);

    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose handler callback when close button is clicked', async () => {
    mockItems.mockReturnValue([]);
    const mockOnClose = vi.fn();
    render(<CartSidebar isOpen={true} onClose={mockOnClose} />);
    const user = userEvent.setup();

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

})