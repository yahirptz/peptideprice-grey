'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { Trash2, Plus, Minus, ShoppingCart, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getShippingCost = useCartStore((state) => state.getShippingCost);
  const getCartSupplier = useCartStore((state) => state.getCartSupplier);

  const subtotal = getTotalPrice();
  const shipping = getShippingCost();
  const total = subtotal + shipping;
  const supplier = getCartSupplier();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="PremiumPeptides" className="h-8 w-8 rounded-lg" />
              <span className="text-xl font-bold text-white">
                PremiumPeptides
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/products" className="text-slate-300 hover:text-white transition">
                Products
              </Link>
              <Link href="/coa" className="text-slate-300 hover:text-white transition">
                COA
              </Link>
              <Link href="/reviews" className="text-slate-300 hover:text-white transition">
                Reviews
              </Link>
              <Link href="/supplies" className="text-slate-300 hover:text-white transition">
                Supplies
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition">
                About
              </Link>
              <Link href="/faq" className="text-slate-300 hover:text-white transition">
                FAQ
              </Link>
              <Link href="/cart" className="text-white font-semibold">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-12 text-center backdrop-blur">
            <ShoppingCart className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6">Add some peptides to get started</p>
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
              {supplier && (
                <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-4 backdrop-blur flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-blue-200 text-sm">
                      <strong>Shipping from {supplier.label}</strong> - All items from this supplier will ship together
                    </p>
                  </div>
                </div>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
                >
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-slate-600">
                        {item.name.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-slate-400 text-sm mb-4">{item.dosage}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center transition"
                          >
                            <Minus className="h-4 w-4 text-white" />
                          </button>
                          <span className="w-12 text-center font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center transition"
                          >
                            <Plus className="h-4 w-4 text-white" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-400 hover:text-red-300 transition"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-400">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 text-sm transition"
              >
                Clear Cart
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>Shipping</span>
                    </div>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  {supplier && (
                    <p className="text-xs text-slate-500 italic">
                      {supplier.label} ships for ${shipping.toFixed(2)} flat rate
                    </p>
                  )}
                  <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition mb-4"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="block text-center text-slate-400 hover:text-white text-sm transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-slate-400 text-sm">
            <p>© 2025 PremiumPeptides. Research use only.</p>
            <div className="flex space-x-6">
              <Link href="/products" className="hover:text-white transition">Products</Link>
              <Link href="/coa" className="hover:text-white transition">COA</Link>
              <Link href="/reviews" className="hover:text-white transition">Reviews</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}