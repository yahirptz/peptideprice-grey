import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur space-y-6 text-slate-300">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-3">We collect the following information when you place an order:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address</li>
              <li><strong>Shipping Information:</strong> Delivery address, city, state, ZIP code</li>
              <li><strong>Payment Information:</strong> Payment method type (Bitcoin, Zelle, Cash App)</li>
              <li><strong>Order Information:</strong> Products purchased, quantities, prices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-3">Your information is used to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate order status and shipping updates</li>
              <li>Respond to customer service inquiries</li>
              <li>Maintain records of transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Information Storage</h2>
            <p>
              Your data is stored securely in our database hosted by Supabase/Neon. We implement industry-standard security measures to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
            <p className="mb-3">We <strong>do not sell, rent, or trade</strong> your personal information. We may share your information only with:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Shipping suppliers:</strong> To fulfill your order (address only)</li>
              <li><strong>Payment processors:</strong> To process transactions</li>
              <li><strong>Legal authorities:</strong> If required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking</h2>
            <p>
              We use minimal cookies for:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Shopping cart functionality</li>
              <li>Admin authentication</li>
              <li>Basic website analytics</li>
            </ul>
            <p className="mt-3">
              We do not use third-party advertising cookies or tracking pixels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to fulfill orders and maintain business records. Order information is typically retained for 7 years for tax and legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal retention requirements)</li>
              <li>Object to processing of your data</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure database storage</li>
              <li>Access controls and authentication</li>
              <li>Regular security updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Supabase/Neon:</strong> Database hosting</li>
              <li><strong>Vercel:</strong> Website hosting</li>
              <li><strong>Telegram:</strong> Order notifications (internal use only)</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies and security practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for individuals under 18 years of age. We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
            <p>
              For questions or concerns about this Privacy Policy or your personal data, please contact us through our website contact form.
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}