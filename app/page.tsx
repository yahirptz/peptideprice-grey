import Link from 'next/link';
import { ShoppingCart, Shield, Truck, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg" />
              <span className="text-xl font-bold text-white">
                PeptidePrice <span className="text-slate-400">Grey</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/products" className="text-slate-300 hover:text-white transition">
                Products
              </Link>
              <Link href="/cart" className="text-slate-300 hover:text-white transition">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full">
            <span className="text-slate-400 text-sm">Research Peptides • Grey Market Pricing</span>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6">
            Premium Research Peptides
            <br />
            <span className="bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">
              At Grey Market Prices
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            High-quality peptides sourced directly from trusted suppliers. 
            Best pricing, fast shipping, discreet packaging.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Link 
              href="/products"
              className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition inline-flex items-center"
            >
              Browse Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700/50 p-8 rounded-xl backdrop-blur">
            <div className="h-12 w-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fast Shipping</h3>
            <p className="text-slate-400">
              Orders processed within 24-48 hours. Discreet packaging, tracked delivery.
            </p>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700/50 p-8 rounded-xl backdrop-blur">
            <div className="h-12 w-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Quality Assured</h3>
            <p className="text-slate-400">
              Sourced from vetted suppliers. Third-party testing available on request.
            </p>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700/50 p-8 rounded-xl backdrop-blur">
            <div className="h-12 w-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Checkout</h3>
            <p className="text-slate-400">
              Multiple payment options. Your information is encrypted and protected.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur">
          <h3 className="text-lg font-bold text-white mb-4">⚠️ Important Disclaimer</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            All products sold on PeptidePrice Grey are intended for research purposes only. 
            These products are NOT intended for human consumption, clinical use, or any 
            FDA-approved application. By purchasing, you confirm you are 18+ years of age 
            and understand the legal implications.
          </p>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-slate-400 text-sm">
            <p>© 2025 PeptidePrice Grey. Research use only.</p>
            <div className="flex space-x-6">
              <Link href="/products" className="hover:text-white transition">Products</Link>
              <Link href="/cart" className="hover:text-white transition">Cart</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}