import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code, Key, Book, Terminal, Server, Lock } from "lucide-react";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Integrate Sponza's powerful features into your applications
            </p>
          </div>

          {/* Quick Start */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Terminal className="h-6 w-6 text-purple-600" />
                <CardTitle>Quick Start</CardTitle>
              </div>
              <CardDescription>
                Get started with our API in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">1. Get Your API Key</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Sign up for a developer account and generate your API key
                    from the dashboard.
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
                      <code className="block">
                        curl -X POST https://api.sponza.com/v1/auth/token \
                      </code>
                      <code className="block">
                        {" "}
                        -H "Content-Type: application/json" \
                      </code>
                      <code className="block">{`  -d '{"api_key": "your_api_key"}'`}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    2. Make Your First Request
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Test the API with a simple request to get your account
                    information.
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>curl https://api.sponza.com/v1/account \</code>
                      <code> -H "Authorization: Bearer your_access_token"</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
            <Tabs defaultValue="campaigns" className="space-y-4">
              <TabsList>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="influencers">Influencers</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="campaigns">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Management</CardTitle>
                    <CardDescription>
                      Endpoints for managing influencer marketing campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-green-500">GET</Badge>
                          <code className="text-sm">/v1/campaigns</code>
                        </div>
                        <p className="text-sm text-gray-600">
                          List all campaigns
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-500">POST</Badge>
                          <code className="text-sm">/v1/campaigns</code>
                        </div>
                        <p className="text-sm text-gray-600">
                          Create a new campaign
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-yellow-500">PUT</Badge>
                          <code className="text-sm">
                            /v1/campaigns/{"{"}id{"}"}
                          </code>
                        </div>
                        <p className="text-sm text-gray-600">
                          Update a campaign
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="influencers">
                <Card>
                  <CardHeader>
                    <CardTitle>Influencer Management</CardTitle>
                    <CardDescription>
                      Endpoints for managing influencer profiles and
                      collaborations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-green-500">GET</Badge>
                          <code className="text-sm">/v1/influencers</code>
                        </div>
                        <p className="text-sm text-gray-600">
                          List all influencers
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-green-500">GET</Badge>
                          <code className="text-sm">
                            /v1/influencers/{"{"}id{"}"}
                          </code>
                        </div>
                        <p className="text-sm text-gray-600">
                          Get influencer details
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>
                      Endpoints for accessing campaign and performance analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-green-500">GET</Badge>
                          <code className="text-sm">
                            /v1/analytics/campaigns/{"{"}id{"}"}
                          </code>
                        </div>
                        <p className="text-sm text-gray-600">
                          Get campaign analytics
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-green-500">GET</Badge>
                          <code className="text-sm">
                            /v1/analytics/influencers/{"{"}id{"}"}
                          </code>
                        </div>
                        <p className="text-sm text-gray-600">
                          Get influencer performance metrics
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>Payments</CardTitle>
                    <CardDescription>
                      Endpoints for managing payments and transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-green-500">GET</Badge>
                          <code className="text-sm">
                            /v1/payments/transactions
                          </code>
                        </div>
                        <p className="text-sm text-gray-600">
                          List all transactions
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-500">POST</Badge>
                          <code className="text-sm">/v1/payments/transfer</code>
                        </div>
                        <p className="text-sm text-gray-600">
                          Initiate a payment transfer
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Authentication & Security */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Key className="h-6 w-6 text-purple-600" />
                  <CardTitle>Authentication</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    All API requests must be authenticated using your API key.
                    Include it in the Authorization header:
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>Authorization: Bearer your_access_token</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="h-6 w-6 text-green-600" />
                  <CardTitle>Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• All API requests must be made over HTTPS</li>
                    <li>• API keys should be kept secure and never shared</li>
                    <li>• Rate limiting is applied to all endpoints</li>
                    <li>
                      • IP whitelisting is available for enterprise accounts
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SDKs & Libraries */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-blue-600" />
                <CardTitle>SDKs & Libraries</CardTitle>
              </div>
              <CardDescription>
                Official client libraries for popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Code className="mr-2 h-4 w-4" />
                  Node.js SDK
                </Button>
                <Button variant="outline" className="justify-start">
                  <Code className="mr-2 h-4 w-4" />
                  Python SDK
                </Button>
                <Button variant="outline" className="justify-start">
                  <Code className="mr-2 h-4 w-4" />
                  PHP SDK
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
