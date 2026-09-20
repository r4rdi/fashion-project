"use client";

import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { useInventoryStore } from "@/store/useInventoryStore";

interface ConfiguratorUIProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  material: "cotton" | "linen" | "silk";
  setMaterial: Dispatch<SetStateAction<"cotton" | "linen" | "silk">>;
}

const COLORS = [
  { id: "black", value: "#18181b", label: "Midnight Black" },
  { id: "navy", value: "#1e3a8a", label: "Navy Blue" },
  { id: "burgundy", value: "#7f1d1d", label: "Burgundy" },
  { id: "olive", value: "#3f6212", label: "Olive Green" },
  { id: "sand", value: "#d6d3d1", label: "Sand Beige" },
];

export function ConfiguratorUI({ color, setColor, material, setMaterial }: ConfiguratorUIProps) {
  const inventory = useInventoryStore(state => state.materials);

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md pointer-events-auto space-y-6">
      <h3 className="text-2xl font-bold font-plus-jakarta text-black">Customize Garment</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Material</h4>
          <span className="text-sm capitalize font-medium text-black">{material}</span>
        </div>
        
        <div className="flex flex-col gap-2">
          {inventory.map((mat) => {
            const isOutOfStock = mat.status === 'OUT_OF_STOCK';
            return (
              <button
                key={mat.id}
                onClick={() => !isOutOfStock && setMaterial(mat.id as any)}
                disabled={isOutOfStock}
                className={cn(
                  "px-4 py-3 text-left rounded-lg transition-colors border",
                  material === mat.id
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black border-zinc-200 hover:border-black",
                  isOutOfStock && "opacity-50 cursor-not-allowed hover:border-zinc-200 grayscale"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{mat.name}</span>
                  {isOutOfStock && (
                    <span className="text-xs text-red-500 font-bold uppercase">Out of Stock</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Color</h4>
          <span className="text-sm font-medium text-black">{COLORS.find(c => c.value === color)?.label}</span>
        </div>
        
        <div className="flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.value)}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-all",
                color === c.value ? "border-black scale-110" : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: c.value }}
              title={c.label}
              aria-label={`Select ${c.label} color`}
            />
          ))}
        </div>
      </div>

      <button className="w-full bg-black text-white py-4 rounded-full font-bold font-plus-jakarta hover:bg-zinc-800 transition-colors">
        Confirm Configuration
      </button>
    </div>
  );
}
