import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              PeptidePrice <span className="text-slate-400">Grey</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur space-y-6 text-slate-300">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PeptidePrice Grey ("the Website"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Research Use Only</h2>
            <p className="mb-3">
              <strong className="text-red-400">IMPORTANT:</strong> All products sold on this Website are intended <strong>FOR RESEARCH PURPOSES ONLY</strong> and are <strong>NOT FOR HUMAN CONSUMPTION</strong>.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Products are not FDA approved</li>
              <li>Products are not intended to diagnose, treat, cure, or prevent any disease</li>
              <li>Products are not intended for use as drugs, food additives, or dietary supplements</li>
              <li>Products are sold strictly for laboratory research purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Age Requirement</h2>
            <p>
              You must be at least <strong>18 years of age</strong> to purchase products from this Website. By placing an order, you certify that you are 18 years or older.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Product Information</h2>
            <p className="mb-3">While we strive to provide accurate product information:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>We do not warrant that product descriptions are accurate, complete, or error-free</li>
              <li>Certificate of Analysis (COA) may be available upon request for specific batches</li>
              <li>Product quality depends on supplier standards</li>
              <li>We are not responsible for product misuse or improper handling</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Orders and Payment</h2>
            <p className="mb-3">We accept the following payment methods:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Bitcoin (BTC)</li>
              <li>Zelle</li>
              <li>Cash App</li>
            </ul>
            <p className="mt-3">
              You must include your order number in the payment memo. Orders are processed within 24-48 hours after payment confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Shipping</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Currently shipping within the United States only</li>
              <li>Typical delivery: 7-14 business days</li>
              <li>All packages shipped discreetly with no product markings</li>
              <li>We are not responsible for packages lost or stolen after delivery confirmation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Returns and Refunds</h2>
            <p className="mb-3">
              Due to the nature of research materials, we <strong>do not accept returns or offer refunds</strong> once an order has shipped.
            </p>
            <p>
              Exceptions: If you receive damaged or incorrect items, contact us within 48 hours with photographic evidence for resolution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Liability Disclaimer</h2>
            <p className="mb-3 font-semibold text-yellow-400">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>We provide products "AS IS" without any warranties</li>
              <li>We are not liable for any damages resulting from product use or misuse</li>
              <li>We are not responsible for legal consequences of purchasing or possessing research peptides in your jurisdiction</li>
              <li>Total liability shall not exceed the purchase price of the product</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Legal Compliance</h2>
            <p>
              You are responsible for understanding and complying with all applicable laws and regulations in your jurisdiction regarding the purchase, possession, and use of research peptides.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Prohibited Uses</h2>
            <p className="mb-3">You agree NOT to use products for:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Human or animal consumption</li>
              <li>Clinical trials without proper authorization</li>
              <li>Any illegal purposes</li>
              <li>Resale to end consumers for human consumption</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the Website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us through our website contact form.
            </p>
          </section>

          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-300 font-semibold">
              ⚠️ By purchasing from PeptidePrice Grey, you acknowledge that you have read, understood, and agree to these Terms of Service.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}