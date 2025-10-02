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
  supplierId?: number; // Add this
  supplierName?: string; // Add this
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<{ success: boolean; message?: string }>;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: async (item) => {
        const currentItems = get().items;
        
        // If cart is empty, just add the item
        if (currentItems.length === 0) {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
          return { success: true };
        }

        // Check if item already exists in cart
        const existingItem = currentItems.find((i) => i.id === item.id);
        if (existingItem) {
          // Just increase quantity
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
          return { success: true };
        }

        // Check if new item is from same supplier
        const firstItem = currentItems[0];
        
        // Fetch both products to compare suppliers
        try {
          const [existingProduct, newProduct] = await Promise.all([
            fetch(`/api/products/${firstItem.id}`).then(r => r.json()),
            fetch(`/api/products/${item.id}`).then(r => r.json())
          ]);

          if (existingProduct.supplierId !== newProduct.supplierId) {
            return {
              success: false,
              message: `Cannot mix suppliers in one order. Your cart has items from ${existingProduct.supplier?.name}. This item is from ${newProduct.supplier?.name}. Please complete your current order first, or clear your cart.`
            };
          }

          // Same supplier, add the item
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1, supplierId: newProduct.supplierId, supplierName: newProduct.supplier?.name }],
          }));
          return { success: true };
        } catch (error) {
          console.error('Error checking suppliers:', error);
          // If API fails, allow the add but warn
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
          return { success: true };
        }
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
    }),
    {
      name: 'cart-storage',
    }
  )
);