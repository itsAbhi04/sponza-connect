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
import { 
  Code, 
  Key, 
  Book, 
  Terminal, 
  Server, 
  Lock, 
  AlertCircle,
  Webhook,
  Zap,
  Clock
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sponza API Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Build powerful influencer marketing applications with Sponza's API
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
                    Sign up for a developer account and generate your API key from the dashboard.
                    Your API key is required for all API requests.
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code className="block"># Get your access token</code>
                      <code className="block">curl -X POST https://api.sponza.com/v1/auth/token \</code>
                      <code className="block">  -H "Content-Type: application/json" \</code>
                      <code className="block">{`  -d '{"api_key": "your_api_key"}'`}</code>
                      <code className="block mt-4"># Response</code>
                      <code className="block">{`{"access_token": "eyJhbGciOiJIUzI1NiIs...", "expires_in": 3600}`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Make Your First Request</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Test the API with a simple request to get your account information.
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code className="block"># Get account information</code>
                      <code className="block">curl https://api.sponza.com/v1/account \</code>
                      <code className="block">  -H "Authorization: Bearer your_access_token"</code>
                      <code className="block mt-4"># Response</code>
                      <code className="block">{`{
  "id": "acc_123",
  "name": "Your Company",
  "email": "contact@yourcompany.com",
  "plan": "pro",
  "created_at": "2024-01-01T00:00:00Z"
}`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Code Examples</h3>
                  <Tabs defaultValue="node" className="mt-4">
                    <TabsList>
                      <TabsTrigger value="node">Node.js</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="php">PHP</TabsTrigger>
                    </TabsList>
                    <TabsContent value="node">
                      <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <code>{`const axios = require('axios');

const client = axios.create({
  baseURL: 'https://api.sponza.com/v1',
  headers: {
    'Authorization': \`Bearer \${process.env.SPONZA_API_KEY}\`
  }
});

async function getAccount() {
  try {
    const response = await client.get('/account');
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}`}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="python">
                      <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <code>{`import requests

client = requests.Session()
client.headers.update({
    'Authorization': f'Bearer {os.getenv("SPONZA_API_KEY")}'
})

def get_account():
    try:
        response = client.get('https://api.sponza.com/v1/account')
        return response.json()
    except requests.exceptions.RequestException as e:
        print(e.response.json())`}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="php">
                      <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <code>{`<?php

$client = new GuzzleHttp\\Client([
    'base_uri' => 'https://api.sponza.com/v1',
    'headers' => [
        'Authorization' => 'Bearer ' . getenv('SPONZA_API_KEY')
    ]
]);

try {
    $response = $client->get('/account');
    $data = json_decode($response->getBody(), true);
    print_r($data);
} catch (Exception $e) {
    echo $e->getMessage();
}`}</code>
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
            <Tabs defaultValue="campaigns" className="space-y-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <Accordion type="single" collapsible className="space-y-4">
                      <AccordionItem value="list-campaigns">
                        <AccordionTrigger>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-500">GET</Badge>
                            <code className="text-sm">/v1/campaigns</code>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              List all campaigns for your account. Supports pagination and filtering.
                            </p>
                            <div className="space-y-2">
                              <h4 className="font-semibold">Query Parameters</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• <code>page</code> - Page number (default: 1)</li>
                                <li>• <code>limit</code> - Items per page (default: 20, max: 100)</li>
                                <li>• <code>status</code> - Filter by status (active, completed, draft)</li>
                                <li>• <code>search</code> - Search by campaign name</li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                              <pre className="text-sm">
                                <code className="block"># Request</code>
                                <code className="block">curl https://api.sponza.com/v1/campaigns?status=active&page=1&limit=20 \</code>
                                <code className="block">  -H "Authorization: Bearer your_access_token"</code>
                                <code className="block mt-4"># Response</code>
                                <code className="block">{`{
  "data": [
    {
      "id": "camp_123",
      "name": "Summer Collection Launch",
      "status": "active",
      "budget": 5000,
      "start_date": "2024-06-01",
      "end_date": "2024-08-31",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}`}</code>
                              </pre>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="create-campaign">
                        <AccordionTrigger>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-500">POST</Badge>
                            <code className="text-sm">/v1/campaigns</code>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Create a new influencer marketing campaign.
                            </p>
                            <div className="space-y-2">
                              <h4 className="font-semibold">Request Body</h4>
                              <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                                <code>{`{
  "name": "Summer Collection Launch",
  "description": "Promote our new summer collection",
  "budget": 5000,
  "start_date": "2024-06-01",
  "end_date": "2024-08-31",
  "target_audience": {
    "age_range": [18, 35],
    "interests": ["fashion", "lifestyle"],
    "locations": ["US", "CA"]
  },
  "requirements": {
    "min_followers": 10000,
    "content_types": ["instagram", "tiktok"]
  }
}`}</code>
                              </pre>
                            </div>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                              <pre className="text-sm">
                                <code className="block"># Response</code>
                                <code className="block">{`{
  "id": "camp_123",
  "name": "Summer Collection Launch",
  "status": "draft",
  "budget": 5000,
  "start_date": "2024-06-01",
  "end_date": "2024-08-31",
  "created_at": "2024-01-15T10:00:00Z",
  "target_audience": {
    "age_range": [18, 35],
    "interests": ["fashion", "lifestyle"],
    "locations": ["US", "CA"]
  },
  "requirements": {
    "min_followers": 10000,
    "content_types": ["instagram", "tiktok"]
  }
}`}</code>
                              </pre>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
                  <div className="space-y-2">
                    <h4 className="font-semibold">Authentication Flow</h4>
                    <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                      <li>Generate an API key from your dashboard</li>
                      <li>Exchange the API key for an access token</li>
                      <li>Use the access token in all subsequent requests</li>
                      <li>Refresh the token before it expires (1 hour)</li>
                    </ol>
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
                    <li>• IP whitelisting is available for enterprise accounts</li>
                    <li>• Access tokens expire after 1 hour</li>
                    <li>• All sensitive data is encrypted at rest</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rate Limiting */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-orange-600" />
                <CardTitle>Rate Limiting</CardTitle>
              </div>
              <CardDescription>
                API usage limits and quotas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Free Plan</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 100 requests/minute</li>
                      <li>• 10,000 requests/day</li>
                      <li>• Basic endpoints only</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Plan</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 500 requests/minute</li>
                      <li>• 50,000 requests/day</li>
                      <li>• All endpoints</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Enterprise</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Custom limits</li>
                      <li>• Unlimited requests</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
                    <code className="block"># Rate limit headers in response</code>
                    <code className="block">X-RateLimit-Limit: 100</code>
                    <code className="block">X-RateLimit-Remaining: 95</code>
                    <code className="block">X-RateLimit-Reset: 1611234567</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Handling */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <CardTitle>Error Handling</CardTitle>
              </div>
              <CardDescription>
                Common error codes and how to handle them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">HTTP Status Codes</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <code>400</code> - Bad Request</li>
                      <li>• <code>401</code> - Unauthorized</li>
                      <li>• <code>403</code> - Forbidden</li>
                      <li>• <code>404</code> - Not Found</li>
                      <li>• <code>429</code> - Too Many Requests</li>
                      <li>• <code>500</code> - Internal Server Error</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Error Response Format</h4>
                    <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                      <code>{`{
  "error": {
    "code": "invalid_request",
    "message": "Invalid request parameters",
    "details": {
      "field": "budget",
      "reason": "must be greater than 0"
    }
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Webhooks */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Webhook className="h-6 w-6 text-blue-600" />
                <CardTitle>Webhooks</CardTitle>
              </div>
              <CardDescription>
                Receive real-time updates about your campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Configure webhooks to receive real-time notifications about campaign events.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Available Events</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code>campaign.created</code> - New campaign created</li>
                    <li>• <code>campaign.updated</code> - Campaign details updated</li>
                    <li>• <code>campaign.completed</code> - Campaign completed</li>
                    <li>• <code>influencer.joined</code> - Influencer joined campaign</li>
                    <li>• <code>content.published</code> - New content published</li>
                    <li>• <code>payment.processed</code> - Payment processed</li>
                  </ul>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
                    <code className="block"># Webhook payload example</code>
                    <code className="block">{`{
  "event": "campaign.created",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "campaign_id": "camp_123",
    "name": "Summer Collection Launch",
    "status": "draft"
  },
  "signature": "sha256=..."
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

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
              <div className="mt-4 text-sm text-gray-600">
                <p>Install our official SDKs to get started quickly:</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2">
                  <pre className="text-sm">
                    <code className="block"># Node.js</code>
                    <code className="block">npm install @sponza/api</code>
                    <code className="block mt-2"># Python</code>
                    <code className="block">pip install sponza-api</code>
                    <code className="block mt-2"># PHP</code>
                    <code className="block">composer require sponza/api</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
