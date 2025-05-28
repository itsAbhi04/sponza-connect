import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Server, Key, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Security & Privacy
            </h1>
            <p className="text-xl text-gray-600">
              Your security is our top priority. Learn about our comprehensive security measures and data protection policies.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Data Protection</CardTitle>
                <CardDescription>How we protect your information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>End-to-end encryption for all sensitive data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Regular security audits and penetration testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Compliance with global data protection regulations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Keeping your account safe</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Two-factor authentication (2FA)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Secure password requirements and policies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Session management and device tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Privacy Controls</CardTitle>
                <CardDescription>Your data, your control</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Granular privacy settings for profile visibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Data export and deletion options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Transparent data usage policies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Server className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Infrastructure Security</CardTitle>
                <CardDescription>Enterprise-grade security</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Cloud infrastructure with DDoS protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Regular backups and disaster recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>24/7 security monitoring and incident response</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Security Best Practices */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Security Best Practices</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Password Security</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Use strong, unique passwords for your account</li>
                      <li>• Enable two-factor authentication</li>
                      <li>• Never share your login credentials</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Account Protection</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Regularly review your account activity</li>
                      <li>• Keep your contact information up to date</li>
                      <li>• Log out when using shared devices</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Safe Transactions</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Verify campaign details before accepting</li>
                      <li>• Use secure payment methods</li>
                      <li>• Report suspicious activity immediately</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Incident Response */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Security Incident Response</h2>
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Report Security Issues</CardTitle>
                <CardDescription>
                  If you notice any security concerns or suspicious activity, please report it immediately
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Our security team is available 24/7 to investigate and respond to security incidents. We take all
                    reports seriously and will work quickly to address any concerns.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Contact Security Team</h4>
                    <p className="text-gray-600">Email: security@sponza.com</p>
                    <p className="text-gray-600">Emergency: +91 1234567890</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 