'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, Package } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg" />
            <span className="text-xl font-bold text-white">
              PeptidePrice <span className="text-slate-400">Grey</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur text-center">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              Order Received!
            </h1>
            
            <p className="text-xl text-slate-300 mb-2">
              Order Number: <span className="font-mono text-green-400">{orderNumber}</span>
            </p>

            <p className="text-slate-400 mb-8">
              We've received your order and will process it as soon as we confirm your payment.
            </p>

            <div className="bg-slate-700/30 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                What happens next?
              </h2>
              
              <div className="space-y-3 text-slate-300">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Payment Confirmation</strong>
                    <p className="text-sm text-slate-400">We'll verify your payment within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <strong className="text-white">Order Processing</strong>
                    <p className="text-sm text-slate-400">We'll prepare your order for shipment</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Shipping</strong>
                    <p className="text-sm text-slate-400">You'll receive tracking information via email</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <strong className="text-white">Delivery</strong>
                    <p className="text-sm text-slate-400">Your package arrives in 7-14 days</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-blue-200 text-sm">
                    <strong>Check your email!</strong> We've sent order confirmation to your email address.
                    If you don't see it, check your spam folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
              >
                Continue Shopping
              </Link>
              
              <Link
                href="/"
                className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-8 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
            <h3 className="text-lg font-bold text-white mb-3">Need Help?</h3>
            <p className="text-slate-400 text-sm mb-4">
              If you have any questions about your order, please contact us with your order number.
            </p>
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="text-green-400 hover:text-green-300 text-sm font-semibold transition"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}