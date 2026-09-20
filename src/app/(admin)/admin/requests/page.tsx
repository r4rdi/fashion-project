"use client";

import { useState } from "react";
import { useCustomRequestStore, RequestStatus } from "@/store/useCustomRequestStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { FileText, Send, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminRequestsPage() {
  const requests = useCustomRequestStore(state => state.requests);
  const updateRequestStatus = useCustomRequestStore(state => state.updateRequestStatus);
  const addNotification = useNotificationStore(state => state.addNotification);

  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const [quoteAmount, setQuoteAmount] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState<string>("");

  const handleQuoteSubmit = (id: string) => {
    const amount = Number(quoteAmount);
    if (amount > 0) {
      updateRequestStatus(id, 'QUOTED', amount, adminNotes);
      
      // Notify customer
      addNotification({
        title: "Quote Received!",
        message: `Your bespoke request #${id.slice(0,8)} has been reviewed and priced at Rp ${amount.toLocaleString('id-ID')}.`,
        type: 'success'
      });

      setActiveQuoteId(null);
      setQuoteAmount("");
      setAdminNotes("");
    }
  };

  const handleReject = (id: string) => {
    updateRequestStatus(id, 'REJECTED');
    addNotification({
      title: "Request Declined",
      message: `Your custom request #${id.slice(0,8)} could not be fulfilled at this time.`,
      type: 'error'
    });
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold font-plus-jakarta tracking-tight">Custom Requests</h1>
        <p className="text-muted-foreground mt-1">Review bespoke garment requests from customers and provide price quotes.</p>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <FileText className="w-12 h-12 mb-4 text-muted-foreground/30" />
            <p>No custom requests pending.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {requests.map(req => (
              <div key={req.id} className="p-6 hover:bg-muted/10 transition-colors">
                
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Reference Image */}
                  <div className="w-full md:w-48 h-48 bg-muted rounded-xl border flex items-center justify-center shrink-0 overflow-hidden">
                    {req.referenceImageUrl ? (
                      <img src={req.referenceImageUrl} alt="Reference" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-muted-foreground text-xs">No Image</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold font-plus-jakarta">{req.title}</h3>
                        <p className="text-xs font-mono text-muted-foreground mt-1">{req.id} • {new Date(req.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="shrink-0">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                          req.status === 'PENDING_REVIEW' ? 'bg-orange-100 text-orange-700' :
                          req.status === 'QUOTED' ? 'bg-blue-100 text-blue-700' :
                          req.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                          req.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-zinc-100 text-zinc-700'
                        }`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm bg-muted/50 p-4 rounded-lg border">{req.description}</p>
                    
                    <div className="flex gap-4 flex-wrap text-sm">
                      <span className="font-mono bg-background px-2 py-1 rounded border">H: {req.measurements.height}cm</span>
                      <span className="font-mono bg-background px-2 py-1 rounded border">W: {req.measurements.weight}kg</span>
                      <span className="font-mono bg-background px-2 py-1 rounded border">Chest: {req.measurements.chest}cm</span>
                      <span className="font-mono bg-background px-2 py-1 rounded border">Waist: {req.measurements.waist}cm</span>
                    </div>

                    {/* Action Area */}
                    {req.status === 'PENDING_REVIEW' && (
                      <div className="pt-4 border-t mt-4">
                        {activeQuoteId === req.id ? (
                          <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl space-y-4">
                            <h4 className="font-bold text-sm uppercase text-primary">Provide Quote</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input 
                                type="number" 
                                placeholder="Price in IDR (e.g. 2500000)" 
                                className="h-10 px-3 rounded-md border w-full bg-background"
                                value={quoteAmount}
                                onChange={(e) => setQuoteAmount(e.target.value)}
                              />
                              <input 
                                type="text" 
                                placeholder="Tailor Notes (Optional)" 
                                className="h-10 px-3 rounded-md border w-full bg-background"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => setActiveQuoteId(null)}>Cancel</Button>
                              <Button size="sm" onClick={() => handleQuoteSubmit(req.id)} className="gap-2">
                                Send Quote <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button onClick={() => setActiveQuoteId(req.id)} className="bg-primary text-primary-foreground gap-2">
                              <CheckCircle className="w-4 h-4" /> Review & Quote
                            </Button>
                            <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2" onClick={() => handleReject(req.id)}>
                              <XCircle className="w-4 h-4" /> Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {req.status === 'QUOTED' && req.quotedPrice && (
                      <div className="pt-4 border-t mt-4">
                        <p className="text-sm font-semibold">You quoted: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(req.quotedPrice)}</p>
                        {req.adminNotes && <p className="text-xs text-muted-foreground mt-1">Notes: {req.adminNotes}</p>}
                        <p className="text-xs text-orange-500 font-bold mt-2 animate-pulse">Waiting for customer acceptance...</p>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
