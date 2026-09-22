import { describe, it, expect, beforeEach } from 'vitest';
import { useInventoryStore } from '../useInventoryStore';

describe('useInventoryStore', () => {
  const initialInventory = [
    { id: 'cotton', name: 'Premium Cotton', stock: 150, status: 'IN_STOCK' },
    { id: 'linen', name: 'Breathable Linen', stock: 45, status: 'LOW_STOCK' },
    { id: 'silk', name: 'Luxurious Silk', stock: 0, status: 'OUT_OF_STOCK' },
  ] as const;

  beforeEach(() => {
    // Reset store to initial state
    useInventoryStore.setState({ materials: [...initialInventory] });
  });

  it('should initialize with default materials', () => {
    expect(useInventoryStore.getState().materials).toHaveLength(3);
  });

  it('should deduct stock and update status to IN_STOCK if stock >= 50', () => {
    // cotton starts at 150
    useInventoryStore.getState().deductStock('cotton', 50);
    const cotton = useInventoryStore.getState().materials.find(m => m.id === 'cotton');
    expect(cotton?.stock).toBe(100);
    expect(cotton?.status).toBe('IN_STOCK');
  });

  it('should deduct stock and update status to LOW_STOCK if stock > 0 and < 50', () => {
    // cotton starts at 150
    useInventoryStore.getState().deductStock('cotton', 120);
    const cotton = useInventoryStore.getState().materials.find(m => m.id === 'cotton');
    expect(cotton?.stock).toBe(30);
    expect(cotton?.status).toBe('LOW_STOCK');
  });

  it('should deduct stock and update status to OUT_OF_STOCK if stock reaches 0', () => {
    // linen starts at 45
    useInventoryStore.getState().deductStock('linen', 45);
    const linen = useInventoryStore.getState().materials.find(m => m.id === 'linen');
    expect(linen?.stock).toBe(0);
    expect(linen?.status).toBe('OUT_OF_STOCK');
  });

  it('should not allow stock to go below zero', () => {
    // linen starts at 45
    useInventoryStore.getState().deductStock('linen', 100);
    const linen = useInventoryStore.getState().materials.find(m => m.id === 'linen');
    expect(linen?.stock).toBe(0);
    expect(linen?.status).toBe('OUT_OF_STOCK');
  });

  it('should update stock directly', () => {
    useInventoryStore.getState().updateStock('silk', 60);
    const silk = useInventoryStore.getState().materials.find(m => m.id === 'silk');
    expect(silk?.stock).toBe(60);
    expect(silk?.status).toBe('IN_STOCK');
  });
});
