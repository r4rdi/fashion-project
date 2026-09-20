"use client";

import { useInventoryStore } from "@/store/useInventoryStore";
import { useState } from "react";
import { Layers, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminInventoryPage() {
  const materials = useInventoryStore(state => state.materials);
  const updateStock = useInventoryStore(state => state.updateStock);

  // Local state for inline editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempStock, setTempStock] = useState<string>("");

  const handleEditClick = (id: string, currentStock: number) => {
    setEditingId(id);
    setTempStock(currentStock.toString());
  };

  const handleSave = (id: string) => {
    const parsed = parseInt(tempStock, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      updateStock(id, parsed);
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-plus-jakarta tracking-tight">Material Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage fabric stock levels to prevent overselling.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 border rounded-xl bg-card flex gap-4 items-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Healthy Stock</p>
            <p className="text-2xl font-bold">{materials.filter(m => m.status === 'IN_STOCK').length}</p>
          </div>
        </div>
        <div className="p-6 border rounded-xl bg-card flex gap-4 items-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
            <p className="text-2xl font-bold">{materials.filter(m => m.status === 'LOW_STOCK').length}</p>
          </div>
        </div>
        <div className="p-6 border rounded-xl bg-card flex gap-4 items-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
            <p className="text-2xl font-bold">{materials.filter(m => m.status === 'OUT_OF_STOCK').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold">Material</th>
              <th className="px-6 py-4 font-semibold">Stock Status</th>
              <th className="px-6 py-4 font-semibold">Current Stock (Meters)</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {materials.map(mat => (
              <tr key={mat.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {mat.name}
                </td>
                
                <td className="px-6 py-4">
                  {mat.status === 'IN_STOCK' && <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">IN STOCK</span>}
                  {mat.status === 'LOW_STOCK' && <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded-full">LOW STOCK</span>}
                  {mat.status === 'OUT_OF_STOCK' && <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-700 rounded-full">OUT OF STOCK</span>}
                </td>

                <td className="px-6 py-4">
                  {editingId === mat.id ? (
                    <input 
                      type="number"
                      value={tempStock}
                      onChange={(e) => setTempStock(e.target.value)}
                      className="w-24 px-2 py-1 border rounded-md"
                      min="0"
                    />
                  ) : (
                    <span className="font-mono text-lg">{mat.stock}</span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  {editingId === mat.id ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                      <Button size="sm" onClick={() => handleSave(mat.id)}>Save</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => handleEditClick(mat.id, mat.stock)}>
                      Update Stock
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
