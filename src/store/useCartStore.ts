import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MeasurementProfile {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  inseam?: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  basePrice: number;
  color: string;
  material: string;
  measurements: MeasurementProfile;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.basePrice, 0);
      },
    }),
    {
      name: 'endew-cart-storage', // key in local storage
    }
  )
);
