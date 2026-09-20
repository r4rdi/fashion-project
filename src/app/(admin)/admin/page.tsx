"use client";

import { useOrderStore } from "@/store/useOrderStore";
import { Package, Banknote, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboardPage() {
  const orders = useOrderStore(state => state.orders);

  // Quick Stats Calculation
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeOrdersCount = orders.filter(order => order.status !== 'SHIPPED').length;
  const todaysOrdersCount = orders.length;

  const formattedRevenue = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(totalRevenue);

  // Chart Data: Order Status Distribution
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(statusCounts).map(key => ({
    name: key.replace(/_/g, ' '),
    value: statusCounts[key]
  }));

  const COLORS = ['#000000', '#3f3f46', '#71717a', '#a1a1aa', '#d4d4d8', '#f4f4f5'];

  // Chart Data: Mock Monthly Revenue (Using actual total for the current month, others mocked)
  const barData = [
    { name: 'Jan', revenue: 12000000 },
    { name: 'Feb', revenue: 19000000 },
    { name: 'Mar', revenue: 15000000 },
    { name: 'Apr', revenue: 22000000 },
    { name: 'May', revenue: totalRevenue > 0 ? totalRevenue : 8000000 }, // Inject actual revenue if exists
  ];

  return (
    <div className="space-y-6">
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-xl p-6 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-500 flex items-center justify-center shrink-0">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold font-plus-jakarta">{formattedRevenue}</h3>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Active Production</p>
            <h3 className="text-3xl font-bold font-plus-jakarta">{activeOrdersCount}</h3>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Orders Today</p>
            <h3 className="text-3xl font-bold font-plus-jakarta">{todaysOrdersCount}</h3>
          </div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Chart */}
        <div className="bg-card border rounded-xl shadow-sm p-6">
          <h3 className="font-bold font-plus-jakarta mb-6">Revenue Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `Rp${value / 1000000}M`}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="revenue" fill="currentColor" className="fill-primary" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-card border rounded-xl shadow-sm p-6">
          <h3 className="font-bold font-plus-jakarta mb-6">Production Status</h3>
          <div className="h-64 flex items-center justify-center">
            {orders.length === 0 ? (
              <p className="text-muted-foreground">No orders to visualize</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* Recent Orders Preview */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-muted/30">
          <h3 className="font-bold font-plus-jakarta">Recent Orders</h3>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">View All <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No orders found.
          </div>
        ) : (
          <div className="divide-y">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="p-4 px-6 flex justify-between items-center hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-semibold">{order.shippingDetails.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase tracking-wider mb-1">
                    {order.status.replace(/_/g, ' ')}
                  </span>
                  <p className="text-sm font-medium">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
