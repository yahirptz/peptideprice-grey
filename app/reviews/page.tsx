import Link from 'next/link';
import { ShoppingCart, Star, Send } from 'lucide-react';

export default function ReviewsPage() {
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
              <Link href="/coa" className="text-slate-300 hover:text-white transition">
                COA
              </Link>
              <Link href="/reviews" className="text-white font-semibold">
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

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Customer Reviews</h1>
          <p className="text-slate-400 text-lg mb-12">
            See what our customers are saying about their research experience with PremiumPeptides.
          </p>

          {/* Empty State */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-12 text-center backdrop-blur mb-12">
            <Star className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Reviews Yet</h2>
            <p className="text-slate-400 mb-6">
              Be the first to share your experience with our research peptides!
            </p>
          </div>

          {/* Submit Review Section */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Submit Your Review</h2>
            <p className="text-slate-300 text-center mb-6">
              Share your experience with our products and help other researchers make informed decisions.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-200 text-sm">
                <strong>Note:</strong> All reviews are manually reviewed and approved by our team before being published. This helps us maintain quality and authenticity.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">How to Submit a Review</h3>
              <div className="space-y-3 text-slate-300 text-sm">
                <p>To submit a review, please email us at:</p>
                <a 
                  href="mailto:Yahir.perezt70@gmail.com?subject=Product Review Submission"
                  className="block text-blue-400 hover:text-blue-300 transition font-semibold text-lg"
                >
                  Yahir.perezt70@gmail.com
                </a>
                <p className="pt-4">Please include in your review:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Your order number (for verification)</li>
                  <li>Product name and rating (1-5 stars)</li>
                  <li>Your experience with the product quality</li>
                  <li>Shipping and packaging feedback</li>
                  <li>Any additional comments</li>
                </ul>
                <p className="pt-4 text-slate-400">
                  Reviews are typically reviewed and published within 2-3 business days.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              
                <a href="mailto:Yahir.perezt70@gmail.com?subject=Product Review Submission&body=Order Number:%0D%0AProduct Name:%0D%0ARating (1-5 stars):%0D%0A%0D%0AYour Review:%0D%0A"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
              >
                <Send className="h-5 w-5" />
                Email Your Review
              </a>
            </div>
          </div>

          {/* Future Reviews Notice */}
          <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <p className="text-slate-400 text-sm">
              Customer reviews will appear here once submitted and approved. All reviews are from verified purchasers.
            </p>
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
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}