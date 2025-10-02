'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Wallet, DollarSign, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'wire'>('crypto');
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
  const shipping = 15.0;
  const total = subtotal + shipping;

  const paymentAddresses = {
    crypto: 'bc1q386fzfnhgx6cajdflvqw63cngpk4g7nahmf23x',
    wire: 'Contact us for wire transfer instructions after placing order',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      const productIds = items.map((item) => item.id);
      const response = await fetch('/api/validate-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds }),
      });

      const validation = await response.json();

      if (!validation.valid) {
        alert(validation.message);
        return;
      }
    } catch (error) {
      console.error('Validation error:', error);
      alert('Error validating cart. Please try again.');
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
            {/* LEGAL DISCLAIMERS */}
            <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6 backdrop-blur">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-red-400 mb-2">IMPORTANT LEGAL DISCLAIMERS</h2>
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
                    I understand these products are <strong className="text-white">FOR RESEARCH USE ONLY</strong> and are{' '}
                    <strong className="text-white">NOT FOR HUMAN CONSUMPTION</strong>
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

            {/* CUSTOMER INFO */}
            {/* ... no changes needed here ... */}

            {/* PAYMENT METHOD */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Payment Method
              </h2>
              <div className="mb-6">
                <p className="text-slate-400 text-sm mb-4">
                  We accept cryptocurrency for all orders. Wire transfer available for orders $1000+.
                </p>
              </div>

              {/* ... rest unchanged ... */}

              {/* Payment Instructions / Address with Crypto Guide Link */}
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm mb-2">
                  <strong>Payment {paymentMethod === 'wire' ? 'Instructions' : 'Address'}:</strong>
                </p>
                <p className="font-mono text-white break-all text-sm mb-3">
                  {paymentAddresses[paymentMethod]}
                </p>
                {paymentMethod === 'crypto' && (
                  <Link
                    href="/crypto-guide"
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    New to crypto? Click here for step-by-step instructions &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          {/* ... unchanged except fixed apostrophes ... */}
        </div>
      </form>
    </div>
  );
}
