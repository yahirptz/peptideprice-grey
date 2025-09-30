'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, Package, Copy, Check, AlertCircle } from 'lucide-react';
import { Suspense, useState } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const [copied, setCopied] = useState(false);

  const copyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-lg p-6 mb-6">
              <p className="text-green-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                Your Order Number
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-mono font-bold text-white tracking-wider">
                  {orderNumber}
                </span>
                <button
                  onClick={copyOrderNumber}
                  className="p-2 bg-green-600 hover:bg-green-500 rounded transition"
                  title="Copy order number"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <Copy className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
              <p className="text-green-300 text-sm mt-3">
                Click to copy • Save this number
              </p>
            </div>

            <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-6 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-red-400 font-bold text-lg mb-2">
                    ⚠️ IMPORTANT - READ CAREFULLY
                  </h3>
                  <div className="text-red-200 space-y-2 text-sm">
                    <p className="font-semibold">
                      You MUST include your order number when sending payment:
                    </p>
                    <div className="bg-slate-900/50 rounded p-3 my-3">
                      <p className="font-mono text-white text-center text-lg">
                        {orderNumber}
                      </p>
                    </div>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li><strong>Zelle:</strong> Put order number in the memo/note field</li>
                      <li><strong>Cash App:</strong> Include order number in the note</li>
                      <li><strong>Bitcoin:</strong> Include order number in transaction note</li>
                    </ul>
                    <p className="font-bold text-red-300 mt-3">
                      Without your order number, we cannot process your order!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                What happens next?
              </h2>
              
              <div className="space-y-4 text-slate-300">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Send Payment Now</strong>
                    <p className="text-sm text-slate-400">
                      Use the payment method you selected during checkout
                    </p>
                    <p className="text-sm text-yellow-400 font-semibold mt-1">
                      Remember to include order number: {orderNumber}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                    2
                  </div>
                  <div>
                    <strong className="text-white">Payment Confirmation</strong>
                    <p className="text-sm text-slate-400">
                      We&apos;ll verify your payment within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Order Processing</strong>
                    <p className="text-sm text-slate-400">
                      We&apos;ll forward your order to our supplier for fulfillment
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">
                    4
                  </div>
                  <div>
                    <strong className="text-white">Shipping & Tracking</strong>
                    <p className="text-sm text-slate-400">
                      You&apos;ll receive tracking information via email within 2-3 business days
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 font-bold">
                    5
                  </div>
                  <div>
                    <strong className="text-white">Delivery</strong>
                    <p className="text-sm text-slate-400">
                      Your package arrives in 7-14 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-blue-200 text-sm">
                    <strong>Check your email!</strong> We&apos;ve sent order confirmation with your order number.
                    If you don&apos;t see it, check your spam folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full py-3 px-6 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
              >
                Continue Shopping
              </Link>
              
              <p className="text-slate-400 text-sm">
                Questions? Email us or contact via Telegram
              </p>
            </div>
          </div>

          <div className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-amber-200 text-sm text-center">
              <strong>Reminder:</strong> Your order won&apos;t be processed until payment is received with order number{' '}
              <span className="font-mono font-bold">{orderNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}