"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, DollarSign, AlertCircle, CheckCircle, XCircle, Clock, Download } from "lucide-react"

interface Transaction {
  _id: string
  userId: {
    _id: string
    name: string
    email: string
  }
  type: string
  amount: number
  status: string
  description: string
  createdAt: string
  razorpayDetails: {
    orderId?: string
    paymentId?: string
    payoutId?: string
  }
}

interface PaymentStats {
  _id: string
  count: number
  totalAmount: number
}

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState<PaymentStats[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/payments")
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions)
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch transactions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const approveWithdrawal = async () => {
    if (!selectedTransaction || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolderName) {
      toast({
        title: "Error",
        description: "Please fill all bank details",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/admin/payments/approve-withdrawal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: selectedTransaction._id,
          bankDetails,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Withdrawal approved and processed successfully",
        })
        setSelectedTransaction(null)
        setBankDetails({ accountNumber: "", ifscCode: "", accountHolderName: "" })
        fetchTransactions()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to approve withdrawal",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to approve withdrawal:", error)
      toast({
        title: "Error",
        description: "Failed to approve withdrawal",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
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
              <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
              <p className="text-gray-600">Monitor and manage platform payments</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat._id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium capitalize">{stat._id} Payments</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(stat.totalAmount)}</div>
                  <p className="text-xs text-gray-600">{stat.count} transactions</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Monitor and manage platform transactions</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="text" placeholder="Search transactions..." className="pl-8" />
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                  <TabsTrigger value="topups">Top-ups</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaign Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction._id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{transaction.description}</h3>
                            <Badge className={getStatusColor(transaction.status)}>
                              {getStatusIcon(transaction.status)}
                              <span className="ml-1 capitalize">{transaction.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {transaction.userId.name} • {transaction.userId.email}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Amount: {formatCurrency(Math.abs(transaction.amount))}</span>
                            <span>Type: {transaction.type.replace("_", " ")}</span>
                            <span>Date: {formatDate(transaction.createdAt)}</span>
                          </div>
                          {transaction.razorpayDetails.orderId && (
                            <div className="text-xs text-gray-400">Order ID: {transaction.razorpayDetails.orderId}</div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {transaction.type === "withdrawal" && transaction.status === "pending" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" onClick={() => setSelectedTransaction(transaction)}>
                                  Approve Withdrawal
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Approve Withdrawal</DialogTitle>
                                  <DialogDescription>
                                    Enter bank details to process the withdrawal of{" "}
                                    {formatCurrency(Math.abs(transaction.amount))}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="accountNumber">Account Number</Label>
                                    <Input
                                      id="accountNumber"
                                      value={bankDetails.accountNumber}
                                      onChange={(e) =>
                                        setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                                      }
                                      placeholder="Enter account number"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="ifscCode">IFSC Code</Label>
                                    <Input
                                      id="ifscCode"
                                      value={bankDetails.ifscCode}
                                      onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                      placeholder="Enter IFSC code"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="accountHolderName">Account Holder Name</Label>
                                    <Input
                                      id="accountHolderName"
                                      value={bankDetails.accountHolderName}
                                      onChange={(e) =>
                                        setBankDetails({ ...bankDetails, accountHolderName: e.target.value })
                                      }
                                      placeholder="Enter account holder name"
                                    />
                                  </div>
                                  <Button onClick={approveWithdrawal} className="w-full">
                                    Process Withdrawal
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
