import { describe, it, expect, beforeEach } from 'vitest';
import { useOrderStore, Order } from '../useOrderStore';

describe('useOrderStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useOrderStore.setState({ orders: [] });
  });

  const mockOrder: Order = {
    id: 'ord-1',
    items: [],
    totalAmount: 100,
    status: 'PAYMENT_RECEIVED',
    shippingDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'Jakarta'
    },
    createdAt: new Date().toISOString()
  };

  it('should initialize with empty orders', () => {
    expect(useOrderStore.getState().orders).toEqual([]);
  });

  it('should add an order', () => {
    useOrderStore.getState().addOrder(mockOrder);
    expect(useOrderStore.getState().orders).toHaveLength(1);
    expect(useOrderStore.getState().orders[0]).toEqual(mockOrder);
  });

  it('should get an order by id', () => {
    useOrderStore.getState().addOrder(mockOrder);
    const retrievedOrder = useOrderStore.getState().getOrder('ord-1');
    expect(retrievedOrder).toEqual(mockOrder);
  });

  it('should update order status', () => {
    useOrderStore.getState().addOrder(mockOrder);
    useOrderStore.getState().updateOrderStatus('ord-1', 'CUTTING');
    
    const updatedOrder = useOrderStore.getState().getOrder('ord-1');
    expect(updatedOrder?.status).toBe('CUTTING');
  });

  it('should not update status if order id does not exist', () => {
    useOrderStore.getState().addOrder(mockOrder);
    useOrderStore.getState().updateOrderStatus('ord-999', 'SHIPPED');
    
    const originalOrder = useOrderStore.getState().getOrder('ord-1');
    expect(originalOrder?.status).toBe('PAYMENT_RECEIVED');
  });
});
