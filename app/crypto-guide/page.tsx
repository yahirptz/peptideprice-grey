'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, Wallet, CreditCard, Send } from 'lucide-react';

export default function CryptoGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link href="/checkout" className="flex items-center space-x-2 text-white hover:text-slate-300">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Checkout</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-4">How to Pay with Cryptocurrency</h1>
        <p className="text-slate-400 text-lg mb-8">
          Don't worry - it's easier than you think! Follow these simple steps.
        </p>

        {/* Step 1 */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-6 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">Download Cash App</h2>
              <p className="text-slate-300 mb-4">
                Cash App is the easiest way to buy Bitcoin. It works just like any payment app you already use.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                <p className="text-white font-semibold mb-2">Download links:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300">iPhone: Search "Cash App" in App Store</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300">Android: Search "Cash App" in Google Play</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Cash App is made by Square (same company as many restaurants use). It's completely safe and trusted by millions.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-6 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">Set Up Your Account</h2>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Open Cash App and tap "Sign Up"</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Enter your email address and phone number</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Link your debit card or bank account (just like Venmo)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Verify your identity with your driver's license or ID</span>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mt-4">
                <p className="text-yellow-200 text-sm">
                  <strong>Note:</strong> Identity verification is required by law (just like opening a bank account). This keeps everyone safe.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-6 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">Buy Bitcoin</h2>
              <div className="space-y-3 text-slate-300 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>On the Cash App home screen, tap the "Investing" tab at the bottom</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Search for "Bitcoin" and tap it</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Tap "Buy" and enter the amount you need (your order total)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Confirm the purchase - money comes from your linked card/bank</span>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  <strong>Tip:</strong> Buy a little extra ($5-10 more) to cover any price changes between buying and sending.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-6 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              4
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">Send Payment to Us</h2>
              <div className="space-y-3 text-slate-300 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>In Cash App, go back to the Bitcoin section</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Tap the airplane icon (Send) in the top right</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Enter our Bitcoin address (shown on checkout page)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>Enter the amount and tap "Confirm"</span>
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-200 text-sm">
                  <strong>Important:</strong> Double-check the Bitcoin address! Copy and paste it carefully - if you send to the wrong address, the money cannot be recovered.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-6 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              5
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">You're Done!</h2>
              <p className="text-slate-300 mb-4">
                After sending payment, take a screenshot of the transaction and email it to us with your order number. We'll process your order within 24 hours.
              </p>
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                <p className="text-green-200 text-sm">
                  <strong>Need Help?</strong> Email us at Yahir.perezt70@gmail.com and we'll walk you through it step-by-step.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-6">Common Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is Bitcoin safe?</h3>
              <p className="text-slate-300">
                Yes! Bitcoin is used by millions of people worldwide. Cash App is a trusted, regulated company that makes buying Bitcoin as safe as using a credit card.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Why can't I use a regular credit card?</h3>
              <p className="text-slate-300">
                Research peptides are considered high-risk by credit card companies, so most won't process these payments. Bitcoin solves this problem and gives you more privacy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How long does it take?</h3>
              <p className="text-slate-300">
                The entire process takes about 15-20 minutes the first time. After that, future purchases only take 2-3 minutes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What if I mess something up?</h3>
              <p className="text-slate-300">
                Don't worry! Email us before sending payment and we'll help you through each step. We're here to make this easy for you.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/checkout"
            className="inline-block px-8 py-4 bg-white text-slate-900 rounded-lg font-bold text-lg hover:bg-slate-100 transition"
          >
            Back to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}