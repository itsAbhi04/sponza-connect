"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Wallet,
  CreditCard,
  BanknoteIcon as Bank,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"

interface EarningsData {
  overview: {
    totalEarnings: number
    thisMonthEarnings: number
    pendingEarnings: number
    availableBalance: number
    earningsChange: number
    completedCampaigns: number
  }
  transactions: any[]
  withdrawalMethods: any[]
  earningsHistory: any[]
  taxInfo: any
}

export default function InfluencerEarningsPage() {
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("")
  const [showWithdrawal, setShowWithdrawal] = useState(false)

  useEffect(() => {
    fetchEarningsData()
  }, [timeRange])

  const fetchEarningsData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/influencer/earnings?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setEarningsData(data)
      }
    } catch (error) {
      console.error("Failed to fetch earnings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWithdrawal = async () => {
    try {
      const response = await fetch("/api/influencer/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number.parseFloat(withdrawalAmount),
          methodId: selectedMethod,
        }),
      })

      if (response.ok) {
        setShowWithdrawal(false)
        setWithdrawalAmount("")
        setSelectedMethod("")
        fetchEarningsData()
      }
    } catch (error) {
      console.error("Withdrawal failed:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "campaign_payment":
        return <Plus className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <Minus className="h-4 w-4 text-red-600" />
      case "bonus":
        return <Plus className="h-4 w-4 text-blue-600" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <EnhancedInfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading earnings...</p>
          </div>
        </div>
      </EnhancedInfluencerLayout>
    )
  }

  return (
    <EnhancedInfluencerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Earnings & Wallet</h1>
            <p className="text-gray-600 mt-1">Track your income and manage withdrawals</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchEarningsData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => setShowWithdrawal(true)}>
              <Wallet className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(earningsData?.overview.totalEarnings || 0)}</div>
              <div className="flex items-center text-green-100 text-sm">
                {earningsData?.overview.earningsChange && earningsData.overview.earningsChange > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(earningsData?.overview.earningsChange || 0).toFixed(1)}% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(earningsData?.overview.thisMonthEarnings || 0)}</div>
              <div className="text-blue-100 text-sm">
                From {earningsData?.overview.completedCampaigns || 0} campaigns
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-100">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(earningsData?.overview.pendingEarnings || 0)}</div>
              <div className="text-yellow-100 text-sm">Awaiting completion</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Available</CardTitle>
              <Wallet className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(earningsData?.overview.availableBalance || 0)}</div>
              <div className="text-purple-100 text-sm">Ready for withdrawal</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="history">Earnings History</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="tax">Tax Information</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest earnings and withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsData?.transactions?.map((transaction) => (
                    <div key={transaction._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "withdrawal" ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {transaction.type === "withdrawal" ? "-" : "+"}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(transaction.status)}
                            <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Monthly breakdown of your earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Earnings Chart</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Earning Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {earningsData?.earningsHistory?.slice(0, 5).map((campaign, index) => (
                      <div key={campaign._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{campaign.title}</p>
                            <p className="text-xs text-gray-500">{campaign.platform}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{formatCurrency(campaign.earnings)}</p>
                          <p className="text-xs text-gray-500">{formatDate(campaign.completedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings by Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { platform: "Instagram", earnings: 45000, percentage: 45 },
                      { platform: "YouTube", earnings: 30000, percentage: 30 },
                      { platform: "TikTok", earnings: 15000, percentage: 15 },
                      { platform: "Twitter", earnings: 10000, percentage: 10 },
                    ].map((item) => (
                      <div key={item.platform} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.platform}</span>
                          <span className="text-sm text-gray-600">{formatCurrency(item.earnings)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your withdrawal methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsData?.withdrawalMethods?.map((method) => (
                    <div key={method._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {method.type === "bank" ? (
                          <Bank className="h-8 w-8 text-blue-600" />
                        ) : (
                          <CreditCard className="h-8 w-8 text-green-600" />
                        )}
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">
                            {method.type === "bank"
                              ? `****${method.accountNumber?.slice(-4)}`
                              : `****${method.cardNumber?.slice(-4)}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && <Badge variant="default">Default</Badge>}
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Information</CardTitle>
                <CardDescription>Your tax documents and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Total Taxable Income</h4>
                      <p className="text-2xl font-bold text-blue-700">
                        {formatCurrency(earningsData?.taxInfo?.totalTaxableIncome || 0)}
                      </p>
                      <p className="text-sm text-blue-600">Current financial year</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">TDS Deducted</h4>
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(earningsData?.taxInfo?.tdsDeducted || 0)}
                      </p>
                      <p className="text-sm text-green-600">Tax deducted at source</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Tax Documents</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Form 16A - 2023-24</p>
                          <p className="text-sm text-gray-500">TDS Certificate</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Annual Statement - 2023-24</p>
                          <p className="text-sm text-gray-500">Earnings summary</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Withdrawal Modal */}
        {showWithdrawal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>
                  Available balance: {formatCurrency(earningsData?.overview.availableBalance || 0)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="method">Payment Method</Label>
                  <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {earningsData?.withdrawalMethods?.map((method) => (
                        <SelectItem key={method._id} value={method._id}>
                          {method.name} -{" "}
                          {method.type === "bank"
                            ? `****${method.accountNumber?.slice(-4)}`
                            : `****${method.cardNumber?.slice(-4)}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleWithdrawal} className="flex-1">
                    Withdraw
                  </Button>
                  <Button variant="outline" onClick={() => setShowWithdrawal(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </EnhancedInfluencerLayout>
  )
}
