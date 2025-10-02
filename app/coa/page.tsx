'use client';

import Link from 'next/link';
import { ShoppingCart, FileText, Mail } from 'lucide-react';

export default function COAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg" />
              <span className="text-xl font-bold text-white">
                PremiumPeptides
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/products" className="text-slate-300 hover:text-white transition">
                Products
              </Link>
              <Link href="/coa" className="text-white font-semibold">
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
              <Link href="/cart" className="text-slate-300 hover:text-white transition">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Certificates of Analysis (COA)
            </h1>
            <p className="text-slate-400 text-lg">
              Third-party testing results for all our products.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-12 backdrop-blur text-center">
            <FileText className="h-20 w-20 text-slate-600 mx-auto mb-6" />
            
            <h2 className="text-2xl font-bold text-white mb-4">
              COA Available Upon Request
            </h2>
            
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              We provide Certificates of Analysis for all our products. Each batch is independently tested for purity and quality by third-party laboratories.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-blue-400 mb-3">How to Request a COA</h3>
              <p className="text-blue-200 text-sm leading-relaxed mb-4">
                To receive the Certificate of Analysis for your product, please email us with your order number and batch number (found on your product label). We&apos;ll send you the COA within 24 hours.
              </p>
              <div className="flex items-center justify-center gap-2 text-blue-300">
                <Mail className="h-5 w-5" />
                <a 
                  href="mailto:Yahir.perezt70@gmail.com"
                  className="font-semibold hover:text-blue-200 transition"
                >
                  Yahir.perezt70@gmail.com
                </a>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              <Mail className="h-5 w-5" />
              Contact Us
            </Link>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">What&apos;s Included in Our COAs</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ HPLC analysis results</li>
              <li>✓ Purity percentage</li>
              <li>✓ Batch number and test date</li>
              <li>✓ Laboratory name and certification</li>
              <li>✓ Contamination screening results</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-slate-400 text-sm">
            <p>© 2025 PremiumPeptides. Research use only.</p>
            <div className="flex space-x-6">
              <Link href="/products" className="hover:text-white transition">Products</Link>
              <Link href="/coa" className="hover:text-white transition">COA</Link>
              <Link href="/reviews" className="hover:text-white transition">Reviews</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}