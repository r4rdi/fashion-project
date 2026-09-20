"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomRequestStore } from "@/store/useCustomRequestStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Button } from "@/components/ui/button";

export default function CustomRequestPage() {
  const router = useRouter();
  const submitRequest = useCustomRequestStore(state => state.submitRequest);
  const addNotification = useNotificationStore(state => state.addNotification);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    referenceImageUrl: "",
    height: "",
    weight: "",
    chest: "",
    waist: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    submitRequest({
      title: formData.title,
      description: formData.description,
      referenceImageUrl: formData.referenceImageUrl,
      measurements: {
        height: formData.height,
        weight: formData.weight,
        chest: formData.chest,
        waist: formData.waist
      }
    });

    addNotification({
      title: "Request Submitted!",
      message: "Our tailors will review your design and get back with a quote.",
      type: 'success'
    });

    // Navigate to profile or request list
    router.push("/profile/requests");
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-plus-jakarta mb-2">Bespoke Custom Request</h1>
        <p className="text-muted-foreground">
          Can't find what you're looking for? Describe your dream garment, upload reference images, and our master tailors will craft it for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-card border p-6 md:p-8 rounded-2xl shadow-sm">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-plus-jakarta border-b pb-2">Design Details</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase text-muted-foreground">Request Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border bg-transparent" placeholder="e.g. Vintage Double-Breasted Suit" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase text-muted-foreground">Description & Materials</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full p-4 rounded-lg border bg-transparent min-h-32 resize-y" placeholder="Describe the fabric, cut, color, and specific details..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase text-muted-foreground">Reference Image URL (Optional)</label>
            <input type="url" name="referenceImageUrl" value={formData.referenceImageUrl} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border bg-transparent" placeholder="https://..." />
            <p className="text-xs text-muted-foreground">Link to a Pinterest, Instagram, or image file.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold font-plus-jakarta border-b pb-2">Your Measurements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Height (cm)</label>
              <input required type="number" name="height" value={formData.height} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border bg-transparent" placeholder="175" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Weight (kg)</label>
              <input required type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border bg-transparent" placeholder="70" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Chest (cm)</label>
              <input required type="number" name="chest" value={formData.chest} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border bg-transparent" placeholder="95" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Waist (cm)</label>
              <input required type="number" name="waist" value={formData.waist} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border bg-transparent" placeholder="80" />
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full rounded-full font-plus-jakarta text-lg h-14">
          Submit for Review
        </Button>
      </form>

    </div>
  );
}
