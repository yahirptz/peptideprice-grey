import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  slug: string;
  dosage: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  supplierId?: number | null;
  supplierLabel?: string;
  supplierShippingCost?: number;
}

interface CartSupplier {
  id: number | null;
  label: string | null;
  shippingCost: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartSupplier: () => CartSupplier | null;
  getShippingCost: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartSupplier: () => {
        const items = get().items;
        if (items.length === 0) return null;
        
        return {
          id: items[0].supplierId || null,
          label: items[0].supplierLabel || null,
          shippingCost: items[0].supplierShippingCost || 0
        };
      },

      getShippingCost: () => {
        const supplier = get().getCartSupplier();
        return supplier?.shippingCost || 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
