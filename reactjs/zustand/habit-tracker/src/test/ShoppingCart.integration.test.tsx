import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import ShoppingCart from '../components/ShoppingCart';
import useCartStore from '../store/cartStore';


describe('Shopping Cart Feature Integration Test', () => {
  // Clear the real global store completely before each run
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('coordinates full data flows from clicking a product card to updating the sidebar metrics', async () => {
    render(<ShoppingCart />);
    const user = userEvent.setup();

    // 1. Verify initial integration layout status
    const cartButton = screen.getByRole('button', { name: /^cart$/i });
    expect(cartButton).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument(); // No badge counter initially

    // 2. Click "Add to Cart" on the Headphones card
    // Note: The product name is rendered inside an <h1> based on your component setup
    const productHeading = screen.getByRole('heading', { name: 'Wireless Headphones', level: 1 });
    expect(productHeading).toBeInTheDocument();

    // Find the button adjacent to our headphones heading (scoped to the card)
    const card = productHeading.closest('div');
    expect(card).toBeInTheDocument();
    
    const addHeadphonesBtn = within(card!).getByRole('button', { name: /add to cart/i });
    await user.click(addHeadphonesBtn);

    // Assert product card text instantly updates state reactively
    expect(within(card!).getByRole('button', { name: /in cart 1/i })).toBeInTheDocument();

    // Assert header badge accurately registers 1 total item
    expect(screen.getByText('1')).toBeInTheDocument();

    // 3. Open the Sidebar to inspect aggregate values
    await user.click(cartButton);

    // Verify the sidebar drawer has physically mounted inside the DOM
    expect(screen.getByRole('heading', { name: 'CartSidebar' })).toBeInTheDocument();
    expect(screen.getByText('Total Items: 1')).toBeInTheDocument();
    expect(screen.getByText('Total Price: 79.99')).toBeInTheDocument();

    // 4. Clear everything via the Sidebar action panel
    const clearBtn = screen.getByRole('button', { name: /clear cart/i });
    await user.click(clearBtn);

    // Assert that the components synced: product card reverts text back
    expect(within(card!).getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.getByText('Total Items: 0')).toBeInTheDocument();
  });
});