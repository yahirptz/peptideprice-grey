'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Check, ShoppingCart, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import Navigation from '@/components/Navigation';

interface StarterKit {
  id: string;
  name: string;
  peptideId: number;
  baseCost: number;
  suppliesCost: number;
  totalPrice: number;
  category: string;
  dosage: string;
  description: string;
  supplierId: number;
  supplierLabel: string;
  supplierShipping: number;
  monthlyEquivalent: string;
}

const STARTER_KITS: StarterKit[] = [
  {
    id: 'sema-10mg-kit',
    name: 'Semaglutide 10mg Complete Starter Kit',
    peptideId: 48, // ✅ FIXED: Correct database ID
    baseCost: 80,
    suppliesCost: 50,
    totalPrice: 130,
    category: 'Weight Loss',
    dosage: '10mg (10 vials)',
    description: 'Everything you need for 10 months: peptide vials, bacteriostatic water, syringes, alcohol pads, sharps container',
    supplierId: 3,
    supplierLabel: 'Supplier A',
    supplierShipping: 65,
    monthlyEquivalent: '$19.50/month (including shipping)'
  },
  {
    id: 'tirz-10mg-kit',
    name: 'Tirzepatide 10mg Complete Starter Kit',
    peptideId: 53, // ✅ FIXED: Correct database ID
    baseCost: 95,
    suppliesCost: 50,
    totalPrice: 145,
    category: 'Weight Loss',
    dosage: '10mg (10 vials)',
    description: 'Everything you need for 10 months: peptide vials, bacteriostatic water, syringes, alcohol pads, sharps container',
    supplierId: 3,
    supplierLabel: 'Supplier A',
    supplierShipping: 65,
    monthlyEquivalent: '$21/month (including shipping)'
  },
  {
    id: 'reta-10mg-kit',
    name: 'Retatrutide 10mg Complete Starter Kit',
    peptideId: 61, // ✅ FIXED: Correct database ID
    baseCost: 120,
    suppliesCost: 50,
    totalPrice: 170,
    category: 'Weight Loss',
    dosage: '10mg (10 vials)',
    description: 'Everything you need for 10 months: peptide vials, bacteriostatic water, syringes, alcohol pads, sharps container',
    supplierId: 3,
    supplierLabel: 'Supplier A',
    supplierShipping: 65,
    monthlyEquivalent: '$23.50/month (including shipping)'
  },
  {
    id: 'glow-70mg-kit',
    name: 'GLOW Blend Complete Starter Kit',
    peptideId: 119, // ✅ FIXED: Correct database ID
    baseCost: 200,
    suppliesCost: 50,
    totalPrice: 250,
    category: 'Blends',
    dosage: '70mg total (10 vials)',
    description: 'Everything you need: aesthetic peptide blend, bacteriostatic water, syringes, alcohol pads, sharps container',
    supplierId: 3,
    supplierLabel: 'Supplier A',
    supplierShipping: 65,
    monthlyEquivalent: '$31.50/month (including shipping)'
  },
  {
    id: 'klow-80mg-kit',
    name: 'KLOW Blend Complete Starter Kit',
    peptideId: 120, // ✅ FIXED: Correct database ID
    baseCost: 235,
    suppliesCost: 50,
    totalPrice: 285,
    category: 'Blends',
    dosage: '80mg total (10 vials)',
    description: 'Everything you need: longevity peptide blend, bacteriostatic water, syringes, alcohol pads, sharps container',
    supplierId: 3,
    supplierLabel: 'Supplier A',
    supplierShipping: 65,
    monthlyEquivalent: '$35/month (including shipping)'
  }
];

export default function StarterKitsPage() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const addKitToCart = async (kit: StarterKit) => {
    setAddingToCart(kit.id);
    
    // Check if cart has items from a different supplier
    const items = useCartStore.getState().items;
    if (items.length > 0) {
      const cartSupplier = items[0].supplierId;
      if (cartSupplier !== kit.supplierId) {
        alert(`Cannot mix suppliers! Your cart has items from a different supplier. Please checkout or clear your cart first.`);
        setAddingToCart(null);
        return;
      }
    }
    
    try {
      addItem({
        id: kit.peptideId,
        name: kit.name,
        slug: kit.id,
        dosage: kit.dosage,
        price: kit.totalPrice,
        imageUrl: null,
        supplierId: kit.supplierId,
        supplierLabel: kit.supplierLabel,
        supplierShippingCost: kit.supplierShipping
      });
      
      setTimeout(() => {
        setAddingToCart(null);
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
      setAddingToCart(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/50 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-blue-200 text-sm font-semibold">New to Peptides? Start Here</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Complete Starter Kits
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto mb-8">
            A simple way to start your peptide journey without having to look for supplies all over the place. 
            Everything you need in one package - peptides, supplies, and instructions.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
            <div className="flex items-center gap-2 text-green-400">
              <Check className="h-5 w-5" />
              <span>Save $2,300+ vs pharmacies</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Check className="h-5 w-5" />
              <span>All supplies included</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Check className="h-5 w-5" />
              <span>Ready to use immediately</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-12 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Package className="h-6 w-6" />
            What&apos;s Included in Every Starter Kit
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Check className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">10 Vials</h3>
              <p className="text-slate-400 text-sm">Pharmaceutical grade peptides</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Check className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Bac Water</h3>
              <p className="text-slate-400 text-sm">For reconstitution</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Check className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">100 Syringes</h3>
              <p className="text-slate-400 text-sm">31G insulin needles</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Check className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Alcohol Pads</h3>
              <p className="text-slate-400 text-sm">100 sterile pads</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Check className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Sharps Container</h3>
              <p className="text-slate-400 text-sm">Safe disposal included</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-xl p-6 mb-8 backdrop-blur">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-2">
                Smart Shipping Savings
              </h3>
              <p className="text-orange-200 text-sm mb-2">
                All starter kits ship from <strong>Supplier A</strong>. Add multiple kits to your cart and pay only <strong>$65 shipping once</strong> - no matter how many you order!
              </p>
              <p className="text-orange-200 text-sm">
                The prices shown below include peptides + supplies. Shipping ($65) is added at checkout.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {STARTER_KITS.map((kit) => (
            <div
              key={kit.id}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600 transition backdrop-blur group"
            >
              <div className="h-64 bg-gradient-to-br from-blue-900/30 to-slate-800/50 relative overflow-hidden flex items-center justify-center">
                <Package className="h-24 w-24 text-slate-600/50" />
                
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {kit.supplierLabel}
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  In Stock
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur rounded-lg p-3">
                  <p className="text-white text-sm font-semibold">✅ Complete Kit - No Extras Needed</p>
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                  {kit.category}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-300 transition">
                  {kit.name}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {kit.description}
                </p>

                <div className="bg-slate-900/50 rounded-lg p-4 mb-4 space-y-2">
                  <div className="flex justify-between text-slate-400 text-sm">
                    <span>Peptides ({kit.dosage})</span>
                    <span>${kit.baseCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-sm">
                    <span>Complete Supplies Kit</span>
                    <span>${kit.suppliesCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 flex justify-between text-white font-bold">
                    <span>Kit Price</span>
                    <span className="text-2xl">${kit.totalPrice}</span>
                  </div>
                  <p className="text-slate-500 text-xs italic text-center pt-1">
                    + $65 shipping (once per order) = {kit.monthlyEquivalent}
                  </p>
                </div>

                <button
                  onClick={() => addKitToCart(kit)}
                  disabled={addingToCart === kit.id}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    addingToCart === kit.id
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {addingToCart === kit.id ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-12 backdrop-blur">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            💰 Why Choose Our Starter Kits?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4">❌ US Compounding Pharmacy</h3>
              <div className="space-y-3 text-slate-300">
                <p>• $250-400 <strong>per month</strong></p>
                <p>• Supplies purchased separately</p>
                <p>• Monthly refill hassle</p>
                <p>• Need to source syringes elsewhere</p>
                <div className="border-t border-red-700/50 pt-3 mt-4">
                  <p className="text-2xl font-bold text-red-400">
                    = $2,500-4,000 for 10 months
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">✅ Our Starter Kits</h3>
              <div className="space-y-3 text-slate-300">
                <p>• $195-350 total for <strong>10-month supply</strong></p>
                <p>• All supplies included in kit</p>
                <p>• Order once, done for 10 months</p>
                <p>• Everything arrives ready to use</p>
                <div className="border-t border-green-700/50 pt-3 mt-4">
                  <p className="text-2xl font-bold text-green-400">
                    Save $2,150-3,650 (90%+)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
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