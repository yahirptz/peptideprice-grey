import Link from 'next/link';
import { ShoppingCart, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      category: "Ordering & Payment",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept Bitcoin (BTC), Zelle, and Cash App. These payment methods provide privacy and security for both parties. After placing your order, you will receive payment instructions with your unique order number."
        },
        {
          q: "How do I know my payment was received?",
          a: "You must include your order number in the payment memo/note. We verify payments within 24 hours and will update your order status. You can check your order status by contacting us with your order number."
        },
        {
          q: "Do you offer refunds?",
          a: "Due to the nature of research materials, we cannot accept returns or offer refunds once an order has shipped. We stand behind our product quality - if you receive damaged or incorrect items, contact us immediately with photos for resolution."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Orders are processed within 24-48 hours after payment confirmation. Domestic shipping typically takes 7-14 business days. You will receive tracking information via email once your order ships."
        },
        {
          q: "Is shipping discreet?",
          a: "Yes. All orders are shipped in plain, unmarked packaging with no indication of contents. The return address and shipping label contain no reference to peptides or our business name."
        },
        {
          q: "Do you ship internationally?",
          a: "Currently, we only ship within the United States. International shipping may become available in the future."
        },
        {
          q: "What if my package is lost or damaged?",
          a: "All orders include tracking. If your package shows as delivered but you have not received it, contact us within 48 hours. For damaged packages, provide photos immediately and we will work with you on a resolution."
        }
      ]
    },
    {
      category: "Product Quality & Safety",
      questions: [
        {
          q: "Are your peptides tested?",
          a: "Our peptides are sourced from established suppliers. Third-party lab testing certificates of analysis (COA) may be available upon request for specific batches. We prioritize working with suppliers who maintain quality standards."
        },
        {
          q: "How should I store peptides?",
          a: "Lyophilized (powder) peptides should be stored in a refrigerator (2-8°C) and are stable for extended periods. Once reconstituted, peptides should be refrigerated and used within the timeframe specified for that particular peptide. Avoid freezing reconstituted peptides."
        },
        {
          q: "What purity level are your peptides?",
          a: "Our peptides typically range from 98-99% purity, depending on the specific compound. Exact purity specifications are available upon request for specific products."
        },
        {
          q: "Do you provide reconstitution supplies?",
          a: "We do not sell supplies directly. Visit our Supplies page for recommendations on bacteriostatic water, syringes, and other items needed for research purposes (affiliate links to Amazon)."
        }
      ]
    },
    {
      category: "Legal & Compliance",
      questions: [
        {
          q: "Is it legal to buy these peptides?",
          a: "Our products are sold strictly for research purposes only. It is the buyer's responsibility to understand and comply with all applicable federal, state, and local laws regarding the purchase and possession of research peptides in their jurisdiction."
        },
        {
          q: "Can I use these peptides for personal use?",
          a: "No. All products are sold exclusively for in-vitro research purposes. These products are NOT intended for human consumption, clinical use, or any FDA-approved therapeutic application. We do not provide medical advice or support non-research use."
        },
        {
          q: "Do I need a prescription?",
          a: "No prescription is required for research peptides sold for laboratory research purposes. However, you must be 18+ years of age and acknowledge that products are for research only."
        },
        {
          q: "Are these FDA approved?",
          a: "No. Research peptides are not FDA-approved drugs. They are sold as research chemicals for laboratory and scientific research only, not for human or veterinary use."
        }
      ]
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          q: "Do I need to create an account?",
          a: "No account is required. We use a simple checkout process where you provide shipping information at the time of purchase. Your order number serves as your reference for tracking and support."
        },
        {
          q: "How do you protect my privacy?",
          a: "We take privacy seriously. We use secure encrypted connections, do not store payment details, and maintain discreet shipping practices. We do not sell or share customer information with third parties."
        },
        {
          q: "Do you keep records of purchases?",
          a: "We maintain order records for fulfillment and customer support purposes only. Your personal information is kept confidential and secure."
        }
      ]
    },
    {
      category: "Customer Support",
      questions: [
        {
          q: "How can I contact customer support?",
          a: "For order inquiries, include your order number and contact us via email or Telegram. We typically respond within 24 hours during business days."
        },
        {
          q: "What if I have questions about a specific peptide?",
          a: "We can provide general information about our products, sourcing, and storage. However, we cannot provide medical advice, dosing guidance, or support for non-research applications."
        },
        {
          q: "Can I modify or cancel my order?",
          a: "Orders can be modified or cancelled within 12 hours of placement, before payment is confirmed and processing begins. After processing starts, modifications are not possible."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg" />
              <span className="text-xl font-bold text-white">
                PremiumPeptides <span className="text-slate-400">Grey</span>
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/products" className="text-slate-300 hover:text-white transition">
                Products
              </Link>
              <Link href="/supplies" className="text-slate-300 hover:text-white transition">
                Supplies
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition">
                About
              </Link>
              <Link href="/faq" className="text-white font-semibold">
                FAQ
              </Link>
              <Link href="/cart" className="text-slate-300 hover:text-white transition">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              <link href="/account" className="text-slate-300 hover:text-white transition">
                Coa
              </link>
              <link href="/account" className="text-slate-300 hover:text-white transition">
                reviews
              </link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-lg mb-12">
            Find answers to common questions about ordering, shipping, and our research peptides.
          </p>

          <div className="space-y-8">
            {faqs.map((section, idx) => (
              <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur">
                <h2 className="text-2xl font-bold text-white mb-6">{section.category}</h2>
                <div className="space-y-6">
                  {section.questions.map((item, qIdx) => (
                    <div key={qIdx} className="border-b border-slate-700/50 last:border-0 pb-6 last:pb-0">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-2">
                        <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        {item.q}
                      </h3>
                      <p className="text-slate-300 leading-relaxed ml-7">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Still have questions?</h3>
            <p className="text-blue-200 text-sm mb-4">
              If you could not find the answer you are looking for, feel free to reach out to our support team.
              We are here to help with any questions about orders, products, or shipping.
            </p>
            <p className="text-blue-300 text-sm">
              Include your order number for faster support.
            </p>
          </div>

          <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-400 mb-3">Legal Disclaimer</h3>
            <p className="text-red-200 text-sm leading-relaxed">
              All products sold on this website are intended for in-vitro research and laboratory use only. 
              Products are not intended for human consumption, clinical, therapeutic, or diagnostic use. 
              By making a purchase, you acknowledge that you are 18+ years of age, conducting legitimate research, 
              and understand all applicable regulations in your jurisdiction.
            </p>
          </div>
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