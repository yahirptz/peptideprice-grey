'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export default function CartButton() {
  // Subscribe to items directly so component re-renders when cart changes
  const items = useCartStore((state) => state.items);
  
  // Calculate total items from the items array
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link 
      href="/cart" 
      className="relative text-slate-300 hover:text-white transition"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}