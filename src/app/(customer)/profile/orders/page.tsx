"use client";

import { useOrderStore } from "@/store/useOrderStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, Clock } from "lucide-react";

export default function OrderHistoryPage() {
  const orders = useOrderStore(state => state.orders);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper to format status beautifully
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl min-h-[70vh]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-plus-jakarta tracking-tight">Order History</h1>
        <p className="text-muted-foreground mt-2">View and track your bespoke creations.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-card border rounded-2xl p-12 text-center flex flex-col items-center">
          <Package className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold font-plus-jakarta mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">You haven't placed any made-to-order requests.</p>
          <Button className="rounded-full font-plus-jakarta">
            <Link href="/catalog" className="w-full h-full flex items-center justify-center px-4 py-2">Explore Catalog</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="bg-muted/50 px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider mb-1">Order Placed</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider mb-1">Total Amount</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground uppercase text-xs font-semibold tracking-wider mb-1">Order Number</p>
                    <p className="font-medium font-mono">{order.id}</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="rounded-full shrink-0 p-0">
                  <Link href={`/tracker?orderId=${order.id}`} className="flex items-center gap-2 whitespace-nowrap px-3 py-1.5 w-full h-full">
                    Track Production <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Order Items & Status */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Items */}
                  <div className="flex-1 space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-muted rounded-md shrink-0 flex items-center justify-center border">
                          <span className="text-[10px] text-muted-foreground text-center leading-tight px-1">3D<br/>View</span>
                        </div>
                        <div>
                          <p className="font-bold">{item.productName}</p>
                          <p className="text-sm text-muted-foreground capitalize">{item.material}, {item.color}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Current Status Box */}
                  <div className="md:w-64 shrink-0 bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col justify-center">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Current Stage
                    </p>
                    <p className="text-lg font-bold font-plus-jakarta">{formatStatus(order.status)}</p>
                    {order.status === 'SHIPPED' ? (
                      <p className="text-xs text-muted-foreground mt-2">Check your email for tracking info.</p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-2">Our artisans are working on it.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
