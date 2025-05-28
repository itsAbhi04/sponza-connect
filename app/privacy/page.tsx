import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sponza
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-purple-600 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Sponza Technologies Pvt. Ltd. ("we," "our," or "us") respects your privacy and is committed to
                protecting your personal data. This privacy policy explains how we collect, use, and safeguard your
                information when you use our influencer marketing platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">2.1 Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>Profile pictures and bio information</li>
                  <li>Social media account details and statistics</li>
                  <li>Payment and banking information</li>
                  <li>Business information for brand accounts</li>
                </ul>

                <h3 className="text-xl font-semibold">2.2 Usage Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Platform interaction data and preferences</li>
                  <li>Campaign performance metrics</li>
                  <li>Communication logs and messages</li>
                  <li>Device information and IP addresses</li>
                </ul>

                <h3 className="text-xl font-semibold">2.3 Cookies and Tracking</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar technologies to enhance user experience, analyze platform usage, and
                  provide personalized content.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and maintain platform services</li>
                <li>Process payments and transactions</li>
                <li>Match brands with suitable influencers</li>
                <li>Communicate about campaigns and platform updates</li>
                <li>Improve platform functionality and user experience</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">4.1 With Other Users</h3>
                <p className="text-gray-700 leading-relaxed">
                  Profile information, portfolio content, and campaign-related communications are shared with relevant
                  platform users to facilitate collaborations.
                </p>

                <h3 className="text-xl font-semibold">4.2 With Service Providers</h3>
                <p className="text-gray-700 leading-relaxed">
                  We share data with trusted third-party services including payment processors (Razorpay), cloud storage
                  providers, and analytics services.
                </p>

                <h3 className="text-xl font-semibold">4.3 Legal Requirements</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may disclose information when required by law, court order, or to protect our rights and safety.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures including encryption, secure servers, and access
                controls to protect your personal information. However, no method of transmission over the internet is
                100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain personal information for as long as necessary to provide services, comply with legal
                obligations, and resolve disputes. Account data is typically retained for 7 years after account closure
                for legal and business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">7.1 Access and Portability</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can access and download your personal data through your account settings or by contacting us.
                </p>

                <h3 className="text-xl font-semibold">7.2 Correction and Updates</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can update your profile information at any time through your account dashboard.
                </p>

                <h3 className="text-xl font-semibold">7.3 Deletion</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can request account deletion, though some information may be retained for legal compliance.
                </p>

                <h3 className="text-xl font-semibold">7.4 Marketing Communications</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can opt out of marketing emails through unsubscribe links or account settings.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. International Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your data may be transferred to and processed in countries other than your residence. We ensure
                appropriate safeguards are in place for international data transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform is not intended for users under 18 years of age. We do not knowingly collect personal
                information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this privacy policy periodically. Significant changes will be communicated via email or
                platform notification. Your continued use constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about this Privacy Policy or to exercise your rights, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p>
                  <strong>Email:</strong> privacy@sponza.com
                </p>
                <p>
                  <strong>Data Protection Officer:</strong> dpo@sponza.com
                </p>
                <p>
                  <strong>Address:</strong> Sponza Technologies Pvt. Ltd., Mumbai, Maharashtra, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
