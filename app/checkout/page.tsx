'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Wallet, DollarSign, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import PaymentMethods from '@/components/PaymentMethods';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'zelle' | 'cashapp'>('crypto');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [researchUseConfirmed, setResearchUseConfirmed] = useState(false);

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

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      alert('Please fill in all required fields');
      return;
    }

    if (!ageConfirmed) {
      alert('You must confirm you are 18 years or older');
      return;
    }

    if (!termsAccepted) {
      alert('You must accept the Terms of Service');
      return;
    }

    if (!researchUseConfirmed) {
      alert('You must confirm products are for research use only');
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
            
            {/* Legal Disclaimers */}
            <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6 backdrop-blur">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-red-400 mb-2">
                    ⚠️ IMPORTANT LEGAL DISCLAIMERS
                  </h2>
                  <p className="text-red-200 text-sm mb-4">
                    Please read carefully and confirm all statements below before proceeding with your order.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-red-500/50 bg-slate-900/50 text-red-500 focus:ring-red-500"
                    required
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition">
                    I confirm that I am <strong className="text-white">18 years of age or older</strong>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={researchUseConfirmed}
                    onChange={(e) => setResearchUseConfirmed(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-red-500/50 bg-slate-900/50 text-red-500 focus:ring-red-500"
                    required
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition">
                    I understand these products are <strong className="text-white">FOR RESEARCH USE ONLY</strong> and are <strong className="text-white">NOT FOR HUMAN CONSUMPTION</strong>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-red-500/50 bg-slate-900/50 text-red-500 focus:ring-red-500"
                    required
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition">
                    I have read and agree to the{' '}
                    <Link href="/terms" target="_blank" className="text-red-400 hover:text-red-300 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" target="_blank" className="text-red-400 hover:text-red-300 underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Customer Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Shipping Address</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                    required
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
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="shippingZip"
                      value={formData.shippingZip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Payment Method
              </h2>

              <div className="mb-6">
                <p className="text-slate-400 text-sm mb-4">We accept the following payment methods:</p>
                <PaymentMethods />
              </div>

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

              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm mb-2">
                  <strong>Payment Address:</strong>
                </p>
                <p className="font-mono text-white break-all">
                  {paymentAddresses[paymentMethod]}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-400">
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
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-slate-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !ageConfirmed || !termsAccepted || !researchUseConfirmed}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition ${
                  isProcessing || !ageConfirmed || !termsAccepted || !researchUseConfirmed
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>

              <p className="text-slate-400 text-xs text-center mt-4">
                By placing this order, you confirm all statements above and agree to our terms.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}