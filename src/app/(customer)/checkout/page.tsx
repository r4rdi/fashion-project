"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, Landmark } from "lucide-react";
import Script from "next/script";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const addOrder = useOrderStore(state => state.addOrder);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push("/cart");
    }
  }, [items, router, isProcessing]);

  if (items.length === 0) return null;

  const total = getTotalPrice();
  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0
  }).format(total);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          shippingDetails: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Trigger Midtrans Snap Popup
      (window as any).snap.pay(data.token, {
        onSuccess: function (result: any) {
          addOrder({
            id: data.orderId,
            items: [...items],
            totalAmount: total,
            status: 'PAYMENT_RECEIVED',
            shippingDetails: formData,
            createdAt: new Date().toISOString(),
          });
          clearCart();
          router.push(`/checkout/success?orderId=${data.orderId}`);
        },
        onPending: function (result: any) {
          addOrder({
            id: data.orderId,
            items: [...items],
            totalAmount: total,
            status: 'PENDING',
            shippingDetails: formData,
            createdAt: new Date().toISOString(),
          });
          clearCart();
          router.push(`/profile/orders`);
        },
        onError: function (result: any) {
          setIsProcessing(false);
          alert("Payment failed!");
        },
        onClose: function () {
          setIsProcessing(false);
        }
      });
    } catch (err: any) {
      console.error(err);
      setIsProcessing(false);
      alert(err.message || 'An error occurred during checkout.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-plus-jakarta">Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your made-to-order purchase.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Form & Payment */}
          <form onSubmit={handleCheckout} className="space-y-8">
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold font-plus-jakarta">1. Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full h-12 px-4 rounded-md border bg-transparent" placeholder="John Doe" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full h-12 px-4 rounded-md border bg-transparent" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Delivery Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full h-12 px-4 rounded-md border bg-transparent" placeholder="123 Fashion Street" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full h-12 px-4 rounded-md border bg-transparent" placeholder="Jakarta" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold font-plus-jakarta">2. Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-medium text-sm">Credit Card</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-colors ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                >
                  <Landmark className="w-6 h-6" />
                  <span className="font-medium text-sm">Bank Transfer</span>
                </button>
              </div>
              
              {paymentMethod === "card" && (
                <div className="p-4 border rounded-xl space-y-4 mt-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Simulated Credit Card</p>
                  <input required type="text" className="w-full h-12 px-4 rounded-md border bg-background" placeholder="Card Number (Mock)" defaultValue="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" className="w-full h-12 px-4 rounded-md border bg-background" placeholder="MM/YY" defaultValue="12/28" />
                    <input required type="text" className="w-full h-12 px-4 rounded-md border bg-background" placeholder="CVC" defaultValue="123" />
                  </div>
                </div>
              )}
              
              {paymentMethod === "bank" && (
                <div className="p-4 border rounded-xl mt-4 bg-muted/30">
                  <p className="text-sm text-muted-foreground">You will be provided with a Virtual Account number after confirming the order.</p>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-lg rounded-full font-plus-jakarta"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing Payment..." : `Pay ${formattedTotal}`}
            </Button>

          </form>

          {/* Right Column: Order Summary */}
          <div>
            <div className="p-6 border rounded-xl bg-card sticky top-24">
              <h2 className="text-xl font-bold mb-6 font-plus-jakarta">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-xs text-muted-foreground capitalize mt-1">{item.material} • {item.color}</p>
                    </div>
                    <span className="font-medium">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.basePrice)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm border-t pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formattedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-xl pt-4 border-t">
                <span>Total</span>
                <span>{formattedTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
