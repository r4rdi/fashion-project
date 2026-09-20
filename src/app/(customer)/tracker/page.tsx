"use client";

import { Suspense, useState, useEffect } from "react";
import { useOrderStore, OrderStatus } from "@/store/useOrderStore";
import { Button } from "@/components/ui/button";
import { Search, Scissors, PenTool, CheckCircle, PackageCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const STATUS_STAGES = [
  { id: 'PAYMENT_RECEIVED', label: 'Payment Received', icon: CreditCard, description: 'Order confirmed and payment verified.' },
  { id: 'PATTERN_MAKING', label: 'Pattern Making', icon: PenTool, description: 'Drafting custom patterns based on your measurements.' },
  { id: 'CUTTING', label: 'Fabric Cutting', icon: Scissors, description: 'Precision cutting of your selected materials.' },
  { id: 'SEWING', label: 'Sewing & Assembly', icon: PenTool, description: 'Expert tailors are stitching your garment.' },
  { id: 'QUALITY_CONTROL', label: 'Quality Control', icon: CheckCircle, description: 'Final inspection for flawless finishing.' },
  { id: 'SHIPPED', label: 'Shipped', icon: PackageCheck, description: 'Your bespoke garment is on its way.' },
];

function TrackerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchId, setSearchId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<ReturnType<typeof useOrderStore.getState.getOrder> | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const getOrder = useOrderStore(state => state.getOrder);
  const updateOrderStatus = useOrderStore(state => state.updateOrderStatus);

  // Auto-search if URL has orderId
  useEffect(() => {
    const idFromUrl = searchParams.get("orderId");
    if (idFromUrl) {
      setSearchId(idFromUrl);
      const order = getOrder(idFromUrl);
      setSearchedOrder(order || null);
      setHasSearched(true);
    }
  }, [searchParams, getOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    // Update URL without refresh
    router.replace(`/tracker?orderId=${searchId.trim()}`);
    
    const order = getOrder(searchId.trim());
    setSearchedOrder(order || null);
    setHasSearched(true);
  };

  // Secret admin simulation function
  const handleSimulateNextStage = () => {
    if (!searchedOrder) return;
    const currentIndex = STATUS_STAGES.findIndex(s => s.id === searchedOrder.status);
    if (currentIndex < STATUS_STAGES.length - 1) {
      const nextStatus = STATUS_STAGES[currentIndex + 1].id as OrderStatus;
      updateOrderStatus(searchedOrder.id, nextStatus);
      // Refresh local state
      setSearchedOrder({ ...searchedOrder, status: nextStatus });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[80vh]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-plus-jakarta tracking-tight">Live Production Tracker</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Track the meticulous creation of your made-to-order garment. Enter your Order ID below to view its current stage in our atelier.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. ORD-1234" 
              className="w-full h-12 pl-10 pr-4 rounded-full border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button type="submit" className="h-12 rounded-full px-6 font-plus-jakarta">Track</Button>
        </form>

        {/* Results */}
        {hasSearched && !searchedOrder && (
          <div className="text-center p-8 bg-muted rounded-xl border border-dashed">
            <p className="text-muted-foreground">We couldn't find an order matching that ID.</p>
          </div>
        )}

        {searchedOrder && (
          <div className="bg-card border rounded-2xl p-6 md:p-10 shadow-sm mt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b">
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Order Details</p>
                <h2 className="text-2xl font-bold font-mono">{searchedOrder.id}</h2>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Customer</p>
                <p className="text-lg font-medium">{searchedOrder.shippingDetails.name}</p>
              </div>
            </div>

            {/* Timeline UI */}
            <div className="relative">
              {/* Connecting Line Background */}
              <div className="absolute left-[27px] top-4 bottom-12 w-0.5 bg-muted z-0 hidden md:block" />
              
              <div className="space-y-8 relative z-10">
                {STATUS_STAGES.map((stage, index) => {
                  const currentStageIndex = STATUS_STAGES.findIndex(s => s.id === searchedOrder.status);
                  const isCompleted = index < currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  const isPending = index > currentStageIndex;
                  
                  const Icon = stage.icon;

                  return (
                    <div key={stage.id} className={`flex gap-6 items-start transition-opacity duration-500 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 transition-colors duration-300
                        ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 
                          isCurrent ? 'bg-background border-primary text-primary' : 
                          'bg-muted border-muted-foreground/20 text-muted-foreground'}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="pt-3 pb-2">
                        <h3 className={`text-lg font-bold font-plus-jakarta ${isCurrent ? 'text-primary' : ''}`}>
                          {stage.label}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {stage.description}
                        </p>
                        
                        {/* Display items if this is the current stage to make it feel alive */}
                        {isCurrent && (
                          <div className="mt-4 p-4 bg-muted/50 rounded-lg inline-block border">
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Working on:</p>
                            <ul className="space-y-1">
                              {searchedOrder.items.map((item, i) => (
                                <li key={i} className="text-sm font-medium">
                                  {item.productName} <span className="text-muted-foreground font-normal">({item.material}, {item.color})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Secret Admin Simulation Button (For Demo Purposes) */}
            <div className="mt-12 pt-6 border-t flex justify-between items-center">
              <Link href="/profile/orders" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
                View all my orders
              </Link>
              
              {searchedOrder.status !== 'SHIPPED' && (
                <button 
                  onClick={handleSimulateNextStage}
                  className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-3 py-1 rounded-md transition-colors"
                  title="Secret button to simulate production progress"
                >
                  Admin: Advance Stage
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <TrackerContent />
    </Suspense>
  );
}
