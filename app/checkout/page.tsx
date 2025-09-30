'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Wallet, DollarSign, Copy, Check, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

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

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data);
        alert(`Order failed: ${data.error || 'Unknown error'}`);
        throw new Error(data.error || 'Failed to create order');
      }

      clearCart();
      router.push(`/checkout/success?order=${data.orderNumber}`);
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">
              PeptidePrice <span className="text-slate-400">Grey</span>
            </span>
          </Link>
        </div>
      </nav>

      <form onSubmit={handleSubmitOrder} className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Payment Method
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 rounded-lg border-2 transition ${
                    paymentMethod === 'crypto'
                      ? 'border-white bg-white/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                  <p className="text-white font-semibold">Bitcoin</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('zelle')}
                  className={`p-4 rounded-lg border-2 transition ${
                    paymentMethod === 'zelle'
                      ? 'border-white bg-white/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <Wallet className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-white font-semibold">Zelle</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cashapp')}
                  className={`p-4 rounded-lg border-2 transition ${
                    paymentMethod === 'cashapp'
                      ? 'border-white bg-white/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-400" />
                  <p className="text-white font-semibold">Cash App</p>
                </button>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-yellow-200 text-sm space-y-2">
                    <p><strong>IMPORTANT PAYMENT INSTRUCTIONS:</strong></p>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Copy the payment address below</li>
                      <li>Send <strong>${total.toFixed(2)}</strong> to that address</li>
                      <li><strong>INCLUDE YOUR ORDER NUMBER IN THE PAYMENT NOTE/MEMO</strong></li>
                      <li>After payment is sent, submit this form</li>
                      <li>Your order number will be shown after you submit</li>
                    </ol>
                    <p className="text-yellow-300 font-bold mt-2">
                      ⚠️ Without your order number in the payment note, we cannot process your order!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-700/30 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">
                  {paymentMethod === 'crypto' && 'Bitcoin Address:'}
                  {paymentMethod === 'zelle' && 'Zelle Email:'}
                  {paymentMethod === 'cashapp' && 'Cash App Tag:'}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={paymentAddresses[paymentMethod]}
                    readOnly
                    className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded text-white font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(paymentAddresses[paymentMethod])}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded text-white transition"
                  >
                    {copiedAddress ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>

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
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      required
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress"
                    required
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
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
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
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
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      ZIP *
                    </label>
                    <input
                      type="text"
                      name="shippingZip"
                      required
                      value={formData.shippingZip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
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
                {isProcessing ? 'Processing...' : 'Submit Order'}
              </button>

              <p className="text-xs text-slate-400 mt-4 text-center">
                Your order number will be displayed after submission
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}