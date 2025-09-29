'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Wallet, DollarSign, Copy, Check } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import CartButton from '@/components/CartButton';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'zelle' | 'cashapp'>('crypto');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'US',
  });

  const subtotal = getTotalPrice;
  const shipping = 15.00;
  const total = subtotal + shipping;

  const paymentAddresses = {
    crypto: 'bc1q386fzfnhgx6cajdflvqw63cngpk4g7nahmf23x',
    zelle: 'Yahir.perezt70@gmail.com',
    cashapp: '$YahirPV',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      alert('Please fill in all required fields');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: formData,
          items: items,
          paymentMethod: paymentMethod,
          subtotal: subtotal,
          shipping: shipping,
          total: total,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      clearCart();
      router.push(`/checkout/success?order=${order.orderNumber}`);
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to create order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
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
          <div className="max-w-md mx-auto bg-slate-800/30 border border-slate-700/50 rounded-xl p-12 text-center backdrop-blur">
            <ShoppingBag className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6">Add some products before checking out</p>
            <Link 
              href="/products"
              className="inline-block px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
                <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        required
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress"
                      required
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="shippingCity"
                        required
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="New York"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="shippingState"
                        required
                        value={formData.shippingState}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="NY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="shippingZip"
                        required
                        value={formData.shippingZip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
                <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                      paymentMethod === 'crypto'
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <Wallet className="h-5 w-5 text-white" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white">Cryptocurrency</div>
                      <div className="text-sm text-slate-400">Bitcoin, USDC, ETH</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('zelle')}
                    className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                      paymentMethod === 'zelle'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <DollarSign className="h-5 w-5 text-white" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white">Zelle</div>
                      <div className="text-sm text-slate-400">Fast bank transfer</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cashapp')}
                    className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                      paymentMethod === 'cashapp'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <DollarSign className="h-5 w-5 text-white" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white">Cash App</div>
                      <div className="text-sm text-slate-400">Instant payment</div>
                    </div>
                  </button>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Payment Instructions:</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>1. Send <strong className="text-white">${total.toFixed(2)}</strong> to:</p>
                    <div className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-lg">
                      <code className="flex-1 text-green-400 font-mono break-all">
                        {paymentAddresses[paymentMethod]}
                      </code>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(paymentAddresses[paymentMethod])}
                        className="p-2 hover:bg-slate-700 rounded transition"
                      >
                        {copiedAddress ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                    <p>2. Complete the form and submit your order</p>
                    <p>3. We&apos;ll process your order within 24 hours after payment confirmation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-300">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-white font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                    isProcessing
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>

                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-200 text-xs">
                    <strong>Important:</strong> Send payment first, then submit order. Orders are processed after payment confirmation.
                  </p>
                </div>

                <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs">
                    By placing this order, you confirm you are 18+ and these products are for research purposes only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}