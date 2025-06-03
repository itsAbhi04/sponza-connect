import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Eye, FileText, Users, Globe, Settings, Database, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              How we collect, use, and protect your personal information
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-purple-600" />
                <CardTitle>Introduction</CardTitle>
              </div>
              <CardDescription>
                Last updated: January 15, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <p>
                  At Sponza, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
                </p>
                <p>
                  We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-blue-600" />
                <CardTitle>Information We Collect</CardTitle>
              </div>
              <CardDescription>
                Types of data we collect and how we collect it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Name and contact information</li>
                    <li>• Account credentials</li>
                    <li>• Profile information</li>
                    <li>• Payment information</li>
                    <li>• Social media accounts</li>
                    <li>• Communication preferences</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Usage Information</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Platform activity logs</li>
                    <li>• Campaign performance data</li>
                    <li>• Device and browser information</li>
                    <li>• IP address and location data</li>
                    <li>• Cookies and similar technologies</li>
                    <li>• Analytics and metrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-green-600" />
                <CardTitle>How We Use Your Information</CardTitle>
              </div>
              <CardDescription>
                Purposes for which we process your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Platform Operations</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Account management</li>
                    <li>• Campaign facilitation</li>
                    <li>• Payment processing</li>
                    <li>• Customer support</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Improvement & Analytics</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Platform optimization</li>
                    <li>• Performance analytics</li>
                    <li>• Feature development</li>
                    <li>• User experience</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Communication</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Service updates</li>
                    <li>• Marketing communications</li>
                    <li>• Campaign notifications</li>
                    <li>• Support messages</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing & Disclosure */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-orange-600" />
                <CardTitle>Data Sharing & Disclosure</CardTitle>
              </div>
              <CardDescription>
                How and when we share your information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Service Providers</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Cloud hosting services</li>
                      <li>• Payment processors</li>
                      <li>• Analytics providers</li>
                      <li>• Customer support tools</li>
                      <li>• Marketing platforms</li>
                      <li>• Security services</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Legal Requirements</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Legal compliance</li>
                      <li>• Court orders</li>
                      <li>• Government requests</li>
                      <li>• Fraud prevention</li>
                      <li>• Terms enforcement</li>
                      <li>• Rights protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-purple-600" />
                <CardTitle>Your Rights</CardTitle>
              </div>
              <CardDescription>
                Your rights regarding your personal data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Data Access & Control</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Access your personal data</li>
                    <li>• Correct inaccurate data</li>
                    <li>• Request data deletion</li>
                    <li>• Data portability</li>
                    <li>• Object to processing</li>
                    <li>• Withdraw consent</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Privacy Preferences</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Communication preferences</li>
                    <li>• Cookie settings</li>
                    <li>• Marketing opt-outs</li>
                    <li>• Profile visibility</li>
                    <li>• Data sharing controls</li>
                    <li>• Account settings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Data Transfers */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <CardTitle>International Data Transfers</CardTitle>
              </div>
              <CardDescription>
                How we handle data across borders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  We may transfer your personal information to countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place for such transfers, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Legal Frameworks</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Standard Contractual Clauses</li>
                      <li>• Binding Corporate Rules</li>
                      <li>• Adequacy Decisions</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Security Measures</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Encryption in transit</li>
                      <li>• Secure data centers</li>
                      <li>• Access controls</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Compliance</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• GDPR requirements</li>
                      <li>• Local regulations</li>
                      <li>• Industry standards</li>
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
                How to reach our privacy team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Data Protection Officer</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Email: privacy@sponza.com</li>
                      <li>• Phone: +1 (555) 123-4567</li>
                      <li>• Address: 123 Privacy Street, Data City, 12345</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Data Subject Requests</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Request form: sponza.com/privacy/request</li>
                      <li>• Response time: 30 days</li>
                      <li>• Verification required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
