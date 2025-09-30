import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg" />
              <span className="text-xl font-bold text-white">
                PeptidePrice <span className="text-slate-400">Grey</span>
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/products" className="text-slate-300 hover:text-white transition">
                Products
              </Link>
              <Link href="/about" className="text-white font-semibold">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
          
          <div className="space-y-8 text-slate-300">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
              <p className="leading-relaxed">
                PeptidePrice Grey is your trusted source for research-grade peptides at competitive grey market prices. 
                We bridge the gap between premium quality and affordability, sourcing directly from vetted suppliers 
                to bring you the best prices on the market.
              </p>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                To provide researchers and laboratories with access to high-quality peptides without the markup 
                of traditional suppliers. We believe research materials should be accessible and affordable.
              </p>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Quality Assurance</h2>
              <p className="leading-relaxed mb-4">
                All our peptides are sourced from established suppliers with proven track records. 
                We prioritize quality and consistency in every order.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Third-party testing available upon request</li>
                <li>Proper storage and handling protocols</li>
                <li>Discreet packaging and fast shipping</li>
                <li>Responsive customer support</li>
              </ul>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Payment & Shipping</h2>
              <p className="leading-relaxed mb-4">
                We accept multiple payment methods including cryptocurrency, Zelle, and Cash App for your convenience.
              </p>
              <p className="leading-relaxed">
                Orders are typically processed within 24-48 hours and shipped with tracking. 
                Delivery times range from 7-14 business days depending on location.
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-3">Important Disclaimer</h3>
              <p className="text-red-200 text-sm leading-relaxed">
                All products sold are intended for research purposes only. These products are NOT intended 
                for human consumption, clinical use, or any FDA-approved application. By purchasing, you confirm 
                you are 18+ years of age and understand applicable regulations in your jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-slate-400 text-sm">
            <p>© 2025 PeptidePrice Grey. Research use only.</p>
            <div className="flex space-x-6">
              <Link href="/products" className="hover:text-white transition">Products</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}