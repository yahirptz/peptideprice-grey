'use client';

import Link from 'next/link';
import { ShoppingCart, FileText, Download, ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';

interface COA {
  id: string;
  productName: string;
  batchNumber: string;
  testDate: string;
  purity: string;
  lab: string;
  pdfUrl: string;
  category: string;
}

export default function COAPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample COA data - replace with real data from your database
  const coas: COA[] = [
    {
      id: '1',
      productName: 'Semaglutide 5mg',
      batchNumber: 'SEM-2024-001',
      testDate: '2024-01-15',
      purity: '99.2%',
      lab: 'Third Party Lab Inc.',
      pdfUrl: '/coa/semaglutide-5mg.pdf',
      category: 'GLP-1 Agonists'
    },
    {
      id: '2',
      productName: 'Tirzepatide 10mg',
      batchNumber: 'TIR-2024-002',
      testDate: '2024-01-20',
      purity: '98.9%',
      lab: 'Third Party Lab Inc.',
      pdfUrl: '/coa/tirzepatide-10mg.pdf',
      category: 'GLP-1 Agonists'
    },
    {
      id: '3',
      productName: 'BPC-157 5mg',
      batchNumber: 'BPC-2024-003',
      testDate: '2024-01-18',
      purity: '99.5%',
      lab: 'Independent Testing Lab',
      pdfUrl: '/coa/bpc-157-5mg.pdf',
      category: 'Healing Peptides'
    },
    {
      id: '4',
      productName: 'TB-500 5mg',
      batchNumber: 'TB5-2024-004',
      testDate: '2024-01-22',
      purity: '98.7%',
      lab: 'Independent Testing Lab',
      pdfUrl: '/coa/tb-500-5mg.pdf',
      category: 'Healing Peptides'
    },
  ];

  const categories = ['all', ...Array.from(new Set(coas.map(coa => coa.category)))];

  const filteredCOAs = coas.filter(coa => {
    const matchesSearch = coa.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coa.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || coa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <Link href="/contact" className="text-slate-300 hover:text-white transition">
                Contact
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Certificates of Analysis (COA)
            </h1>
            <p className="text-slate-400 text-lg">
              View third-party testing results for all our products. Each batch is independently tested for purity and quality.
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-blue-400 mb-2">About Our COAs</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  All products undergo rigorous third-party testing. COAs include HPLC analysis, 
                  purity testing, and contamination screening. Batch numbers on product labels 
                  correspond to the COAs listed below.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by product name or batch number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* COA Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCOAs.map((coa) => (
              <div
                key={coa.id}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {coa.productName}
                    </h3>
                    <p className="text-sm text-slate-400">
                      Batch: {coa.batchNumber}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                      {coa.purity}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Test Date:</span>
                    <span className="text-white">{new Date(coa.testDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Laboratory:</span>
                    <span className="text-white text-right">{coa.lab}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-white">{coa.category}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  
                    href={coa.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  
                    href={coa.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredCOAs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No COAs found matching your search.</p>
            </div>
          )}

          {/* Request COA */}
          <div className="mt-12 bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">
              Can&apos;t Find Your Batch COA?
            </h3>
            <p className="text-slate-300 mb-6">
              If you can&apos;t find the Certificate of Analysis for your specific batch number, 
              please contact us with your order number and batch number. We&apos;ll provide the COA within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              Request COA
              <ExternalLink className="h-4 w-4" />
            </Link>
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
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}