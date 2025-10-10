'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartButton from '@/components/CartButton';

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/starter-kits', label: 'Starter Kits' },
    { href: '/coa', label: 'COA' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/supplies', label: 'Supplies' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  isActive(link.href)
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
}