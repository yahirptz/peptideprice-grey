import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import CartButton from '@/components/CartButton';
import AddToCartButton from '@/components/AddToCartButton';
import Image from 'next/image';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getProducts() {
  try {
    const { data: products, error } = await supabase
      .from('"Product"')
      .select('id, name, slug, description, dosage, category, salePrice, inStock, stockQuantity, imageUrl')
      .eq('isActive', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return products?.map(product => ({
      ...product,
      salePrice: Number(product.salePrice),
    })) || [];
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

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
              <Link href="/products" className="text-white font-semibold">
                Products
              </Link>
              <CartButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Research Peptides</h1>
          <p className="text-slate-400 text-lg">
            Browse our catalog of premium research peptides at competitive grey market prices
          </p>
        </div>

        <div className="mb-6">
          <p className="text-slate-400">
            Showing <span className="text-white font-semibold">{products.length}</span> products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
                
                {!product.inStock && (
                  <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
                
                {product.inStock && (
                  <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </div>
                )}

                {product.stockQuantity > 0 && product.stockQuantity < 10 && (
                  <div className="absolute top-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
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
                    <div className="text-xs text-slate-500">
                      {product.dosage} per vial
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

        {products.length === 0 && (
          <div className="text-center py-16 bg-slate-800/30 border border-slate-700 rounded-xl">
            <p className="text-slate-400 text-lg mb-2">No products found</p>
            <p className="text-slate-500 text-sm">Check back soon for new arrivals</p>
          </div>
        )}

        <div className="mt-16 bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
          <h3 className="text-sm font-bold text-white mb-2">⚠️ Research Use Only</h3>
          <p className="text-slate-400 text-sm">
            All products are sold for research purposes only and are not intended for human consumption. 
            By purchasing, you confirm you are 18+ and understand applicable regulations.
          </p>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-slate-400 text-sm">
            <p>© 2025 PeptidePrice Grey. Research use only.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}