'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import CartButton from '@/components/CartButton';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  const subtotal = getTotalPrice;
  const shipping = items.length > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg" />
              <span className="text-xl font-bold text-white">
                PeptidePrice <span className="text-slate-400">Grey</span>
              </span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link href="/products" className="text-slate-300 hover:text-white transition">
                Products
              </Link>
              <CartButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-12 text-center backdrop-blur">
            <ShoppingBag className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6">Add some peptides to get started!</p>
            <Link 
              href="/products"
              className="inline-block px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-slate-600/50">
                        {item.name.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3">
                        {item.dosage}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition"
                          >
                            <Minus className="h-4 w-4 text-white" />
                          </button>
                          
                          <span className="w-12 text-center text-white font-semibold">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition"
                          >
                            <Plus className="h-4 w-4 text-white" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-slate-400">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-3 px-4 bg-white text-slate-900 rounded-lg text-center font-semibold hover:bg-slate-100 transition mb-3"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="block w-full py-3 px-4 bg-slate-700 text-white rounded-lg text-center font-semibold hover:bg-slate-600 transition"
                >
                  Continue Shopping
                </Link>

                <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs">
                    <strong className="text-white">Note:</strong> All products are for research purposes only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-slate-400 text-sm">
            <p>© 2025 PeptidePrice Grey. Research use only.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}