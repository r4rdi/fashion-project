'use client';

import { useState } from 'react';
import ClothingCustomizer from '@/components/3d/ClothingCustomizer';
import { Button } from '@/components/ui/button';
import { useOrderStore } from '@/store/useOrderStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { motion } from 'framer-motion';

export default function CustomerStorefront() {
  const [selectedColor, setSelectedColor] = useState('#2a9d8f');
  const [material, setMaterial] = useState('cotton');
  const [name, setName] = useState('');
  const addOrder = useOrderStore(state => state.addOrder);
  const addNotification = useNotificationStore(state => state.addNotification);

  const handleOrder = () => {
    if (!name.trim()) {
      addNotification({ title: 'Error', message: 'Please enter your name.', type: 'error' });
      return;
    }

    const newOrder = {
      id: `ord-${Math.floor(Math.random() * 10000)}`,
      items: [{
        id: '1',
        productId: 'custom-shirt-1',
        productName: 'Custom Fit Shirt',
        basePrice: 250000,
        price: 250000,
        quantity: 1,
        color: selectedColor,
        material: material,
        measurements: {
          height: "170",
          weight: "65",
          chest: "90",
          waist: "80"
        }
      }],
      totalAmount: 250000,
      status: 'PAYMENT_RECEIVED' as const,
      shippingDetails: {
        name,
        email: 'customer@example.com',
        address: '123 Fake St',
        city: 'Jakarta'
      },
      createdAt: new Date().toISOString()
    };

    addOrder(newOrder);
    addNotification({
      title: 'Order Placed!',
      message: `Your custom shirt order #${newOrder.id} has been submitted.`,
      type: 'success'
    });
    setName('');
  };

  const colors = [
    { name: 'Teal', hex: '#2a9d8f' },
    { name: 'Charcoal', hex: '#264653' },
    { name: 'Orange', hex: '#e76f51' },
    { name: 'Saffron', hex: '#e9c46a' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-plus-jakarta mb-4">Design Your Perfect Fit</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience our 3D customizer. Choose your fabric, pick a color, and we'll tailor it precisely to your measurements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full h-[500px] border rounded-2xl overflow-hidden shadow-xl"
          >
            <ClothingCustomizer color={selectedColor} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8 bg-card p-8 rounded-2xl border shadow-sm"
          >
            <div>
              <h3 className="text-lg font-bold mb-3">1. Select Color</h3>
              <div className="flex gap-4">
                {colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.hex)}
                    className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20 ${selectedColor === c.hex ? 'border-primary' : 'border-transparent'}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">2. Choose Material</h3>
              <div className="flex flex-wrap gap-3">
                {['cotton', 'linen', 'silk'].map(mat => (
                  <button
                    key={mat}
                    onClick={() => setMaterial(mat)}
                    className={`px-4 py-2 rounded-md font-medium capitalize border transition-colors ${material === mat ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted text-foreground'}`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">3. Your Details</h3>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold font-mono">Rp 250.000</span>
              </div>
              <Button size="lg" className="w-full text-lg h-14" onClick={handleOrder}>
                Place Order
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
