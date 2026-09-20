"use client";

import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";
import { Plus, Package, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductModal } from "@/components/admin/ProductModal";

export default function AdminProductsPage() {
  const products = useProductStore(state => state.products);
  const removeProduct = useProductStore(state => state.removeProduct);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-plus-jakarta tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground mt-1">Manage your base garments for made-to-order.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 rounded-full font-plus-jakarta">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Package className="w-12 h-12 mb-4 text-muted-foreground/30" />
            <p>No products found in the system.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>
                  <th className="px-6 py-4 font-semibold">Product Name</th>
                  <th className="px-6 py-4 font-semibold">Base Price</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div 
                        className="w-16 h-16 rounded-md bg-cover bg-center border"
                        style={{ backgroundImage: `url(${product.imageUrl})` }}
                      />
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <p className="font-bold text-foreground text-base">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-sm">{product.description}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-2">ID: {product.id}</p>
                    </td>
                    <td className="px-6 py-4 align-middle font-medium">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.basePrice)}
                    </td>
                    <td className="px-6 py-4 align-middle text-right space-x-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
