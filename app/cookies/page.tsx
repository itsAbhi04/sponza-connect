import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Cookie, Shield, Settings, Info } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600">
              Learn about how we use cookies and manage your preferences
            </p>
          </div>

          {/* Cookie Settings */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-purple-600" />
                <CardTitle>Cookie Settings</CardTitle>
              </div>
              <CardDescription>Manage your cookie preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Essential Cookies</Label>
                    <p className="text-sm text-gray-500">
                      Required for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                  <Switch disabled checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Cookies</Label>
                    <p className="text-sm text-gray-500">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Cookies</Label>
                    <p className="text-sm text-gray-500">
                      Used to track visitors across websites for marketing purposes.
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Preference Cookies</Label>
                    <p className="text-sm text-gray-500">
                      Remember your settings and preferences for a better experience.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Cookie className="h-6 w-6 text-blue-600" />
                  <CardTitle>Types of Cookies We Use</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-sm text-gray-600">
                      These cookies are necessary for the website to function properly. They enable basic functions like
                      page navigation and access to secure areas.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors interact with our website by collecting and reporting information
                      anonymously.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Preference Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Enable the website to remember information that changes the way the website behaves or looks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  <CardTitle>Your Privacy Rights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Under data protection laws, you have rights including:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Your right of access</li>
                    <li>• Your right to rectification</li>
                    <li>• Your right to erasure</li>
                    <li>• Your right to restrict processing</li>
                    <li>• Your right to data portability</li>
                    <li>• Your right to object</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    You can exercise these rights by contacting our Data Protection Officer at privacy@sponza.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Info className="h-6 w-6 text-purple-600" />
                <CardTitle>Additional Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. Please visit this Cookie Policy regularly to stay informed
                  about our use of cookies and related technologies.
                </p>
                <p>
                  The date at the top of this Cookie Policy indicates when it was last updated. Your continued use of our
                  website after any such changes constitutes your acceptance of the new Cookie Policy.
                </p>
                <p>
                  If you have any questions about our use of cookies or other technologies, please contact us at
                  privacy@sponza.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 