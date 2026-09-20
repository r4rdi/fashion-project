"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ConfiguratorUI } from "./ConfiguratorUI";

const Interactive3DViewer = dynamic(
  () => import("./Interactive3DViewer").then((mod) => mod.Interactive3DViewer),
  { ssr: false, loading: () => <div className="animate-pulse w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-xl" /> }
);
import { Button } from "@/components/ui/button";
import { MeasurementModal } from "../measurement/MeasurementModal";
import { useCartStore, MeasurementProfile } from "@/store/useCartStore";

interface ProductConfiguratorClientProps {
  product: {
    id: string;
    name: string;
    description: string;
    basePrice: number | string;
  };
}

export function ProductConfiguratorClient({ product }: ProductConfiguratorClientProps) {
  const router = useRouter();
  const [color, setColor] = useState("#18181b");
  const [material, setMaterial] = useState<"cotton" | "linen" | "silk">("cotton");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const addItem = useCartStore(state => state.addItem);

  // Format price
  const formattedPrice = new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    maximumFractionDigits: 0 
  }).format(Number(product.basePrice));

  const handleAddToCart = (measurements: MeasurementProfile) => {
    addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      basePrice: Number(product.basePrice),
      color,
      material,
      measurements
    });
    setIsModalOpen(false);
    router.push('/cart');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* 3D Viewer Section */}
      <div className="rounded-xl aspect-square lg:aspect-auto lg:h-[80vh] flex items-center justify-center relative overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
        <Interactive3DViewer color={color} material={material} />
      </div>

      {/* Configuration Section */}
      <div className="flex flex-col space-y-8 py-8 h-full overflow-y-auto pr-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 font-plus-jakarta">{product.name}</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{product.description}</p>
        </div>

        <div className="border-t border-b py-6 border-zinc-200 dark:border-zinc-800">
          <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider block mb-2">Total Price</span>
          <span className="text-3xl font-semibold">
            {formattedPrice}
          </span>
        </div>

        {/* Configurator Controls */}
        <div className="flex-1">
          <ConfiguratorUI 
            color={color} 
            setColor={setColor} 
            material={material} 
            setMaterial={setMaterial} 
          />
        </div>

        <div className="pt-8 flex gap-4">
          <Button 
            size="lg" 
            className="flex-1 text-lg font-plus-jakarta rounded-full py-6"
            onClick={() => setIsModalOpen(true)}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <MeasurementModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddToCart}
      />
    </div>
  );
}
