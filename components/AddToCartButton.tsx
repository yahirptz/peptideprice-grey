'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  slug: string;
  dosage: string | null;
  salePrice: number;
  imageUrl?: string | null;
}

export default function AddToCartButton({
  product,
  inStock,
}: {
  product: Product;
  inStock: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setIsAdding(true);
    setError(null);

    try {
      await addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        dosage: product.dosage ?? '',
        price: product.salePrice,
        imageUrl: product.imageUrl,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        alert(err.message);
      } else {
        setError('Failed to add item');
        alert('Failed to add item');
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={!inStock || isAdding}
        className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition ${
          !inStock || isAdding
            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
            : 'bg-white text-slate-900 hover:bg-slate-100'
        }`}
      >
        <ShoppingCart className="h-4 w-4 inline mr-1" />
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </>
  );
}
