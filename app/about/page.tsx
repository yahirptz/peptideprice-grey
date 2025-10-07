import Link from 'next/link';
import { ShoppingCart, Mail, Instagram, Users } from 'lucide-react';

export default function AboutPage() {
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
              <Link href="/coa" className="text-slate-300 hover:text-white transition">
                COA
              </Link>
              <Link href="/reviews" className="text-slate-300 hover:text-white transition">
                Reviews
              </Link>
              <Link href="/supplies" className="text-slate-300 hover:text-white transition">
                Supplies
              </Link>
              <Link href="/about" className="text-white font-semibold">
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
          
          <div className="space-y-8 text-slate-300">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
              <p className="leading-relaxed">
                PremiumPeptides is your trusted source for research-grade peptides at competitive prices. 
                We bridge the gap between premium quality and affordability where everyone should have the same opportunity to research their peptides, sourcing directly from vetted suppliers 
                to bring you the best prices on the market. Our brand is established on a Chrisitan/Catholic foundation,
                emphasizing integrity, transparency, and customer-centric values in all we do.
              </p>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                To provide researchers and laboratories with access to high-quality peptides without the markup 
                of traditional suppliers. We believe research materials should be accessible and affordable to everyone. 
                Through our team&apos;s lifetime experience, we have witnessed the struggle of researchers to find quality peptides at reasonable prices,
                and we are committed to changing that narrative.
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
              <h2 className="text-2xl font-bold text-white mb-4">Payment &amp; Shipping</h2>
              <p className="leading-relaxed mb-4">
                We accept multiple payment methods including cryptocurrency, Zelle, and Cash App for your convenience.
              </p>
              <p className="leading-relaxed">
                Orders are typically processed within 24-48 hours and shipped with tracking. 
                Delivery times range from 7-14 business days depending on location.
              </p>
            </div>

            {/* Contact Us Section */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">How to Contact Us</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                    <p className="text-slate-400 text-sm mb-2">
                      For orders, product questions, COA requests, and general inquiries
                    </p>
                    <a 
                      href="mailto:Yahir.perezt70@gmail.com"
                      className="text-blue-400 hover:text-blue-300 transition font-semibold inline-block"
                    >
                      Yahir.perezt70@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-6 w-6 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Instagram</h3>
                    <p className="text-slate-400 text-sm mb-2">
                      Follow us for updates, promotions, and product announcements
                    </p>
                    <a 
                      href="https://instagram.com/hiyahirrr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 transition font-semibold inline-block"
                    >
                      @hiyahirrr
                    </a>
                  </div>
                </div>

                {/* Coming Soon */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Community</h3>
                    <p className="text-slate-400 text-sm mb-3">
                      Join our community for discussions, tips, and exclusive member benefits
                    </p>
                    <div className="space-y-1">
                      <p className="text-purple-400 font-semibold">
                        🔜 Skool Community - Coming Soon
                      </p>
                      <p className="text-purple-400 font-semibold">
                        🔜 Discord Server - Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-slate-300 text-sm text-center">
                  <strong className="text-white">Response Time:</strong> We typically respond to emails within 24 hours during business days.
                </p>
              </div>
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