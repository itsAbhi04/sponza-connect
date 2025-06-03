import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Key, AlertTriangle, Eye, FileCheck, Users } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Security at Sponza
            </h1>
            <p className="text-xl text-gray-600">
              Your data security is our top priority
            </p>
          </div>

          {/* Security Overview */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-purple-600" />
                <CardTitle>Security Overview</CardTitle>
              </div>
              <CardDescription>
                Our comprehensive security measures protect your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Infrastructure Security</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• AWS Cloud Infrastructure with 99.99% uptime</li>
                    <li>• Multi-region data replication</li>
                    <li>• DDoS protection and mitigation</li>
                    <li>• Regular security audits and penetration testing</li>
                    <li>• Automated threat detection and response</li>
                    <li>• 24/7 security monitoring</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Data Protection</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• End-to-end encryption for all data in transit</li>
                    <li>• AES-256 encryption for data at rest</li>
                    <li>• Regular security backups</li>
                    <li>• Data retention policies</li>
                    <li>• GDPR and CCPA compliance</li>
                    <li>• SOC 2 Type II certified</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication & Access Control */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Key className="h-6 w-6 text-blue-600" />
                <CardTitle>Authentication & Access Control</CardTitle>
              </div>
              <CardDescription>
                Multi-layered authentication and authorization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Multi-Factor Authentication</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• SMS verification</li>
                      <li>• Authenticator apps</li>
                      <li>• Hardware security keys</li>
                      <li>• Biometric authentication</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Role-Based Access</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Granular permissions</li>
                      <li>• Team-based access</li>
                      <li>• Audit logging</li>
                      <li>• Session management</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">API Security</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• API key management</li>
                      <li>• OAuth 2.0 support</li>
                      <li>• Rate limiting</li>
                      <li>• IP whitelisting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Privacy */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-green-600" />
                <CardTitle>Data Privacy</CardTitle>
              </div>
              <CardDescription>
                How we protect and manage your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Data Processing</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Data minimization principles</li>
                      <li>• Purpose limitation</li>
                      <li>• Data subject rights</li>
                      <li>• Privacy by design</li>
                      <li>• Regular privacy impact assessments</li>
                      <li>• Data processing agreements</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Compliance</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• GDPR compliance</li>
                      <li>• CCPA/CPRA compliance</li>
                      <li>• ISO 27001 certified</li>
                      <li>• Regular compliance audits</li>
                      <li>• Data protection officer</li>
                      <li>• Privacy policy updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Best Practices */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileCheck className="h-6 w-6 text-orange-600" />
                <CardTitle>Security Best Practices</CardTitle>
              </div>
              <CardDescription>
                Guidelines for maintaining secure usage of our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Account Security</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Use strong, unique passwords</li>
                      <li>• Enable MFA for all accounts</li>
                      <li>• Regularly review account activity</li>
                      <li>• Update security settings</li>
                      <li>• Monitor API key usage</li>
                      <li>• Report suspicious activity</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Data Management</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Regular data backups</li>
                      <li>• Secure data sharing</li>
                      <li>• Data classification</li>
                      <li>• Access review procedures</li>
                      <li>• Secure file handling</li>
                      <li>• Data retention policies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incident Response */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <CardTitle>Incident Response</CardTitle>
              </div>
              <CardDescription>
                Our approach to security incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Detection</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 24/7 monitoring</li>
                      <li>• Automated alerts</li>
                      <li>• Threat intelligence</li>
                      <li>• User reporting</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Response</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Dedicated response team</li>
                      <li>• Incident classification</li>
                      <li>• Containment procedures</li>
                      <li>• Communication protocols</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Recovery</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• System restoration</li>
                      <li>• Data recovery</li>
                      <li>• Post-incident review</li>
                      <li>• Prevention measures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Contact */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-purple-600" />
                <CardTitle>Security Contact</CardTitle>
              </div>
              <CardDescription>
                How to reach our security team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  For security concerns, vulnerability reports, or security-related questions, please contact our security team:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Security Team</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Email: security@sponza.com</li>
                      <li>• PGP Key: 0x1234567890ABCDEF</li>
                      <li>• Response time: 24 hours</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Bug Bounty Program</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Platform: HackerOne</li>
                      <li>• Rewards: Up to $10,000</li>
                      <li>• Scope: All production systems</li>
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
