import Link from "next/link"

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Sponza ("the Platform"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Platform Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Sponza is an influencer marketing platform that connects brands with content creators. We facilitate
                campaign creation, influencer discovery, application management, secure payments, and performance
                tracking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">3.1 Registration</h3>
                <p className="text-gray-700 leading-relaxed">
                  Users must provide accurate, current, and complete information during registration. You are
                  responsible for maintaining the confidentiality of your account credentials.
                </p>

                <h3 className="text-xl font-semibold">3.2 User Types</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Brands:</strong> Businesses seeking to collaborate with influencers
                  </li>
                  <li>
                    <strong>Influencers:</strong> Content creators looking to monetize their audience
                  </li>
                  <li>
                    <strong>Admins:</strong> Platform administrators with special privileges
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Platform Usage</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">4.1 Permitted Use</h3>
                <p className="text-gray-700 leading-relaxed">
                  Users may use the Platform for legitimate influencer marketing activities, including campaign
                  creation, influencer discovery, application submission, and content collaboration.
                </p>

                <h3 className="text-xl font-semibold">4.2 Prohibited Activities</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Creating fake accounts or providing false information</li>
                  <li>Engaging in fraudulent activities or payment manipulation</li>
                  <li>Harassment, abuse, or inappropriate communication</li>
                  <li>Violating intellectual property rights</li>
                  <li>Attempting to circumvent platform fees</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Payments and Fees</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">5.1 Platform Fees</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sponza charges a service fee on successful campaign completions. Current fee structure is available in
                  your account dashboard and may be updated with notice.
                </p>

                <h3 className="text-xl font-semibold">5.2 Payment Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  All payments are processed through Razorpay. Users agree to Razorpay's terms and conditions. Sponza is
                  not responsible for payment processing issues beyond our control.
                </p>

                <h3 className="text-xl font-semibold">5.3 Refunds</h3>
                <p className="text-gray-700 leading-relaxed">
                  Refunds are handled on a case-by-case basis. Subscription fees are generally non-refundable, but
                  campaign payments may be refunded if deliverables are not completed as agreed.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Content and Intellectual Property</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">6.1 User Content</h3>
                <p className="text-gray-700 leading-relaxed">
                  Users retain ownership of their content but grant Sponza a license to use, display, and distribute
                  content as necessary for platform operation.
                </p>

                <h3 className="text-xl font-semibold">6.2 Platform Content</h3>
                <p className="text-gray-700 leading-relaxed">
                  All platform features, design, and functionality are owned by Sponza and protected by intellectual
                  property laws.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
                protect your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Sponza provides the platform "as is" without warranties. We are not liable for indirect, incidental, or
                consequential damages arising from platform use. Our total liability is limited to the amount paid by
                the user in the preceding 12 months.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                Either party may terminate their account at any time. Sponza reserves the right to suspend or terminate
                accounts that violate these terms. Upon termination, access to the platform will be revoked, but payment
                obligations remain.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Sponza may update these terms periodically. Users will be notified of significant changes via email or
                platform notification. Continued use after changes constitutes acceptance of new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms are governed by the laws of India. Any disputes will be resolved through arbitration in
                Mumbai, Maharashtra.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p>
                  <strong>Email:</strong> legal@sponza.com
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
