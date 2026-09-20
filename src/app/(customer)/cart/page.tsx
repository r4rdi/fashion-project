"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, getTotalPrice } = useCartStore();

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(getTotalPrice());

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-8 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 font-plus-jakarta">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          You haven't added any customized items to your cart yet. Discover our collection and craft your perfect fit.
        </p>
        <Link href="/catalog">
          <Button size="lg" className="rounded-full">Explore Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8 font-plus-jakarta">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-6 p-6 border rounded-xl bg-card">
              <div className="w-full md:w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">3D Preview</span>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{item.productName}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Material: <span className="capitalize text-foreground font-medium">{item.material}</span> • 
                  Color: <span className="text-foreground font-medium uppercase text-xs">{item.color}</span>
                </p>
                
                <div className="pt-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Your Measurements</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-muted px-2 py-1 rounded">Height: {item.measurements.height}cm</span>
                    <span className="bg-muted px-2 py-1 rounded">Weight: {item.measurements.weight}kg</span>
                    <span className="bg-muted px-2 py-1 rounded">Chest: {item.measurements.chest}cm</span>
                    <span className="bg-muted px-2 py-1 rounded">Waist: {item.measurements.waist}cm</span>
                  </div>
                </div>
                
                <div className="pt-2 text-right">
                  <span className="font-semibold text-lg">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.basePrice)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit p-6 border rounded-xl bg-card sticky top-24">
          <h2 className="text-xl font-bold mb-4 font-plus-jakarta">Order Summary</h2>
          <div className="space-y-3 text-sm border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
              <span>{formattedTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Estimated Total</span>
            <span>{formattedTotal}</span>
          </div>
          <Link href="/checkout" className="block">
            <Button size="lg" className="w-full rounded-full font-plus-jakarta">Proceed to Checkout</Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Taxes and shipping calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
