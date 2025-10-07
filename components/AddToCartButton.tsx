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
    supplierId?: number | null;
    supplierLabel?: string;
    supplierShippingCost?: number; // ← ADDED THIS
  };
  inStock: boolean;
}

export default function AddToCartButton({ product, inStock }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [isAdding, setIsAdding] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;

    // Check if cart has items from a different supplier
    if (items.length > 0) {
      const cartSupplier = items[0].supplierId;
      if (cartSupplier !== product.supplierId) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 4000);
        return;
      }
    }

    setIsAdding(true);
    
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      dosage: product.dosage || '',
      price: Number(product.salePrice),
      imageUrl: product.imageUrl,
      supplierId: product.supplierId,
      supplierLabel: product.supplierLabel || 'Unknown',
      supplierShippingCost: product.supplierShippingCost || 0, // ← ADDED THIS
    });

    // Show visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  if (showWarning) {
    return (
      <button
        disabled
        className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg text-xs font-semibold cursor-not-allowed"
      >
        Different Supplier!
      </button>
    );
  }

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