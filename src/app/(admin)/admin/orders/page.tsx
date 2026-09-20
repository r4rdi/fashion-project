"use client";

import { useOrderStore, OrderStatus } from "@/store/useOrderStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useState } from "react";
import { Package, User, MapPin } from "lucide-react";

export default function AdminOrdersPage() {
  const orders = useOrderStore(state => state.orders);
  const updateOrderStatus = useOrderStore(state => state.updateOrderStatus);
  const addNotification = useNotificationStore(state => state.addNotification);

  // Status options for the dropdown
  const STATUSES: { value: OrderStatus; label: string }[] = [
    { value: 'PAYMENT_RECEIVED', label: 'Payment Received' },
    { value: 'PATTERN_MAKING', label: 'Pattern Making' },
    { value: 'CUTTING', label: 'Cutting' },
    { value: 'SEWING', label: 'Sewing' },
    { value: 'QUALITY_CONTROL', label: 'Quality Control' },
    { value: 'SHIPPED', label: 'Shipped' },
  ];

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    
    // Simulate realtime notification to customer
    const statusLabel = STATUSES.find(s => s.value === newStatus)?.label || newStatus;
    addNotification({
      title: 'Order Status Updated',
      message: `Your order #${orderId.slice(0, 8)} is now in: ${statusLabel}`,
      type: 'info'
    });
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold font-plus-jakarta tracking-tight">Order Management</h1>
        <p className="text-muted-foreground mt-1">View incoming orders and update their production stages.</p>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No orders found in the system.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID / Date</th>
                  <th className="px-6 py-4 font-semibold">Customer Info</th>
                  <th className="px-6 py-4 font-semibold">Order Items</th>
                  <th className="px-6 py-4 font-semibold">Production Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                    
                    {/* ID & Date */}
                    <td className="px-6 py-4 align-top">
                      <p className="font-mono font-bold text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-semibold text-foreground mt-2">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 align-top space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div>
                          <p className="font-medium">{order.shippingDetails.name}</p>
                          <p className="text-xs text-muted-foreground">{order.shippingDetails.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground break-words max-w-[200px]">
                          {order.shippingDetails.address}, {order.shippingDetails.city}
                        </p>
                      </div>
                    </td>

                    {/* Items & Measurements */}
                    <td className="px-6 py-4 align-top">
                      <div className="space-y-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex gap-2 text-xs">
                            <Package className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-sm text-foreground">{item.productName}</p>
                              <p className="text-muted-foreground capitalize mb-1">{item.material}, {item.color}</p>
                              <div className="flex flex-wrap gap-1">
                                <span className="bg-muted px-1.5 py-0.5 rounded">H:{item.measurements.height}</span>
                                <span className="bg-muted px-1.5 py-0.5 rounded">W:{item.measurements.weight}</span>
                                <span className="bg-muted px-1.5 py-0.5 rounded">C:{item.measurements.chest}</span>
                                <span className="bg-muted px-1.5 py-0.5 rounded">Wa:{item.measurements.waist}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4 align-top">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`w-full text-sm font-semibold p-2 border rounded-md cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20
                          ${order.status === 'SHIPPED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 border-green-200 dark:border-green-800' : 'bg-background hover:bg-muted'}`}
                      >
                        {STATUSES.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      
                      {order.status === 'SHIPPED' && (
                        <p className="text-[10px] text-green-600 dark:text-green-500 mt-2 font-medium uppercase tracking-wider">
                          Completed
                        </p>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
