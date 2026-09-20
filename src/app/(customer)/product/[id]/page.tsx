"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { ProductConfiguratorClient } from '@/components/configurator/ProductConfiguratorClient';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const getProduct = useProductStore(state => state.getProduct);
  
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ProductConfiguratorClient product={product} />
    </div>
  );
}
