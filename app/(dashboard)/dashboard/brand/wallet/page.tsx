"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { RazorpayCheckout } from "@/components/payments/razorpay-checkout"
import {
  Wallet,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react"

interface WalletData {
  balance: number
  totalSpent: number
  activeCampaigns: number
  pendingPayments: number
  transactions: Transaction[]
}

interface Transaction {
  _id: string
  type: string
  amount: number
  status: string
  description: string
  createdAt: string
}

export default function BrandWalletPage() {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)
  const [addFundsAmount, setAddFundsAmount] = useState("")
  const [paymentOrder, setPaymentOrder] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/brand/wallet")
      if (response.ok) {
        const data = await response.json()
        setWalletData(data)
      }
    } catch (error) {
      console.error("Failed to fetch wallet data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch wallet data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const initiateAddFunds = async () => {
    const amount = Number.parseFloat(addFundsAmount)
    if (!amount || amount < 100) {
      toast({
        title: "Error",
        description: "Please enter a valid amount (minimum ₹100)",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/brand/wallet/add-funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      })

      if (response.ok) {
        const order = await response.json()
        setPaymentOrder(order)
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to initiate payment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error)
      toast({
        title: "Error",
        description: "Failed to initiate payment",
        variant: "destructive",
      })
    }
  }

  const handlePaymentSuccess = async (response: any) => {
    try {
      const verifyResponse = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      })

      if (verifyResponse.ok) {
        toast({
          title: "Success",
          description: "Funds added successfully to your wallet",
        })
        setAddFundsAmount("")
        setPaymentOrder(null)
        fetchWalletData()
      } else {
        toast({
          title: "Error",
          description: "Payment verification failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment verification failed:", error)
      toast({
        title: "Error",
        description: "Payment verification failed",
        variant: "destructive",
      })
    }
  }

  const handlePaymentError = (error: any) => {
    console.error("Payment failed:", error)
    toast({
      title: "Payment Failed",
      description: error.description || "Payment failed. Please try again.",
      variant: "destructive",
    })
    setPaymentOrder(null)
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Funds to Wallet</DialogTitle>
                  <DialogDescription>Add money to your wallet to fund campaigns and pay influencers</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="100"
                      value={addFundsAmount}
                      onChange={(e) => setAddFundsAmount(e.target.value)}
                      placeholder="Enter amount (minimum ₹100)"
                    />
                  </div>
                  {paymentOrder ? (
                    <RazorpayCheckout
                      orderId={paymentOrder.orderId}
                      amount={paymentOrder.amount}
                      currency={paymentOrder.currency}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    >
                      Pay {formatCurrency(paymentOrder.amount / 100)}
                    </RazorpayCheckout>
                  ) : (
                    <Button onClick={initiateAddFunds} className="w-full">
                      Proceed to Payment
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
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
                    Available
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">{walletData ? formatCurrency(walletData.balance) : "₹0"}</h3>
                <p className="text-sm text-gray-600">Wallet Balance</p>
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
                    This Month
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">{walletData ? formatCurrency(walletData.totalSpent) : "₹0"}</h3>
                <p className="text-sm text-gray-600">Total Spent</p>
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
                    Active
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">{walletData ? walletData.activeCampaigns : 0}</h3>
                <p className="text-sm text-gray-600">Active Campaigns</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  {walletData ? formatCurrency(walletData.pendingPayments) : "₹0"}
                </h3>
                <p className="text-sm text-gray-600">Pending Payments</p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent payments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletData?.transactions.map((transaction) => (
                  <div key={transaction._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "wallet_topup"
                            ? "bg-green-100"
                            : transaction.type === "campaign_payment"
                              ? "bg-blue-100"
                              : "bg-orange-100"
                        }`}
                      >
                        {transaction.type === "wallet_topup" ? (
                          <ArrowUpRight className="h-6 w-6 text-green-600" />
                        ) : transaction.type === "campaign_payment" ? (
                          <Users className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.description}</h4>
                        <p className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {transaction.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {transaction.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                          {transaction.status === "failed" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
