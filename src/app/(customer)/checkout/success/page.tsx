"use client";

import { useSearchParams } from "next/navigation";
import { useOrderStore } from "@/store/useOrderStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const getOrder = useOrderStore(state => state.getOrder);
  
  const order = orderId ? getOrder(orderId) : null;

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-xl w-full bg-card border rounded-2xl p-8 md:p-12 text-center shadow-lg">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold font-plus-jakarta mb-4">Payment Successful!</h1>
        
        {order ? (
          <div className="space-y-4 mb-8">
            <p className="text-muted-foreground">
              Thank you, <span className="font-semibold text-foreground">{order.shippingDetails.name}</span>. Your made-to-order garment is now in our production queue.
            </p>
            <div className="p-4 bg-muted rounded-xl inline-block mt-4">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Order Number</p>
              <p className="text-2xl font-mono font-bold">{order.id}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We've sent a confirmation email to <span className="font-medium text-foreground">{order.shippingDetails.email}</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            <p className="text-muted-foreground">Thank you for your purchase. Your order has been confirmed.</p>
          </div>
        )}

        <div className="space-y-3 pt-6 border-t">
          <Button size="lg" className="w-full rounded-full font-plus-jakarta gap-2">
            <Link href="/tracker" className="flex items-center w-full justify-center">
              Live Production Tracker <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full rounded-full font-plus-jakarta">
            <Link href="/catalog" className="w-full text-center">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
