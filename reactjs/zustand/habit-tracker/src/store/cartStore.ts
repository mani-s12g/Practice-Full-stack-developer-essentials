import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { CartState } from './types';

// ==================== ZUSTAND STORE ====================
const useCartStore = create<CartState>()(
  devtools(
    persist(
      immer((set, get) => ({
        items: [],

        addItem: (product) => {
          set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id);
            
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              state.items.push({ ...product, quantity: 1 });
            }
          });
        },

        removeItem: (id) => {
          set((state) => {
            state.items = state.items.filter((item) => item.id !== id);
          });
        },

        updateQuantity: (id, quantity) => {
          if (quantity <= 0) {
            get().removeItem(id);
            return;
          }
          
          set((state) => {
            const item = state.items.find((item) => item.id === id);
            if (item) {
              item.quantity = quantity;
            }
          });
        },

        clearCart: () => {
          set({ items: [] });
        },

        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        getTotalPrice: () => {
          return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
      })),
      {
        name: 'cart-storage',
      }
    ),
    { name: 'CartStore' }
  )
);

export default useCartStore;
