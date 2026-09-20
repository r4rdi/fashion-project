import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MaterialInventory {
  id: string;
  name: string;
  stock: number; // in meters or units
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

interface InventoryState {
  materials: MaterialInventory[];
  updateStock: (id: string, newStock: number) => void;
  deductStock: (id: string, amount: number) => void;
}

const initialInventory: MaterialInventory[] = [
  { id: 'cotton', name: 'Premium Cotton', stock: 150, status: 'IN_STOCK' },
  { id: 'linen', name: 'Breathable Linen', stock: 45, status: 'LOW_STOCK' },
  { id: 'silk', name: 'Luxurious Silk', stock: 0, status: 'OUT_OF_STOCK' }, // Intentionally 0 for testing disabled state
];

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      materials: initialInventory,
      updateStock: (id, newStock) => set((state) => ({
        materials: state.materials.map(mat => {
          if (mat.id === id) {
            let status = mat.status;
            if (newStock <= 0) status = 'OUT_OF_STOCK';
            else if (newStock < 50) status = 'LOW_STOCK';
            else status = 'IN_STOCK';
            return { ...mat, stock: newStock, status };
          }
          return mat;
        })
      })),
      deductStock: (id, amount) => set((state) => ({
        materials: state.materials.map(mat => {
          if (mat.id === id) {
            const newStock = Math.max(0, mat.stock - amount);
            let status = mat.status;
            if (newStock <= 0) status = 'OUT_OF_STOCK';
            else if (newStock < 50) status = 'LOW_STOCK';
            else status = 'IN_STOCK';
            return { ...mat, stock: newStock, status };
          }
          return mat;
        })
      }))
    }),
    {
      name: 'endew-inventory-storage',
    }
  )
);
