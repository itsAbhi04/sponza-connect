"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  TrendingUp,
  Users,
  CreditCard,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Wallet & Payments</h1>
              <p className="text-gray-600">Manage your campaign budgets and track payments</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Wallet className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">₹5,00,000</h3>
                <p className="text-sm text-gray-600">Total Budget</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -5%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">₹2,50,000</h3>
                <p className="text-sm text-gray-600">Spent This Month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">24</h3>
                <p className="text-sm text-gray-600">Active Influencers</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">₹75,000</h3>
                <p className="text-sm text-gray-600">Pending Payments</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bank Account */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">HDFC Bank</h4>
                        <p className="text-sm text-gray-600">****4567</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Default</Badge>
                  </div>

                  {/* Credit Card */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Visa Card</h4>
                        <p className="text-sm text-gray-600">****7890</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Set Default</Button>
                  </div>

                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add New Payment Method
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Add Funds
                  </Button>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    View Transaction History
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Recent payments and transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Transaction 1 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <ArrowUpRight className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Campaign Payment</h4>
                          <p className="text-sm text-gray-600">Sarah Johnson • Summer Collection</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+₹25,000</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">2 days ago</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>

                    {/* Transaction 2 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Campaign Payment</h4>
                          <p className="text-sm text-gray-600">Mike Chen • Tech Review</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-orange-600">₹15,000</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Pending</span>
                          <Clock className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                    </div>

                    {/* Transaction 3 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Failed Payment</h4>
                          <p className="text-sm text-gray-600">Emma Wilson • Beauty Campaign</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">₹20,000</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Failed</span>
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 