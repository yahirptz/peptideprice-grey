import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const supplies = [
  {
    name: 'Bacteriostatic Water 30ml',
    description: 'Sterile water for reconstitution. 0.9% benzyl alcohol preservative.',
    amazonLink: 'https://amzn.to/42mdHPX',
  },
  {
    name: 'Insulin Syringes 31G (100 pack)',
    description: '1ml insulin syringes with 31 gauge needle. Sterile, single-use.',
    amazonLink: 'https://amzn.to/3KmPx1H',
  },
  {
    name: 'Alcohol Prep Pads (200 pack)',
    description: 'Sterile 70% isopropyl alcohol prep pads for sanitization.',
    amazonLink: 'https://amzn.to/3KmBaKL',
  },
  {
    name: 'Empty Sterile Vials 10ml',
    description: 'Glass vials with rubber stoppers for storage and mixing.',
    amazonLink: 'https://amzn.to/3Ip05wF',
  },
  {
    name: 'Mini Fridge for Peptide Storage',
    description: 'Compact refrigerator for proper peptide storage at 2-8°C.',
    amazonLink: 'https://amzn.to/48DJ7oM',
  },
  {
    name: 'Digital Scale 0.001g Precision',
    description: 'Milligram scale for accurate peptide measurement.',
    amazonLink: 'https://amzn.to/3KODDxt',
  },
  {
    name: 'Insulin Vial Organizer Case (15 Slots)',
    description: 'Peptide travel case and vial protector. Fits standard 10ml vials. Case only (Blue).',
    amazonLink: 'https://amzn.to/3WeraWn',
  },
];

export default function SuppliesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg" />
              <span className="text-xl font-bold text-white">
                PremuimPeptides <span className="text-slate-400">Grey</span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/products" className="text-slate-300 hover:text-white transition">
                Products
              </Link>
              <link href="/" className="text-slate-300 hover:text-white transition">
                COA
              </link>
              <link href="/labs" className="text-slate-300 hover:text-white transition">
                Reviews
              </link>
              <Link href="/supplies" className="text-white font-semibold">
                Supplies
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition">
                About
              </Link>
              <Link href="/faq" className="text-slate-300 hover:text-white transition">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Research Supplies</h1>
          <p className="text-slate-400 text-lg">
            Essential supplies for peptide research and reconstitution. Curated Amazon recommendations.
          </p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
          <p className="text-blue-200 text-sm">
            <strong>Note:</strong> These are affiliate links to Amazon. We may earn a commission from purchases at no extra cost to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplies.map((supply, index) => (
            <div
              key={index}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600 transition backdrop-blur group"
            >
              <div className="h-64 bg-gradient-to-br from-slate-700/50 to-slate-800/50 relative overflow-hidden flex items-center justify-center">
                <div className="text-6xl font-bold text-slate-600/30">
                  {supply.name.charAt(0)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{supply.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{supply.description}</p>
                <a
                  href={supply.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition"
                >
                  View on Amazon
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white mb-2">Disclaimer</h3>
          <p className="text-slate-400 text-sm">
            These supplies are for research purposes. Always follow proper safety protocols and consult 
            relevant guidelines for handling research materials. As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-slate-400 text-sm">
            <p>© 2025 PremiumPeptides. Research use only.</p>
            <div className="flex space-x-6">
              <Link href="/products" className="hover:text-white transition">Products</Link>
              <Link href="/supplies" className="hover:text-white transition">Supplies</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
              <Link href="/faq" className="hover:text-white transition">FAQ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}