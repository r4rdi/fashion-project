import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  getProduct: (id: string) => Product | undefined;
  removeProduct: (id: string) => void;
}

const initialMockProducts: Product[] = [
  {
    id: "mock-1",
    name: "Classic Oxford Shirt",
    description: "A timeless, versatile shirt made from premium breathable cotton. Tailored perfectly to your unique measurements.",
    basePrice: 850000,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=500&q=80"
  },
  {
    id: "mock-2",
    name: "Custom Tailored Suit",
    description: "Experience the peak of sartorial elegance with our bespoke two-piece suit. Engineered for a flawless, sculpted fit.",
    basePrice: 3500000,
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80"
  },
  {
    id: "mock-3",
    name: "Linen Summer Trousers",
    description: "Lightweight, airy linen trousers designed for warm weather without compromising on refined style.",
    basePrice: 950000,
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80"
  }
];

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialMockProducts,
      addProduct: (product) => set((state) => ({ 
        products: [...state.products, { ...product, id: `prod-${Date.now()}` }] 
      })),
      getProduct: (id) => get().products.find((p) => p.id === id),
      removeProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'endew-product-storage',
    }
  )
);
