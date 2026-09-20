"use client";

import { useState } from "react";
import { MeasurementProfile } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (measurements: MeasurementProfile) => void;
}

export function MeasurementModal({ isOpen, onClose, onSubmit }: MeasurementModalProps) {
  const [profile, setProfile] = useState<MeasurementProfile>({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    inseam: "",
    notes: ""
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-background w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Visual Guide */}
        <div className="bg-muted p-8 md:w-2/5 flex flex-col justify-center items-center border-r border-border">
          <div className="w-32 h-64 border-2 border-dashed border-zinc-400 rounded-full flex items-center justify-center relative">
            <span className="text-zinc-400 text-sm font-medium">Measurement Guide</span>
            {/* Simple visual markers */}
            <div className="absolute top-1/4 w-full border-t border-blue-500/50" />
            <div className="absolute top-1/2 w-full border-t border-blue-500/50" />
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Provide accurate measurements for the perfect Made-to-Order fit.
          </p>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="p-8 md:w-3/5 space-y-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold font-plus-jakarta">Your Measurements</h2>
              <p className="text-sm text-muted-foreground">Please fill in your exact body sizes (in cm).</p>
            </div>
            <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Height (cm)</label>
              <input required type="number" name="height" value={profile.height} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-transparent" placeholder="e.g. 175" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Weight (kg)</label>
              <input required type="number" name="weight" value={profile.weight} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-transparent" placeholder="e.g. 70" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Chest (cm)</label>
              <input required type="number" name="chest" value={profile.chest} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-transparent" placeholder="e.g. 100" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Waist (cm)</label>
              <input required type="number" name="waist" value={profile.waist} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-transparent" placeholder="e.g. 82" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase">Additional Notes</label>
            <textarea name="notes" value={profile.notes} onChange={handleChange} className="w-full p-3 rounded-md border bg-transparent min-h-20 resize-none" placeholder="Special fitting requirements..." />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="font-plus-jakarta">Save & Add to Cart</Button>
          </div>
        </form>

      </div>
    </div>
  );
}
