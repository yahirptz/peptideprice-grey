'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartButton from '@/components/CartButton';
import AddToCartButton from '@/components/AddToCartButton';
import Image from 'next/image';
import { Search, X, AlertCircle } from 'lucide-react';
import { Analytics } from "@vercel/analytics/next"

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  dosage: string | null;
  category: string | null;
  salePrice: number;
  inStock: boolean;
  stockQuantity: number;
  imageUrl: string | null;
  supplier?: {
    displayName: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const getSupplierColor = (displayName?: string) => {
    if (!displayName) return 'bg-slate-600';
    if (displayName.includes('A')) return 'bg-blue-600';
    if (displayName.includes('B')) return 'bg-green-600';
    if (displayName.includes('C')) return 'bg-purple-600';
    return 'bg-slate-600';
  };

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
              <Link href="/products" className="text-white font-semibold">
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
              <Link href="/about" className="text-slate-300 hover:text-white transition">
                About
              </Link>
              <Link href="/faq" className="text-slate-300 hover:text-white transition">
                FAQ
              </Link>
              <CartButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-xl p-6 mb-8 backdrop-blur">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-2">
                Important: Single Supplier Per Order
              </h3>
              <p className="text-orange-200 text-sm mb-2">
                Each order must contain products from <strong>only ONE supplier</strong>. Mixing products from different suppliers will result in additional shipping charges.
              </p>
              <p className="text-orange-200 text-sm">
                Check the supplier badge on each product before adding to cart. Complete one supplier&apos;s order before ordering from another.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Research Peptides</h1>
          <p className="text-slate-400 text-lg mb-8">
            Browse our catalog of premium research peptides at competitive prices
          </p>

          <div className="max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search peptides by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="mt-4 text-slate-400 text-sm">
                Found <span className="text-white font-semibold">{filteredProducts.length}</span> result
                {filteredProducts.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="text-slate-400 text-lg">Loading products...</div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-slate-400">
                Showing <span className="text-white font-semibold">{filteredProducts.length}</span> product
                {filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600 transition backdrop-blur group"
                >
                  <div className="h-64 bg-gradient-to-br from-slate-700/50 to-slate-800/50 relative overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-slate-600/30">
                          {product.name.charAt(0)}
                        </div>
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <div className={`${getSupplierColor(product.supplier?.displayName)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {product.supplier?.displayName || 'Unknown'}
                      </div>
                    </div>

                    {!product.inStock && (
                      <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </div>
                    )}

                    {product.inStock && (
                      <div className="absolute top-14 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        In Stock
                      </div>
                    )}

                    {product.stockQuantity > 0 && product.stockQuantity < 10 && (
                      <div className="absolute top-24 right-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Only {product.stockQuantity} left!
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                      {product.category}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-300 transition">
                      {product.name}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          ${product.salePrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400">
                          Per kit (10 vials of {product.dosage})
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg text-center hover:bg-slate-600 transition text-sm font-semibold"
                      >
                        View Details
                      </Link>

                      <AddToCartButton product={product} inStock={product.inStock} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-slate-800/30 border border-slate-700 rounded-xl">
                <p className="text-slate-400 text-lg mb-2">No products found</p>
                <p className="text-slate-500 text-sm mb-4">
                  Try adjusting your search terms
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-16 bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
          <h3 className="text-sm font-bold text-white mb-2">Research Use Only</h3>
          <p className="text-slate-400 text-sm">
            All products are sold for research purposes only and are not intended for human consumption.
            By purchasing, you confirm you are 18+ and understand applicable regulations.
          </p>
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