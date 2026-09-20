"use client";

import { useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { Button } from "@/components/ui/button";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ isOpen, onClose }: ProductModalProps) {
  const addProduct = useProductStore(state => state.addProduct);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    imageUrl: ""
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: formData.name,
      description: formData.description,
      basePrice: Number(formData.basePrice),
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" // fallback image
    });
    setFormData({ name: "", description: "", basePrice: "", imageUrl: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-background w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col">
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold font-plus-jakarta">Add New Product</h2>
              <p className="text-sm text-muted-foreground">Add a new base garment to the catalog.</p>
            </div>
            <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Product Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-transparent" placeholder="e.g. Leather Jacket" />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Base Price (IDR)</label>
              <input required type="number" name="basePrice" value={formData.basePrice} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-transparent" placeholder="e.g. 1500000" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Image URL</label>
              <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-transparent" placeholder="https://..." />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full p-3 rounded-md border bg-transparent min-h-20 resize-none" placeholder="Product details..." />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="font-plus-jakarta">Save Product</Button>
          </div>
        </form>

      </div>
    </div>
  );
}
