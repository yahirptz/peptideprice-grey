'use client';

import Link from 'next/link';
import { ShoppingCart, Star, ThumbsUp, Calendar, User, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

export default function ReviewsPage() {
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');

  // Sample reviews - replace with real data from your database
  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'John D.',
      productName: 'Semaglutide 5mg',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent quality, fast shipping',
      comment: 'Received my order within a week. Product arrived well-packaged and properly stored. Third-party testing confirmed purity. Will definitely order again.',
      verified: true,
      helpful: 12
    },
    {
      id: '2',
      customerName: 'Sarah M.',
      productName: 'BPC-157 5mg',
      rating: 5,
      date: '2024-01-12',
      title: 'Great for research purposes',
      comment: 'High-quality peptide for laboratory research. COA provided matched the batch number. Professional service throughout.',
      verified: true,
      helpful: 8
    },
    {
      id: '3',
      customerName: 'Mike R.',
      productName: 'Tirzepatide 10mg',
      rating: 4,
      date: '2024-01-10',
      title: 'Good product, minor shipping delay',
      comment: 'Product quality is excellent, third-party tested. Shipping took slightly longer than expected but customer service kept me updated. Overall satisfied.',
      verified: true,
      helpful: 5
    },
    {
      id: '4',
      customerName: 'Emily K.',
      productName: 'TB-500 5mg',
      rating: 5,
      date: '2024-01-08',
      title: 'Reliable supplier',
      comment: 'Third order from PremiumPeptides. Consistently high quality, proper storage, and discreet packaging. Best prices I\'ve found for research peptides.',
      verified: true,
      helpful: 15
    },
    {
      id: '5',
      customerName: 'David L.',
      productName: 'Semaglutide 5mg',
      rating: 5,
      date: '2024-01-05',
      title: 'Professional service',
      comment: 'Impressed by the professionalism. Quick responses to questions, transparent about sourcing, and provided COA without asking. Highly recommend.',
      verified: true,
      helpful: 10
    },
    {
      id: '6',
      customerName: 'Rachel P.',
      productName: 'Retatrutide 10mg',
      rating: 5,
      date: '2024-01-03',
      title: 'Best grey market supplier',
      comment: 'Been ordering from various suppliers for years. PremiumPeptides has the best combination of quality, price, and service. COAs are legit.',
      verified: true,
      helpful: 18
    }
  ];

  const products = ['all', ...Array.from(new Set(reviews.map(r => r.productName)))];

  const filteredAndSortedReviews = reviews
    .filter(review => selectedProduct === 'all' || review.productName === selectedProduct)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const verifiedCount = reviews.filter(r => r.verified).length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
        }`}
      />
    ));
  };

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
          <h1 className="text-4xl font-bold text-white mb-8">Customer Reviews</h1>

          {/* Rating Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-400">Average Rating</div>
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <User className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-3xl font-bold text-white">{totalReviews}</div>
                  <div className="text-sm text-slate-400">Total Reviews</div>
                </div>
              </div>
              <div className="text-sm text-slate-300 mt-2">
                {verifiedCount} verified purchases
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-3xl font-bold text-white">96%</div>
                  <div className="text-sm text-slate-400">Recommend Us</div>
                </div>
              </div>
              <div className="text-sm text-slate-300 mt-2">
                Based on customer feedback
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {products.map(product => (
                <option key={product} value={product}>
                  {product === 'all' ? 'All Products' : product}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'rating' | 'helpful')}
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredAndSortedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                      {review.verified && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {review.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      by {review.customerName} • {review.productName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-4">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Share Your Experience
            </h3>
            <p className="text-slate-300 mb-6">
              Have you ordered from PremiumPeptides? We'd love to hear about your experience!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
            >
              Write a Review
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