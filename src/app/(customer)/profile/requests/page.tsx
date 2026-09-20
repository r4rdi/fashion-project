"use client";

import { useCustomRequestStore } from "@/store/useCustomRequestStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Clock, CheckCircle, XCircle, FileText, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CustomerRequestsPage() {
  const requests = useCustomRequestStore(state => state.getRequestsByCustomer());
  const updateRequestStatus = useCustomRequestStore(state => state.updateRequestStatus);
  const addOrder = useOrderStore(state => state.addOrder);
  const addNotification = useNotificationStore(state => state.addNotification);
  const router = useRouter();

  const handleAccept = (req: any) => {
    // 1. Update request status to ACCEPTED/ORDERED
    updateRequestStatus(req.id, 'ORDERED');
    
    // 2. Create an order in the order store
    addOrder({
      id: `ORD-CST-${req.id.slice(0, 6)}`,
      items: [{
        id: `cst-${req.id}`,
        productId: req.id,
        productName: `Custom: ${req.title}`,
        color: "Custom",
        material: "Custom",
        basePrice: req.quotedPrice || 0,
        measurements: req.measurements
      }],
      totalAmount: req.quotedPrice || 0,
      status: 'PAYMENT_RECEIVED',
      createdAt: new Date().toISOString(),
      shippingDetails: {
        name: "Customer Name", // Mocked
        email: "customer@example.com",
        address: "123 Mock Street",
        city: "Jakarta"
      }
    });

    // 3. Notify
    addNotification({
      title: "Order Placed!",
      message: "Your custom bespoke request is now officially in production.",
      type: "success"
    });

    // 4. Redirect to Tracker
    router.push("/profile/orders");
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'PENDING_REVIEW': return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold uppercase">Pending Review</span>;
      case 'QUOTED': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">Quoted - Awaiting You</span>;
      case 'ACCEPTED': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">Accepted</span>;
      case 'REJECTED': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold uppercase">Declined</span>;
      case 'ORDERED': return <span className="bg-zinc-100 text-zinc-700 px-2 py-1 rounded text-xs font-bold uppercase">In Production</span>;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl space-y-6">
      
      <div className="flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold font-plus-jakarta tracking-tight">My Custom Requests</h1>
          <p className="text-muted-foreground mt-1">Track the status of your bespoke garment requests.</p>
        </div>
        <Link href="/custom-request">
          <Button className="font-plus-jakarta rounded-full">New Request</Button>
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-24 bg-card border rounded-2xl shadow-sm">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold font-plus-jakarta">No requests yet</h3>
          <p className="text-muted-foreground mt-2 mb-6">You haven't made any custom bespoke requests.</p>
          <Link href="/custom-request">
            <Button>Start a Custom Design</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
              
              {/* Image Preview */}
              <div className="w-full md:w-32 h-32 shrink-0 bg-muted rounded-xl flex items-center justify-center overflow-hidden border">
                {req.referenceImageUrl ? (
                  <img src={req.referenceImageUrl} alt="Reference" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-8 h-8 text-muted-foreground opacity-50" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl font-plus-jakarta">{req.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{req.id} • {new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    {getStatusDisplay(req.status)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{req.description}</p>

                {req.status === 'QUOTED' && req.quotedPrice && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex justify-between items-center mt-4">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Tailor Quote</p>
                      <p className="font-bold text-lg font-plus-jakarta">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(req.quotedPrice)}
                      </p>
                      {req.adminNotes && <p className="text-sm text-muted-foreground mt-1">"{req.adminNotes}"</p>}
                    </div>
                    <Button onClick={() => handleAccept(req)} className="font-plus-jakarta gap-2">
                      Accept & Order <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
