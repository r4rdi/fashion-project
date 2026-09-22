import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './useCartStore';

export type OrderStatus = 
  | 'PENDING'
  | 'PENDING_PAYMENT'
  | 'PAYMENT_RECEIVED' 
  | 'PATTERN_MAKING' 
  | 'CUTTING' 
  | 'SEWING' 
  | 'QUALITY_CONTROL' 
  | 'SHIPPED'
  | 'CANCELLED';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, newStatus: OrderStatus) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      getOrder: (id) => get().orders.find((o) => o.id === id),
      updateOrderStatus: (id, newStatus) => set((state) => ({
        orders: state.orders.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        )
      })),
    }),
    {
      name: 'endew-order-storage',
    }
  )
);
