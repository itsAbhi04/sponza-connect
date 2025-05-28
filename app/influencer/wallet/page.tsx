"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, Building2, History, TrendingUp } from "lucide-react"

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet & Earnings</h1>
            <p className="text-gray-600">Manage your earnings and withdrawals</p>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Balance</CardTitle>
                <CardDescription>Ready to withdraw</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$2,450.00</span>
                  <Badge className="bg-green-100 text-green-700">+$150 this week</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Earnings</CardTitle>
                <CardDescription>From active campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$850.00</span>
                  <Badge className="bg-yellow-100 text-yellow-700">2 campaigns</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Earnings</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$12,450.00</span>
                  <Badge className="bg-blue-100 text-blue-700">+24% this month</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Withdrawal Methods */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal Methods</CardTitle>
                  <CardDescription>Add or manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bank Account */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Bank Account</h3>
                        <p className="text-sm text-gray-500">•••• 4567</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Default</Badge>
                  </div>

                  {/* PayPal */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">PayPal</h3>
                        <p className="text-sm text-gray-500">john@example.com</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Set Default</Button>
                  </div>

                  <Button className="w-full">
                    <Wallet className="h-4 w-4 mr-2" />
                    Add New Method
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
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Withdraw Funds
                  </Button>
                  <Button variant="outline" className="w-full">
                    <History className="h-4 w-4 mr-2" />
                    View Transaction History
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Transaction History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>Your recent earnings and withdrawals</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Transaction 1 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Fashion Brand Campaign</h3>
                          <p className="text-sm text-gray-500">Completed • 2 days ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+$500.00</p>
                        <p className="text-sm text-gray-500">Instagram Reels</p>
                      </div>
                    </div>

                    {/* Transaction 2 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <ArrowUpRight className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Withdrawal to Bank</h3>
                          <p className="text-sm text-gray-500">Processed • 1 week ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">-$1,000.00</p>
                        <p className="text-sm text-gray-500">Bank Transfer</p>
                      </div>
                    </div>

                    {/* Transaction 3 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Tech Brand Campaign</h3>
                          <p className="text-sm text-gray-500">Completed • 2 weeks ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+$750.00</p>
                        <p className="text-sm text-gray-500">YouTube Video</p>
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