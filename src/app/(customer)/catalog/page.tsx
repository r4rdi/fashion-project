"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/useProductStore';

export default function CatalogPage() {
  const products = useProductStore(state => state.products);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2 font-plus-jakarta">Made to Order Catalog</h1>
        <p className="text-muted-foreground">Select a base template to begin customization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative border rounded-2xl overflow-hidden bg-card hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            {/* Placeholder for Product Image / 3D Preview */}
            <div className="aspect-[4/5] bg-muted w-full relative overflow-hidden flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${product.imageUrl})` }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-xl font-plus-jakarta">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{product.description}</p>
              <div className="pt-4 flex items-center justify-between border-t border-dashed">
                <span className="font-bold text-lg">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.basePrice)}
                </span>
                <Link href={`/product/${product.id}`}>
                  <Button className="rounded-full font-plus-jakarta">Customize</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No products available in the catalog yet.
        </div>
      )}
    </div>
  );
}
