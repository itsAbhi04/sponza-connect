import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, Users, Shield, Briefcase, Globe, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using our platform
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-purple-600" />
                <CardTitle>Introduction</CardTitle>
              </div>
              <CardDescription>
                Last updated: January 15, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <p>
                  Welcome to Sponza. These Terms of Service ("Terms") govern your access to and use of the Sponza platform, including our website, API, and services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and Sponza Technologies Pvt. Ltd. ("Sponza," "we," "us," or "our"). If you do not agree to these Terms, please do not use our Platform.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Terms */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <CardTitle>Account Terms</CardTitle>
              </div>
              <CardDescription>
                Rules and requirements for using our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Account Requirements</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Must be 18 years or older</li>
                    <li>• Provide accurate information</li>
                    <li>• Maintain account security</li>
                    <li>• One account per person</li>
                    <li>• No automated account creation</li>
                    <li>• No account sharing</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Account Responsibilities</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Keep contact info updated</li>
                    <li>• Protect login credentials</li>
                    <li>• Report security issues</li>
                    <li>• Monitor account activity</li>
                    <li>• Comply with platform rules</li>
                    <li>• Pay fees when due</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Rules */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-green-600" />
                <CardTitle>Platform Rules</CardTitle>
              </div>
              <CardDescription>
                Guidelines for using our services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Content Guidelines</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• No illegal content</li>
                    <li>• No hate speech</li>
                    <li>• No spam or scams</li>
                    <li>• No copyright violations</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Campaign Rules</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Clear campaign terms</li>
                    <li>• Fair compensation</li>
                    <li>• Transparent metrics</li>
                    <li>• No fake engagement</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Community Standards</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Professional conduct</li>
                    <li>• Respectful communication</li>
                    <li>• No harassment</li>
                    <li>• No discrimination</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Terms */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-orange-600" />
                <CardTitle>Legal Terms</CardTitle>
              </div>
              <CardDescription>
                Important legal information and disclaimers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Intellectual Property</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Platform content ownership</li>
                      <li>• User content licensing</li>
                      <li>• Trademark usage</li>
                      <li>• Copyright protection</li>
                      <li>• Brand guidelines</li>
                      <li>• Content rights</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Liability & Warranty</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Service availability</li>
                      <li>• Data accuracy</li>
                      <li>• Third-party content</li>
                      <li>• Limitation of liability</li>
                      <li>• Indemnification</li>
                      <li>• Dispute resolution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-purple-600" />
                <CardTitle>Payment Terms</CardTitle>
              </div>
              <CardDescription>
                Fees, payments, and financial terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Fees & Charges</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Platform fees</li>
                    <li>• Processing fees</li>
                    <li>• Currency conversion</li>
                    <li>• Tax obligations</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Processing</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Payment methods</li>
                    <li>• Processing times</li>
                    <li>• Refund policy</li>
                    <li>• Chargeback handling</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Financial Terms</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Payment schedules</li>
                    <li>• Late fees</li>
                    <li>• Account suspension</li>
                    <li>• Dispute resolution</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <CardTitle>Termination</CardTitle>
              </div>
              <CardDescription>
                Account termination and suspension policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Account Termination</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Violation of terms</li>
                      <li>• Fraudulent activity</li>
                      <li>• Extended inactivity</li>
                      <li>• User request</li>
                      <li>• Legal requirements</li>
                      <li>• Platform changes</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Post-Termination</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Data retention</li>
                      <li>• Outstanding payments</li>
                      <li>• Content removal</li>
                      <li>• Appeal process</li>
                      <li>• Account reactivation</li>
                      <li>• Legal obligations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <CardTitle>Governing Law</CardTitle>
              </div>
              <CardDescription>
                Legal jurisdiction and dispute resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Mumbai, Maharashtra.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Jurisdiction</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Indian law applies</li>
                      <li>• Mumbai courts</li>
                      <li>• Local regulations</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Arbitration</li>
                      <li>• Mediation</li>
                      <li>• Court proceedings</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Class Action</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Individual claims</li>
                      <li>• No class actions</li>
                      <li>• Small claims court</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mail className="h-6 w-6 text-purple-600" />
                <CardTitle>Contact Information</CardTitle>
              </div>
              <CardDescription>
                How to reach our legal team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  For questions about these Terms or legal matters, please contact our legal team:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Legal Department</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Email: legal@sponza.com</li>
                      <li>• Phone: +1 (555) 123-4567</li>
                      <li>• Address: 123 Legal Street, Mumbai, India</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Legal Requests</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Legal notices</li>
                      <li>• Subpoenas</li>
                      <li>• Court orders</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
