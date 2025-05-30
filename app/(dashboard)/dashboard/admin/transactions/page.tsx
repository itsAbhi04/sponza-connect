"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  MessageSquare,
  BarChart3,
  Shield,
} from "lucide-react"

export default function TransactionMonitoringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Transaction Monitoring</h1>
              <p className="text-gray-600">Monitor and audit platform transactions</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Security Audit
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2.5Cr</div>
                <p className="text-xs text-gray-600">+30% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹12.5L</div>
                <p className="text-xs text-gray-600">15 transactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">AI Flagged</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2.5L</div>
                <p className="text-xs text-red-600">5 suspicious transactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.8%</div>
                <p className="text-xs text-gray-600">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Monitor and audit platform transactions</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-8"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="flagged">AI Flagged</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {/* Transaction 1 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Campaign Payment</h3>
                          <Badge className="bg-green-100 text-green-700">Completed</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Fashion Brand Co. • 2 hours ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Amount: ₹2,50,000</span>
                          <span>Transaction ID: TXN123456</span>
                          <span>Payment Method: Bank Transfer</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Successfully processed</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>

                  {/* Transaction 2 - Flagged */}
                  <div className="border rounded-lg p-6 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Influencer Payment</h3>
                          <Badge className="bg-red-100 text-red-700">AI Flagged</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Tech Startup Inc. • 5 hours ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Amount: ₹1,50,000</span>
                          <span>Transaction ID: TXN123457</span>
                          <span>Payment Method: UPI</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span>Anomaly Detected: Unusual Payment Pattern</span>
                          <span className="text-gray-400">|</span>
                          <span>Confidence: 92%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm">Investigate</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="flagged" className="space-y-4">
                  {/* Flagged Transaction */}
                  <div className="border rounded-lg p-6 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Campaign Refund</h3>
                          <Badge className="bg-red-100 text-red-700">AI Flagged</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Beauty Brand Ltd. • 1 day ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Amount: ₹3,00,000</span>
                          <span>Transaction ID: TXN123458</span>
                          <span>Payment Method: Credit Card</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span>Anomaly Detected: Multiple Refund Attempts</span>
                          <span className="text-gray-400">|</span>
                          <span>Confidence: 95%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm">Investigate</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
