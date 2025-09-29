'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    slug: string;
    dosage: string | null;
    salePrice: number;
    imageUrl?: string | null;
  };
  inStock: boolean;
}

export default function AddToCartButton({ product, inStock }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;

    setIsAdding(true);
    
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      dosage: product.dosage || '',
      price: Number(product.salePrice),
      imageUrl: product.imageUrl,
    });

    // Show visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!inStock}
      className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition ${
        inStock
          ? isAdding
            ? 'bg-green-500 text-white'
            : 'bg-white text-slate-900 hover:bg-slate-100'
          : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
      }`}
    >
      <ShoppingCart className="h-4 w-4 inline mr-1" />
      {isAdding ? 'Added!' : 'Add to Cart'}
    </button>
  );
}