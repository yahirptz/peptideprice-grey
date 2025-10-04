'use client';

import Link from 'next/link';
import { ShoppingCart, FileText, Mail, Download } from 'lucide-react';
import { useState } from 'react';

const availableCOAs = [
  {
    id: '1',
    productName: 'Tirzepatide 30mg',
    batchNumber: 'TIRZ-30',
    fileName: 'Tirz-30 COA.png',
    displayName: 'Tirzepatide'
  },
  {
    id: '2',
    productName: 'Tesamorelin 10mg',
    batchNumber: 'TESA-10',
    fileName: 'Tesa-10 COA.png',
    displayName: 'Tesamorelin'
  },
  {
    id: '3',
    productName: 'Retatrutide 10mg',
    batchNumber: 'RETA-10',
    fileName: 'Reta-10 COA.png',
    displayName: 'Retatrutide'
  },
  {
    id: '4',
    productName: 'GHK-CU',
    batchNumber: 'GHK-CU',
    fileName: 'GHK-CU COA.png',
    displayName: 'GHK-CU'
  }
];

export default function COAPage() {
  const [selectedCOA, setSelectedCOA] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Certificates of Analysis (COA)
            </h1>
            <p className="text-slate-400 text-lg">
              Third-party testing results for all our products.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-blue-400 mb-2">Available COAs</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  View or download Certificates of Analysis for select products below. For other products, request COAs via email.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {availableCOAs.map((coa) => (
              <div
                key={coa.id}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur hover:border-slate-600 transition"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {coa.displayName}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Batch: {coa.batchNumber}
                </p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedCOA(`/coa/${coa.fileName}`)}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition text-sm"
                  >
                    <FileText className="h-4 w-4" />
                    View COA
                  </button>
                  
                    <a href={`/coa/${coa.fileName}`}
                    download
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Request COA for Other Products
            </h2>
            
            <p className="text-slate-300 text-center mb-6 max-w-2xl mx-auto">
              Don&apos;t see your product above? We provide Certificates of Analysis for all our products. Each batch is independently tested for purity and quality by third-party laboratories.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-blue-400 mb-3">How to Request a COA</h3>
              <p className="text-blue-200 text-sm leading-relaxed mb-4">
                To receive the Certificate of Analysis for your product, please email us with your order number and batch number (found on your product label). We&apos;ll send you the COA within 24 hours.
              </p>
              <div className="flex items-center justify-center gap-2 text-blue-300">
                <Mail className="h-5 w-5" />
                <a 
                  href="mailto:Yahir.perezt70@gmail.com?subject=COA Request"
                  className="font-semibold hover:text-blue-200 transition"
                >
                  Yahir.perezt70@gmail.com
                </a>
              </div>
            </div>

            <div className="text-center">
              
                <a href="mailto:Yahir.perezt70@gmail.com?subject=COA Request&body=Order Number:%0D%0ABatch Number:%0D%0AProduct Name:%0D%0A"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
              >
                <Mail className="h-5 w-5" />
                Request COA via Email
              </a>
            </div>
          </div>

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

      {selectedCOA && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCOA(null)}
        >
          <div className="max-w-4xl w-full bg-slate-900 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Certificate of Analysis</h3>
              <button
                onClick={() => setSelectedCOA(null)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <img 
              src={selectedCOA} 
              alt="COA" 
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}

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